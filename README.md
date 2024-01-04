# Node-Express-Typescript

[![Docker Image CI](https://github.com/edwinhern/express-typescript-2024/actions/workflows/docker-image.yml/badge.svg?branch=master)](https://github.com/edwinhern/express-typescript-2024/actions/workflows/docker-image.yml)
[![CodeQL](https://github.com/edwinhern/express-typescript-2024/actions/workflows/codeql.yml/badge.svg)](https://github.com/edwinhern/express-typescript-2024/actions/workflows/codeql.yml)
[![Build Express+Typescript Application](https://github.com/edwinhern/express-typescript-2024/actions/workflows/test.yml/badge.svg)](https://github.com/edwinhern/express-typescript-2024/actions/workflows/test.yml)

## Steps to use Typescript With Node + Execute the project

### Step 1: Install TypeScript

- Run `sudo npm i -g typescript` to install typescript globally.
- Check typescript version by running `tsc --version` to make sure you installed it correctly.

### Step 2: Initialize Project

- Open your terminal
- Clone the repo `git clone https://github.com/edwinhern/express-typescript-2024.git`
- Navigate by using `cd express-typescript-2024` into the folder directory
- Install project dependencies by running `npm ci`.
- This will install necessary packages to run project

### Step 3: Available Scripts

Below are Scripts that can be ran and found in package.json file

- Development Mode: `"dev": "tsx watch --clear-screen=false -r dotenv/config src/index.ts",`
- Build Project: `"build": "rimraf build && tsc"`
- Production Mode: `"start": "npm run build && NODE_ENV=production tsx -r dotenv/config build/index.js",`

## Source Folder Structure 
```
.
├── common
│   ├── middleware
│   │   ├── errorHandler.ts
│   │   ├── healthCheck.ts
│   │   ├── index.ts
│   │   ├── requestLogger.ts
│   │   └── responseHandler.ts
│   ├── models
│   │   └── serviceResponse.ts
│   └── utils
│       ├── compressFilter.ts
│       └── envConfig.ts
├── index.ts
├── modules
│   └── user
│       ├── tests
│       │   └── userRoutes.test.ts
│       ├── userController.ts
│       ├── userModel.ts
│       ├── userRepository.ts
│       ├── userRoutes.ts
│       └── userService.ts
└── server.ts

8 directories, 16 files
```
