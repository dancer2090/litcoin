## Installation

Use the `npm` or `yarn` package manager to install project.

```bash
cd testTrueCode
npm install
or
yarn install
```

## Usage

Recommended `node.js` version - `12.16.3`

Variables in `src/js/main.js` file:
- FULL_URL - website https adress

Variables in `src/send.php` file:
- EMAIL_TO - address for adress of email
- SUBJECT - subject for subject of email


#### Local running

```bash
npm run gulp
```

### Deployment
1. Set variables like in Usage section
2. `npm run gulp`
3. Copy files from `assets/build` to hosting forder (apache, nginx)
