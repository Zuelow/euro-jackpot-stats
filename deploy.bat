@echo off
REM Euro Jackpot Statistics - GitHub Deployment Script (Windows)
REM This script helps you quickly deploy your website to GitHub

echo 🎰 Euro Jackpot Statistics - GitHub Deployment
echo ==============================================

REM Check if git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Git is not installed. Please install Git first:
    echo    https://git-scm.com/downloads
    pause
    exit /b 1
)

REM Check if we're in a git repository
if not exist ".git" (
    echo 📁 Initializing Git repository...
    git init
    echo ✅ Git repository initialized
)

REM Get GitHub username and repository name
echo.
echo 📝 Please provide your GitHub details:
set /p github_username="GitHub Username: "
set /p repo_name="Repository Name (default: euro-jackpot-stats): "

REM Set default repository name if empty
if "%repo_name%"=="" set repo_name=euro-jackpot-stats

REM Construct repository URL
set repo_url=https://github.com/%github_username%/%repo_name%.git

echo.
echo 🔗 Repository URL: %repo_url%
echo.

REM Check if remote origin exists and update/add it
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo ➕ Adding remote origin...
    git remote add origin "%repo_url%"
) else (
    echo 🔄 Updating existing remote origin...
    git remote set-url origin "%repo_url%"
)

REM Add all files
echo 📦 Adding all files to git...
git add .

REM Get commit message
echo.
set /p commit_message="Commit message (default: Update Euro Jackpot Statistics website): "
if "%commit_message%"=="" set commit_message=Update Euro Jackpot Statistics website

REM Commit changes
echo 💾 Committing changes...
git commit -m "%commit_message%"

REM Check current branch and switch to main if needed
for /f "tokens=*" %%i in ('git branch --show-current') do set current_branch=%%i
if not "%current_branch%"=="main" (
    echo 🌿 Switching to main branch...
    git checkout -b main 2>nul || git checkout main
)

REM Push to GitHub
echo 🚀 Pushing to GitHub...
git push -u origin main
if errorlevel 1 (
    echo.
    echo ❌ Push failed. This might be because:
    echo    1. Repository doesn't exist on GitHub yet
    echo    2. You don't have permission to push
    echo    3. Authentication failed
    echo.
    echo 🔧 Solutions:
    echo    1. Create the repository on GitHub first:
    echo       https://github.com/new
    echo    2. Set up authentication:
    echo       https://docs.github.com/en/authentication
    echo    3. Try running this script again
) else (
    echo.
    echo 🎉 SUCCESS! Your website has been deployed to GitHub!
    echo.
    echo 📍 Your repository: https://github.com/%github_username%/%repo_name%
    echo 🌐 Your live website: https://%github_username%.github.io/%repo_name%
    echo.
    echo ⏰ Note: It may take 2-3 minutes for your website to be live.
    echo 📋 Next steps:
    echo    1. Go to your repository settings
    echo    2. Enable GitHub Pages (if not already enabled^)
    echo    3. Wait for deployment to complete
    echo    4. Visit your live website!
    echo.
    echo 🎰 Your multilingual Euro Jackpot statistics website is now live!
)

echo.
echo 📚 For detailed instructions, see GITHUB_SETUP.md
pause
