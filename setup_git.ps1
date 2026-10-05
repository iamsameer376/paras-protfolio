$targetDir = "C:\Users\MohammedSameer\AppData\Local\Programs\Git"
$zipPath = "$env:TEMP\MinGit.zip"

if (-not (Test-Path "$targetDir\cmd\git.exe")) {
    Write-Host "Fetching latest MinGit release info..." -ForegroundColor Cyan
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
    $releases = Invoke-RestMethod -Uri "https://api.github.com/repos/git-for-windows/git/releases/latest"
    $asset = $releases.assets | Where-Object { $_.name -like "MinGit*64-bit.zip" -and $_.name -notlike "*busybox*" } | Select-Object -First 1

    if (-not $asset) {
        $downloadUrl = "https://github.com/git-for-windows/git/releases/download/v2.47.1.windows.1/MinGit-2.47.1-64-bit.zip"
    } else {
        $downloadUrl = $asset.browser_download_url
    }

    Write-Host "Downloading MinGit from: $downloadUrl..." -ForegroundColor Cyan
    Invoke-WebRequest -Uri $downloadUrl -OutFile $zipPath -UseBasicParsing

    Write-Host "Extracting MinGit to $targetDir..." -ForegroundColor Cyan
    New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
    Expand-Archive -Path $zipPath -DestinationPath $targetDir -Force
    Remove-Item $zipPath -Force
}

$gitExe = "$targetDir\cmd\git.exe"
Write-Host "Git installed at: $gitExe" -ForegroundColor Green
& $gitExe --version
