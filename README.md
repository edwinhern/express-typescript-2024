# Node-Express-Typescript

## Steps to use Typescript With Node + Execute the project

### Step 1: Install TypeScript
- Run `sudo npm i -g typescript` to install typescript globally.
- Check typescripe version by running `tsc --version` to make sure you installed it correctly.

### Step 2: Initialize Project
- Open your terminal
- Clone the repo `git clone https://github.com/edwinhern/express-typescript-2024.git`
- Navigate by using `cd express-typescript-2024` into the folder directory
- Install project dependencies by running `npm ci`.
- This will install necessary packages to run project

### Step 3: Available Scripts
Below are Scripts that can be ran and found in package.json file
-  Development Mode: `"dev": "nodemon"`
-  Build Project: `"build": "rimraf build && tsc"`
-  Production Mode: `"start": "npm run build && NODE_ENV=production node -r dotenv/config build/index.js"`
