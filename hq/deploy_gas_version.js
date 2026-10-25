const fs = require('fs');
const https = require('https');
const path = require('path');

const scriptId = '1WVoxU20yqSYltl881Y9_Xm8oDjXBKLdh4Y3UQnlrTIYGcZJhtwG1qovD';
const deploymentId = 'AKfycbxyBy5Mme7JJbLS95nNpBb_Fj-IB_73QCf1GHr28Itcc1k23Ay4Kn47iBA-yOfnRdVQ';
const clasprcPath = 'C:\\Users\\TANG KIM SON\\.clasprc.json';

const clasprc = JSON.parse(fs.readFileSync(clasprcPath, 'utf8'));

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
    }, res => {
      let raw = '';
      res.on('data', chunk => raw += chunk);
      res.on('end', () => resolve(JSON.parse(raw)));
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function postJson(urlStr, payload, token) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlStr);
    const body = JSON.stringify(payload);
    const req = https.request(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body)
      }
    }, res => {
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
    }, res => {
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

async function deploy() {
  console.log('1. Làm mới OAuth Token Google...');
  const tokenRes = await postForm('https://oauth2.googleapis.com/token', {
    client_id: clasprc.tokens.default.client_id,
    client_secret: clasprc.tokens.default.client_secret,
    refresh_token: clasprc.tokens.default.refresh_token,
    grant_type: 'refresh_token'
  });
  const token = tokenRes.access_token;
  console.log('2. Đã có Access Token.');

  const projectRoot = 'D:\\My Agents\\Projects\\App AP CAR CARE';
  const appsscriptJson = fs.readFileSync(path.join(projectRoot, 'src', 'appsscript.json'), 'utf8');
  const codeGs = fs.readFileSync(path.join(projectRoot, 'src', 'Code.gs'), 'utf8');
  const indexHtml = fs.readFileSync(path.join(projectRoot, 'src', 'Index.html'), 'utf8');

  console.log('3. Đẩy code mới nhất lên Apps Script Project...');
  const updateContentRes = await putJson(`https://script.googleapis.com/v1/projects/${scriptId}/content`, {
    files: [
      { name: 'appsscript', type: 'JSON', source: appsscriptJson },
      { name: 'Code', type: 'SERVER_JS', source: codeGs },
      { name: 'Index', type: 'HTML', source: indexHtml }
    ]
  }, token);

  if (updateContentRes.error) {
    console.error('Lỗi đẩy code:', updateContentRes.error);
    process.exit(1);
  }
  console.log('   ✓ Đã đẩy code sạch thành công lên HEAD.');

  console.log('4. Tạo Version mới cho dự án...');
  const versionRes = await postJson(`https://script.googleapis.com/v1/projects/${scriptId}/versions`, {
    description: 'Release v2.1: Full commit sync, auto init sheets, reload session fix, remove 0/8 badge'
  }, token);

  console.log('   Version mới:', versionRes.versionNumber);

  console.log(`5. Cập nhật Deployment ${deploymentId} sang Version ${versionRes.versionNumber}...`);
  const deployRes = await putJson(`https://script.googleapis.com/v1/projects/${scriptId}/deployments/${deploymentId}`, {
    deploymentConfig: {
      scriptId: scriptId,
      versionNumber: versionRes.versionNumber,
      manifestFileName: 'appsscript',
      description: `App AP CAR CARE v2.1 (Version ${versionRes.versionNumber})`
    }
  }, token);

  if (deployRes.error) {
    console.error('Lỗi cập nhật deployment:', deployRes.error);
    process.exit(1);
  }
  console.log('   ✓ Cập nhật deployment thành công!');
  console.log('   URL:', deployRes.entryPoints?.[0]?.webApp?.url || `https://script.google.com/macros/s/${deploymentId}/exec`);
}

deploy().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
