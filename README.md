NPM License
===

Gets a package and its dependencies licenses as JSON.

Installation
===

```sh
npm install -g npm-licenses
```

Usage
===

```sh
npm-licenses --package node_modules/npm-licenses/package.json
```
```javascript
{
  "dependencies": {
    "commander": "MIT"
  },
  "devDependencies": {},
  "npm-licenses": "MIT"
}
```