# 🚀 Express TypeScript Boilerplate 2024

[![Docker Image CI](https://github.com/edwinhern/express-typescript-2024/actions/workflows/docker-image.yml/badge.svg?branch=master)](https://github.com/edwinhern/express-typescript-2024/actions/workflows/docker-image.yml)
[![CodeQL](https://github.com/edwinhern/express-typescript-2024/actions/workflows/codeql.yml/badge.svg)](https://github.com/edwinhern/express-typescript-2024/actions/workflows/codeql.yml)
[![Build Express+Typescript Application](https://github.com/edwinhern/express-typescript-2024/actions/workflows/test.yml/badge.svg)](https://github.com/edwinhern/express-typescript-2024/actions/workflows/test.yml)

## 🌟 Introduction

Welcome to the Express TypeScript Boilerplate 2024 – a streamlined, efficient, and scalable foundation for building powerful backend services. This boilerplate merges modern tools and practices in Express.js and TypeScript, enhancing productivity, code quality, and performance.

## 💡 Motivation and Intentions

Developed to streamline backend development, this boilerplate is your solution for:

- ✨ Reducing setup time for new projects.
- 📊 Ensuring code consistency and quality.
- ⚡ Facilitating rapid development with cutting-edge tools.
- 🛡️ Encouraging best practices in security, testing, and performance.

## 🚀 Features

- 📁 Modular Structure: Organized by feature for easy navigation and scalability.
- 💨 Faster Execution with tsx: Rapid TypeScript execution with esbuild, complemented by tsc for type checking.
- 🌐 Stable Node Environment: Latest LTS Node version in .nvmrc.
- 🔧 Simplified Environment Variables: Centralized and easy-to-manage configuration.
- 🔗 Path Aliases: Cleaner code with shortcut imports.
- 🔄 Dependabot Integration: Automatic updates for secure and up-to-date dependencies.
- 🔒 Security: Helmet for HTTP header security and CORS setup.
- 📊 Logging: Efficient logging with pino-http.
- 🧪 Comprehensive Testing: Robust setup with Jest and Supertest.
- 🔑 Code Quality Assurance: Husky and lint-staged for consistent quality.
- ✅ Unified Code Style: ESLint and Prettier for a consistent coding standard.
- 📃 API Response Standardization: ServiceResponse class for consistent API responses.
- 🐳 Docker Support: Ready for containerization and deployment.

## 🛠️ Getting Started

### Step 1: 🚀 Initial Setup

- Clone the repository: `git clone https://github.com/edwinhern/express-typescript-2024.git`
- Navigate: `cd express-typescript-2024`
- Install dependencies: `npm ci`

### Step 2: ⚙️ Environment Configuration

- Create `.env`: Copy `.env.template` to `.env`
- Update `.env`: Fill in necessary environment variables

### Step 3: 🏃‍♂️ Running the Project

- Development Mode: `npm run dev`
- Building: `npm run build`
- Production Mode: `npm run start` or `npm run docker:start`

## 📁 Project Structure
```
.
├── api-docs
│   ├── openAPIDocumentGenerator.ts
│   └── openAPIResponseBuilders.ts
├── common
│   ├── middleware
│   │   ├── errorHandler.ts
│   │   ├── rateLimiter.ts
│   │   └── requestLogger.ts
│   ├── models
│   │   └── serviceResponse.ts
│   └── utils
│       ├── commonValidation.ts
│       ├── envConfig.ts
│       └── httpHandlers.ts
├── index.ts
├── modules
│   ├── healthCheck
│   │   └── healthCheckRouter.ts
│   └── user
│       ├── userModel.ts
│       ├── userRepository.ts
│       ├── userRouter.ts
│       └── userService.ts
└── server.ts

9 directories, 16 files
```

## 🤝 Feedback and Contributions

We'd love to hear your feedback and suggestions for further improvements. Feel free to contribute and join us in making backend development cleaner and faster!

🎉 Happy coding!
