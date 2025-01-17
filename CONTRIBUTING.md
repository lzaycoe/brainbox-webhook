# brainbox-webhook's Development Guidelines

## Table of Contents

- [brainbox-webhook's Development Guidelines](#brainbox-webhooks-development-guidelines)
  - [Table of Contents](#table-of-contents)
  - [Requirements](#requirements)
    - [Tools](#tools)
    - [Extensions](#extensions)
    - [Commit Conventions](#commit-conventions)
    - [Environment Variables](#environment-variables)
  - [Development](#development)

---

## Requirements

### Tools

- Environment: `Node.js v20.17.0`
  - You can download it from [here](https://nodejs.org/en/download/).
- Package manager: `pnpm`
  - To install it, run `npm i -g pnpm` after installing Node.js.
- Code editor: `Visual Studio Code`
  - You can download it from [here](https://code.visualstudio.com/).

### Extensions

- [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prisma](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma)

### Environment Variables

Create a .env file there and add the following environment variables:

| #   | Name           | Description                  | Example                                            |
| --- | -------------- | ---------------------------- | -------------------------------------------------- |
| 1   | NODE_ENV       | Environment                  | `development` or `production`                      |
| 2   | DATABASE_URL   | Database URL                 | `postgresql://user:password@localhost:5432/dbname` |
| 3   | DIRECT_URL     | Database direct URL          | `postgresql://user:password@localhost:5432/dbname` |
| 4   | SIGNING_SECRET | Clerk webhook signing secret | `clerk_webhook_signing_secret`                     |

---

## Development

- Step 1: Clone the repository.

  ```bash
  git clone https://github.com/lzaycoe/brainbox-webhook.git
  ```

- Step 2: Install dependencies

  ```bash
  cd brainbox-webhook
  pnpm install
  ```

- Step 3: Create `.env` file and add the environment variables mentioned above.

- Step 4: Run the development server.

  ```bash
  pnpm run prisma:generate
  pnpm run start:dev
  ```
