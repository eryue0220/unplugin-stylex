import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const rootDir = resolve(import.meta.dirname, "..");
const packageJsonPath = resolve(rootDir, "package.json");
const jsrJsonPath = resolve(rootDir, "jsr.json");

const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));
const jsrJson = JSON.parse(readFileSync(jsrJsonPath, "utf8"));

if (typeof packageJson.version !== "string" || packageJson.version.length === 0) {
  throw new Error("package.json version is missing");
}

if (jsrJson.version !== packageJson.version) {
  jsrJson.version = packageJson.version;
  writeFileSync(jsrJsonPath, `${JSON.stringify(jsrJson, null, 2)}\n`);
  console.log(`Synced jsr.json version to ${packageJson.version}`);
} else {
  console.log(`jsr.json version already up to date: ${packageJson.version}`);
}
