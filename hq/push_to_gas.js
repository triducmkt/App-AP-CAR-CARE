const fs = require('fs');
const https = require('https');
const path = require('path');

const scriptId = '1WVoxU20yqSYltl881Y9_Xm8oDjXBKLdh4Y3UQnlrTIYGcZJhtwG1qovD';
const clasprcPath = 'C:\\Users\\TANG KIM SON\\.clasprc.json';

const clasprc = JSON.parse(fs.readFileSync(clasprcPath, 'utf8'));
const defaultToken = clasprc.tokens.default;

function postForm(urlStr, data) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlStr);
    const body = new URLSearchParams(data).toString();
    const req = https.request(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(body)
      }
    }, (res) => {
      let raw = '';
      res.on('data', chunk => raw += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(raw)); } catch (e) { resolve(raw); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function putJson(urlStr, payload, token) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlStr);
    const body = JSON.stringify(payload);
    const req = https.request(url, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body)
      }
    }, (res) => {
      let raw = '';
      res.on('data', chunk => raw += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(raw)); } catch (e) { resolve(raw); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function main() {
  console.log('1. Làm mới OAuth Token Google...');
  const tokenRes = await postForm('https://oauth2.googleapis.com/token', {
    client_id: defaultToken.client_id,
    client_secret: defaultToken.client_secret,
    refresh_token: defaultToken.refresh_token,
    grant_type: 'refresh_token'
  });

  if (!tokenRes.access_token) {
    console.error('Không thể làm mới token:', tokenRes);
    process.exit(1);
  }

  const accessToken = tokenRes.access_token;
  console.log('2. Đã có Access Token hợp lệ.');

  const srcDir = path.resolve(__dirname, '..', 'src');
  const appsscriptJson = fs.readFileSync(path.join(srcDir, 'appsscript.json'), 'utf8');
  const codeGs = fs.readFileSync(path.join(srcDir, 'Code.gs'), 'utf8');
  const indexHtml = fs.readFileSync(path.join(srcDir, 'Index.html'), 'utf8');

  const filesPayload = {
    files: [
      {
        name: 'appsscript',
        type: 'JSON',
        source: appsscriptJson
      },
      {
        name: 'Code',
        type: 'SERVER_JS',
        source: codeGs
      },
      {
        name: 'Index',
        type: 'HTML',
        source: indexHtml
      }
    ]
  };

  console.log(`3. Đang đẩy đè toàn bộ code sạch từ local/GitHub lên Script ID: ${scriptId}...`);
  console.log(`   - appsscript (${Buffer.byteLength(appsscriptJson)} bytes)`);
  console.log(`   - Code.gs (${Buffer.byteLength(codeGs)} bytes)`);
  console.log(`   - Index.html (${Buffer.byteLength(indexHtml)} bytes)`);

  const updateRes = await putJson(`https://script.googleapis.com/v1/projects/${scriptId}/content`, filesPayload, accessToken);

  if (updateRes.error) {
    console.error('Lỗi từ Google API:', updateRes.error);
    process.exit(1);
  }

  console.log('4. THÀNH CÔNG RỰC RỠ! Toàn bộ code cũ của TDCM đã bị xóa sạch.');
  console.log('   Hiện tại Apps Script CHỈ CÒN ĐÚNG 3 FILE SẠCH CỦA AP CAR CARE:');
  const updatedFiles = updateRes.files || [];
  updatedFiles.forEach(f => console.log(`   ✓ [${f.type}] ${f.name}`));
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
