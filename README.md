# Node-Express-Typescript

[![Docker Image CI](https://github.com/edwinhern/express-typescript-2024/actions/workflows/docker-image.yml/badge.svg?branch=master)](https://github.com/edwinhern/express-typescript-2024/actions/workflows/docker-image.yml)
[![CodeQL](https://github.com/edwinhern/express-typescript-2024/actions/workflows/codeql.yml/badge.svg)](https://github.com/edwinhern/express-typescript-2024/actions/workflows/codeql.yml)
[![Build Express+Typescript Application](https://github.com/edwinhern/express-typescript-2024/actions/workflows/test.yml/badge.svg)](https://github.com/edwinhern/express-typescript-2024/actions/workflows/test.yml)

## Steps to use Typescript With TSX + Execute the project

### Step 1: Initialize Project

- Open your terminal
- Clone the repo `git clone https://github.com/edwinhern/express-typescript-2024.git`
- Navigate by using `cd express-typescript-2024` into the folder directory
- Install project dependencies by running `npm ci`

### Step 2: Set Up Environment Variables

- Copy the .env.template file to a new file named .env
- You can use the following command: `cp .env.template .env`
- Ensure that the .env file contains the required environment variables as defined in .env.template

### Step 3: Available Scripts

Below are Scripts that can be ran and found in package.json file

- Development Mode: `npm run dev`
- Build Project: `npm run build`
- Production Mode: `npm run start` or `npm run docker:start`

## Source Folder Structure

```
.
├── common
│   ├── middleware
│   │   ├── compressFilter.ts
│   │   ├── errorHandler.ts
│   │   ├── rateLimiter.ts
│   │   └── requestLogger.ts
│   ├── models
│   │   └── serviceResponse.ts
│   └── utils
│       ├── envConfig.ts
│       └── responseHandler.ts
├── index.ts
├── modules
│   ├── healthCheck
│   │   ├── healthCheckRoutes.ts
│   │   └── tests
│   │       └── healthCheckRoutes.test.ts
│   └── user
│       ├── tests
│       │   └── userRoutes.test.ts
│       ├── userModel.ts
│       ├── userRepository.ts
│       ├── userRoutes.ts
│       └── userService.ts
└── server.ts

10 directories, 16 files
```
