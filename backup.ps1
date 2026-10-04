$ErrorActionPreference = "Stop"
$hash = (git rev-parse --short HEAD).Trim()
$backupDir = "backup\\$hash"
$logFile = "backup\\backup_log.md"
$failCountPath = "$PSScriptRoot\\.backup_fail_counter"

function Increment-FailCount {
    $count = 0
    if (Test-Path $failCountPath) {
        $count = Get-Content $failCountPath | ConvertFrom-Json
    }
    $count++
    $count | ConvertTo-Json | Set-Content $failCountPath
    return $count
}

try {
    if (-not (Test-Path $backupDir)) { New-Item -ItemType Directory -Force -Path $backupDir | Out-Null }
    Copy-Item -Path "src\\*" -Destination $backupDir -Recurse -Force
    if (-not (Test-Path $logFile)) { New-Item -ItemType File -Force -Path $logFile | Out-Null }
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $logEntry = @"
---
**Thời gian:** $timestamp
**Mã ID trước khi sửa:** $hash
**Trạng thái:** Đã sao lưu tự động thư mục src/ bằng script backup.ps1.
"@
    Add-Content -Path $logFile -Value $logEntry
    Write-Host "Backup completed. Ready to code." -ForegroundColor Cyan
} catch {
    $cnt = Increment-FailCount
    Write-Host "Backup script failed ($cnt/3): $($_.Exception.Message)" -ForegroundColor Red
    if ($cnt -ge 3) {
        Write-Host "Backup script failed 3 times → deleting and recreating script." -ForegroundColor Yellow
        Remove-Item $MyInvocation.MyCommand.Path -Force
        # Re‑create script content can be done manually after fixing.
    }
    exit 1
}
