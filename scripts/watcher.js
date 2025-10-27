import { execSync } from "child_process";

try {
  execSync("node scripts/routes/index.js", { stdio: "inherit" });
  execSync("node scripts/i18n/index.js", { stdio: "inherit" });
} catch (err) {
  console.error(err);
  process.exit(1);
}
