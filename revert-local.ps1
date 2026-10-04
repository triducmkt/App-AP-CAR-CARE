param (
    [Parameter(Mandatory=$true)]
    [string]$TargetHash
)

$ErrorActionPreference = "Stop"

$backupDir = Join-Path $PSScriptRoot "backup\$TargetHash"
$srcDir = Join-Path $PSScriptRoot "src"
$logFile = Join-Path $PSScriptRoot "backup\backup_log.md"

if (-not (Test-Path $backupDir)) {
    Write-Host "[ERROR] Khong tim thay ban backup tai: $backupDir" -ForegroundColor Red
    Write-Host "Danh sach cac ban backup hien co:" -ForegroundColor Yellow
    Get-ChildItem (Join-Path $PSScriptRoot "backup") -Directory | Select-Object Name | Format-Table -HideTableHeaders
    exit 1
}

try {
    # Don dep sach src truoc khi restore
    if (Test-Path $srcDir) {
        Remove-Item "$srcDir\*" -Recurse -Force -ErrorAction SilentlyContinue
    } else {
        New-Item -ItemType Directory -Force -Path $srcDir | Out-Null
    }

    # Restore tu ban backup
    Copy-Item -Path "$backupDir\*" -Destination $srcDir -Recurse -Force

    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $logEntry = @"

---
**Thời gian revert:** $timestamp
**Revert về bản ID:** $TargetHash
**Trạng thái:** Đã khôi phục thành công toàn bộ thư mục src/ từ backup/$TargetHash.
"@
    Add-Content -Path $logFile -Value $logEntry -Encoding UTF8

    Write-Host "[OK] Da revert thanh cong src/ ve ban backup: $TargetHash" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Revert that bai: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}
