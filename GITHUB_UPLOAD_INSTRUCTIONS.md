# GitHub Upload Instructions

Follow these steps to upload your JSONPlaceholder UI project to GitHub:

## 1. Create a GitHub Repository

1. Go to [GitHub](https://github.com) and log in to your account
2. Click on the "+" icon in the top-right corner and select "New repository"
3. Name your repository (e.g., "jsonplaceholder-ui")
4. Add a description (optional): "A modern UI for JSONPlaceholder API built with React, TypeScript, and Bootstrap"
5. Choose "Public" or "Private" visibility based on your preference
6. Do NOT initialize the repository with any files (no README, .gitignore, or license)
7. Click "Create repository"

## 2. Initialize Git in Your Local Project

Open your terminal in the project directory and run:

```bash
# Initialize a new Git repository
git init

# Add all files to the staging area (excluding files in .gitignore)
git add .

# Commit the staged files
git commit -m "Initial commit"
```

## 3. Connect Your Local Repository to GitHub

After creating the GitHub repository, you'll see instructions for pushing an existing repository. Run the following commands:

```bash
# Add the GitHub repository as a remote
git remote add origin https://github.com/yourusername/jsonplaceholder-ui.git

# Rename your default branch to main (if not already named main)
git branch -M main

# Push your commits to GitHub
git push -u origin main
```

## 4. Verify Your Upload

1. Go to your GitHub repository page
2. You should see all your project files (except those in .gitignore)
3. Your README.md file should be displayed on the repository homepage

## 5. Add a Screenshot (Optional)

For a more attractive README:

1. Take a screenshot of your application
2. Save it as "screenshot.png" in your project's root directory
3. Add, commit, and push it to GitHub:

```bash
git add screenshot.png
git commit -m "Add application screenshot"
git push
```

## 6. Set Up GitHub Pages (Optional)

If you want to deploy your application to GitHub Pages:

1. Build your project: `npm run build`
2. Install gh-pages package: `npm install -D gh-pages`
3. Add these scripts to your package.json:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
4. Update your vite.config.ts file to include the base path:
   ```typescript
   export default defineConfig({
     base: '/jsonplaceholder-ui/',
     // other config...
   })
   ```
5. Deploy your application: `npm run deploy`

## Additional Git Commands

- Check the status of your repository: `git status`
- View commit history: `git log`
- Create and switch to a new branch: `git checkout -b feature/new-feature`
- Pull the latest changes from GitHub: `git pull origin main` 