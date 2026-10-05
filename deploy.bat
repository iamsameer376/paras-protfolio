@echo off
set "PATH=C:\Users\MohammedSameer\AppData\Local\Programs\nodejs;%PATH%"
echo ========================================================
echo   Deploying Mohammed Faiz R Portfolio to Vercel...
echo ========================================================
node "C:\Users\MohammedSameer\AppData\Local\Programs\nodejs\node_modules\vercel\dist\index.js" --prod
pause
