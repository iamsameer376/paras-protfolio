param(
  [string]$Token = ""
)

$nodeDir = "C:\Users\MohammedSameer\AppData\Local\Programs\nodejs"
$env:PATH = "$nodeDir;$env:PATH"

if ($Token) {
  Write-Host "Deploying to Vercel production with token..." -ForegroundColor Cyan
  & "$nodeDir\node.exe" "$nodeDir\node_modules\vercel\dist\index.js" --prod --token $Token --yes
} else {
  Write-Host "Starting interactive Vercel production deployment..." -ForegroundColor Cyan
  & "$nodeDir\node.exe" "$nodeDir\node_modules\vercel\dist\index.js" --prod
}
