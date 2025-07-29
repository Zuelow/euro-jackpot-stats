# GitHub Setup Guide 🚀

This guide will help you upload the Euro Jackpot Statistics website to GitHub and set up automatic deployment to GitHub Pages.

## 📋 Prerequisites

1. **GitHub Account**: Create one at [github.com](https://github.com) if you don't have one
2. **Git Installed**: Download from [git-scm.com](https://git-scm.com/)
3. **Command Line Access**: Terminal (Mac/Linux) or Command Prompt/PowerShell (Windows)

## 🎯 Step-by-Step Upload Process

### Step 1: Create a New Repository on GitHub

1. Go to [github.com](https://github.com) and sign in
2. Click the **"+"** button in the top-right corner
3. Select **"New repository"**
4. Fill in the details:
   - **Repository name**: `euro-jackpot-stats` (or your preferred name)
   - **Description**: `Interactive multilingual website showing Euro Jackpot lottery statistics and odds`
   - **Visibility**: Choose **Public** (recommended for GitHub Pages)
   - **Initialize**: Leave unchecked (we have files already)
5. Click **"Create repository"**

### Step 2: Initialize Git in Your Local Project

Open terminal/command prompt in your project folder and run:

```bash
# Navigate to your project folder
cd /path/to/your/euro-jackpot-stats

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Euro Jackpot Statistics website with 12-language support"

# Add your GitHub repository as remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/euro-jackpot-stats.git

# Push to GitHub
git push -u origin main
```

### Step 3: Set Up GitHub Pages

1. Go to your repository on GitHub
2. Click **"Settings"** tab
3. Scroll down to **"Pages"** in the left sidebar
4. Under **"Source"**, select **"GitHub Actions"**
5. The deployment workflow will automatically run

### Step 4: Access Your Live Website

After the GitHub Actions workflow completes (usually 2-3 minutes):

- Your website will be live at: `https://YOUR_USERNAME.github.io/euro-jackpot-stats`
- Check the **"Actions"** tab to see deployment status
- Any future commits to `main` branch will automatically update the live site

## 🔧 Alternative Upload Methods

### Method 1: GitHub Desktop (GUI)

1. Download [GitHub Desktop](https://desktop.github.com/)
2. Sign in with your GitHub account
3. Click **"Add an Existing Repository from your Hard Drive"**
4. Select your project folder
5. Click **"Publish repository"**
6. Choose repository name and visibility
7. Click **"Publish Repository"**

### Method 2: GitHub Web Interface (Drag & Drop)

1. Create a new repository on GitHub
2. Click **"uploading an existing file"**
3. Drag and drop all your project files
4. Add commit message: `Initial commit: Euro Jackpot Statistics website`
5. Click **"Commit new files"**

### Method 3: VS Code Integration

1. Open your project in VS Code
2. Install **"GitHub Pull Requests and Issues"** extension
3. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
4. Type **"Git: Initialize Repository"**
5. Use the Source Control panel to commit and push

## 📁 Repository Structure

Your GitHub repository will contain:

```
euro-jackpot-stats/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Auto-deployment workflow
├── index.html                  # Main website file
├── styles.css                  # Styling and animations
├── script.js                   # Main functionality
├── translations.js             # 12-language translations
├── language-manager.js         # Language switching
├── data-fetcher.js            # Data utilities
├── translation-helper.js       # Development tools
├── translation-template.js     # Template for new languages
├── TRANSLATION_GUIDE.md        # Translation instructions
├── GITHUB_SETUP.md            # This file
├── README.md                   # Project documentation
├── LICENSE                     # MIT License
└── .gitignore                 # Git ignore rules
```

## 🌐 Custom Domain (Optional)

To use a custom domain like `eurojackpotstats.com`:

1. Buy a domain from any registrar
2. In your repository, go to **Settings > Pages**
3. Under **"Custom domain"**, enter your domain
4. Create a `CNAME` file in your repository with your domain
5. Configure DNS at your registrar:
   - Add a `CNAME` record pointing to `YOUR_USERNAME.github.io`

## 🔄 Updating Your Website

After initial setup, updating is easy:

```bash
# Make your changes to files
# Then commit and push:

git add .
git commit -m "Add new feature: [describe your changes]"
git push

# Your live website will update automatically in 2-3 minutes
```

## 🛠️ Troubleshooting

### Common Issues:

**1. "Permission denied" error:**
```bash
# Set up SSH key or use personal access token
# See: https://docs.github.com/en/authentication
```

**2. "Repository not found":**
```bash
# Check repository name and username are correct
git remote -v  # Verify remote URL
```

**3. "GitHub Pages not working":**
- Check **Actions** tab for deployment errors
- Ensure repository is public
- Verify **Pages** settings in repository settings

**4. "Website not updating":**
- Check if GitHub Actions workflow completed successfully
- Clear browser cache (`Ctrl+F5` or `Cmd+Shift+R`)
- Wait a few minutes for CDN to update

### Getting Help:

- **GitHub Docs**: [docs.github.com](https://docs.github.com)
- **GitHub Community**: [github.community](https://github.community)
- **Git Tutorial**: [git-scm.com/docs/gittutorial](https://git-scm.com/docs/gittutorial)

## 🎉 Success!

Once uploaded, your Euro Jackpot Statistics website will be:

- ✅ **Live on the internet** at your GitHub Pages URL
- ✅ **Automatically updated** when you push changes
- ✅ **Free hosting** courtesy of GitHub
- ✅ **Version controlled** with full history
- ✅ **Shareable** with anyone worldwide

## 📊 Next Steps

After uploading:

1. **Share your website** with friends and social media
2. **Add remaining translations** for the 8 missing languages
3. **Contribute improvements** and new features
4. **Monitor usage** with GitHub's built-in analytics
5. **Add Google Analytics** for detailed visitor stats

---

**🎰 Remember**: Your website now educates people worldwide about the shocking reality of lottery odds in 12 different languages!
