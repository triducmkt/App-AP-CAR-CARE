# Deploy demo len GitHub Pages (nhanh gh-pages) - chay: .\deploy-demo.ps1
# Copy src/Index.html -> index.html tren nhanh gh-pages roi push. Khong de lai tien trinh nen.
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$wt = Join-Path $env:TEMP 'apcc-ghpages'
Set-Location $root
git fetch origin gh-pages
if (Test-Path $wt) { git worktree remove --force $wt }
git worktree add -f $wt gh-pages
Copy-Item (Join-Path $root 'src\Index.html') (Join-Path $wt 'index.html') -Force
Push-Location $wt
git add -A
$short = (git -C $root rev-parse --short HEAD)
git commit -m "deploy demo from main $short"
git push origin gh-pages
Pop-Location
git worktree remove --force $wt
Write-Output 'Deployed: https://triducmkt.github.io/App-AP-CAR-CARE/'
