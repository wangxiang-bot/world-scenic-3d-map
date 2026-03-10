$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$distDir = Join-Path $projectRoot 'dist'
$releaseDir = Join-Path $projectRoot 'release'
$zipPath = Join-Path $releaseDir 'world-heritage-3d-earth-static.zip'

Write-Host 'Building production bundle...'
Push-Location $projectRoot
try {
  npm run build
}
finally {
  Pop-Location
}

if (!(Test-Path $distDir)) {
  throw 'dist directory was not generated.'
}

if (!(Test-Path $releaseDir)) {
  New-Item -ItemType Directory -Path $releaseDir | Out-Null
}

if (Test-Path $zipPath) {
  Remove-Item $zipPath -Force
}

Write-Host 'Packaging static release...'
Compress-Archive -Path (Join-Path $distDir '*') -DestinationPath $zipPath -Force
Write-Host "Done: $zipPath"
