$git = "C:\Users\MohammedSameer\AppData\Local\Programs\Git\cmd\git.exe"

# Check if user email / name is configured
$currentName = & $git config --global user.name
if (-not $currentName) {
    & $git config --global user.name "Mohammed Faiz R Portfolio"
}
$currentEmail = & $git config --global user.email
if (-not $currentEmail) {
    & $git config --global user.email "mohammedfaizr@paras-tech.com"
}

Write-Host "Initializing git repository..." -ForegroundColor Cyan
& $git init

Write-Host "Setting remote origin..." -ForegroundColor Cyan
& $git remote remove origin 2>$null
& $git remote add origin https://github.com/iamsameer376/paras-protfolio.git

Write-Host "Setting branch to main..." -ForegroundColor Cyan
& $git branch -M main

Write-Host "Adding files..." -ForegroundColor Cyan
& $git add .

Write-Host "Committing changes..." -ForegroundColor Cyan
& $git commit -m "Initial commit: Mohammed Faiz R - Safety & Security Consultant Portfolio"

Write-Host "Pushing to GitHub (origin main)..." -ForegroundColor Cyan
& $git push -u origin main
