#!/usr/bin/env node

const Application = require("commander");
const Path = require("path");

Application
    .version(require("../package.json").version, "-V, --version")
    .option("-p, --package <path>", "specifies package.json", null, null)
    .parse(process.argv);

if (Application.package === null) {
    throw new Error("argument -p, --package required");
}

const packageFile = Path.join(process.cwd(), Application.package);
const packageJson = require(packageFile);
const packages = {
    "dependencies": {},
    "devDependencies": {}
};

var license = function (license) {
    return license || "No license";
};

var extractLicenseFromPackage = function (depType, npmName) {
    const npmPackageJson = require(Path.join(Path.dirname(packageFile), "node_modules", npmName, "package.json"));
    packages[depType][npmName] = license(npmPackageJson.license);
};

packages[packageJson.name] = license(packageJson.license);

for (var dep in packageJson.dependencies) {
    extractLicenseFromPackage("dependencies", dep);
}

for (var devDep in packageJson.devDependencies) {
    extractLicenseFromPackage("devDependencies", devDep);
}

console.log(JSON.stringify(packages, null, 2));
