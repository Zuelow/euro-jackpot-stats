#!/bin/bash

# Euro Jackpot Statistics - GitHub Deployment Script
# This script helps you quickly deploy your website to GitHub

echo "🎰 Euro Jackpot Statistics - GitHub Deployment"
echo "=============================================="

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first:"
    echo "   https://git-scm.com/downloads"
    exit 1
fi

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "📁 Initializing Git repository..."
    git init
    echo "✅ Git repository initialized"
fi

# Get GitHub username and repository name
echo ""
echo "📝 Please provide your GitHub details:"
read -p "GitHub Username: " github_username
read -p "Repository Name (default: euro-jackpot-stats): " repo_name

# Set default repository name if empty
if [ -z "$repo_name" ]; then
    repo_name="euro-jackpot-stats"
fi

# Construct repository URL
repo_url="https://github.com/$github_username/$repo_name.git"

echo ""
echo "🔗 Repository URL: $repo_url"
echo ""

# Check if remote origin exists
if git remote get-url origin &> /dev/null; then
    echo "🔄 Updating existing remote origin..."
    git remote set-url origin "$repo_url"
else
    echo "➕ Adding remote origin..."
    git remote add origin "$repo_url"
fi

# Add all files
echo "📦 Adding all files to git..."
git add .

# Get commit message
echo ""
read -p "Commit message (default: Update Euro Jackpot Statistics website): " commit_message

if [ -z "$commit_message" ]; then
    commit_message="Update Euro Jackpot Statistics website"
fi

# Commit changes
echo "💾 Committing changes..."
git commit -m "$commit_message"

# Check if main branch exists, if not create it
current_branch=$(git branch --show-current)
if [ "$current_branch" != "main" ]; then
    echo "🌿 Creating main branch..."
    git checkout -b main 2>/dev/null || git checkout main
fi

# Push to GitHub
echo "🚀 Pushing to GitHub..."
if git push -u origin main; then
    echo ""
    echo "🎉 SUCCESS! Your website has been deployed to GitHub!"
    echo ""
    echo "📍 Your repository: https://github.com/$github_username/$repo_name"
    echo "🌐 Your live website: https://$github_username.github.io/$repo_name"
    echo ""
    echo "⏰ Note: It may take 2-3 minutes for your website to be live."
    echo "📋 Next steps:"
    echo "   1. Go to your repository settings"
    echo "   2. Enable GitHub Pages (if not already enabled)"
    echo "   3. Wait for deployment to complete"
    echo "   4. Visit your live website!"
    echo ""
    echo "🎰 Your multilingual Euro Jackpot statistics website is now live!"
else
    echo ""
    echo "❌ Push failed. This might be because:"
    echo "   1. Repository doesn't exist on GitHub yet"
    echo "   2. You don't have permission to push"
    echo "   3. Authentication failed"
    echo ""
    echo "🔧 Solutions:"
    echo "   1. Create the repository on GitHub first:"
    echo "      https://github.com/new"
    echo "   2. Set up authentication:"
    echo "      https://docs.github.com/en/authentication"
    echo "   3. Try running this script again"
fi

echo ""
echo "📚 For detailed instructions, see GITHUB_SETUP.md"
