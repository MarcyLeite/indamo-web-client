# Contributing to Yara Web Client

Thanks for contributing with Yara Web Client!

## 👨‍💻 Development Environment

Is this section, you can find details of the development environment and how to setup.

### 💅 Lint and Code Style

Code consitency is really important for us, and we [Eslint]() for linting and [Prettier]() for auto formatting.

### 🧪 Testing

This project uses [Mocha](https://mochajs.org/) testing library for unit and intretated tests, with [Chai Assertion](https://www.chaijs.com/) and [Sinon](https://sinonjs.org/). Integrated and environment test are located in [test](./test) at root, and unit tests are located as a sibiling of the module, with `.test.ts` / `.test.tsx` prefix. Exemple: Module `foo.ts` tests will be `foo.test.ts`.

Files related with testing are located in [mock](./mock) at root.

When creating tests, try using `Should <expected-behavior> when <condition>` convetion. When creating a unit test, call tests inside a `describe` callback, using a self-explaining title.

### ⚙️ Setup

To run the environment, you will need to install the followed programs:

- [Node.js](https://nodejs.org/en)
- [Docker](https://www.docker.com/)

After installation execute the following commands

```bash
npm i
docker compose up -d
node ./scripts/influxdb/populate-dev.js
```

This will install node dependecies, execute database containers and populate them.

### 📜 Scripts

- start: starts dev servers and open page in browser;
- build: creates dist folter with builded page;
- test: executes tests.

To run scripts, use `npm run <script-name>`
