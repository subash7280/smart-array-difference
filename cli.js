#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { smartArrayDiff } from "./index.js";

// ✅ Simple color helper
const color = {
    cyan: (s) => `\x1b[36m${s}\x1b[0m`,
    green: (s) => `\x1b[32m${s}\x1b[0m`,
    yellow: (s) => `\x1b[33m${s}\x1b[0m`,
    red: (s) => `\x1b[31m${s}\x1b[0m`,
    bold: (s) => `\x1b[1m${s}\x1b[0m`,
    gray: (s) => `\x1b[90m${s}\x1b[0m`,
};

console.log(color.cyan(color.bold("🧩 smart-array-difference CLI")));
console.log(color.gray("Compare two arrays (from JSON files or inline JSON)."));
console.log("--------------------------------------------------------\n");

/**
 * Usage:
 *   smart-array-difference old.json new.json
 *   smart-array-difference '[1,2,3]' '[2,3,4]'
 *   smart-array-difference old.json new.json id
 */

const [, , oldInput, newInput, keyArg] = process?.argv;

if (!oldInput || !newInput) {
    console.log(color.yellow("⚠️  Usage:"));
    console.log(color.green("   smart-array-difference old.json new.json [key]"));
    console.log(color.green("   smart-array-difference '[1,2,3]' '[2,3,4]'"));
    process?.exit(1);
};

function parseInput(input) {
    if (fs.existsSync(input)) {
        const filePath = path.resolve(input);
        return JSON.parse(fs.readFileSync(filePath, "utf8"));
    }

    try {
        return JSON.parse(input);
    }
    catch {
        console.error(color.red(`❌ Invalid JSON input: ${input}`));
        process.exit(1);
    };
};

const oldArr = parseInput(oldInput);
const newArr = parseInput(newInput);
const getKey = keyArg ? (item) => item[keyArg] : undefined;

const result = smartArrayDiff(oldArr, newArr, getKey);

// 🪄 Display results nicely
console.log(color.green("\n✅ Diff Result:\n"));
console.log(`${color.green("🟢 Added:")} ${JSON.stringify(result.added, null, 2)}`);
console.log(`${color.red("🔴 Removed:")} ${JSON.stringify(result.removed, null, 2)}`);
console.log(`${color.yellow("🟡 Updated:")} ${JSON.stringify(result.updated, null, 2)}\n`);