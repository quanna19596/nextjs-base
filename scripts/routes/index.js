import fs from "fs";
import path from "path";

const generatePrivateRoutes = () => {
  const packageJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), "package.json"), "utf8"));

  const { locales } = packageJson.config.internationalization;

  const baseDir = path.join(process.cwd(), "src/app");
  const targetDir = path.join(process.cwd(), "scripts/routes/private-routes.json");

  let pagePaths = [];

  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const rawPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        walk(rawPath);
      } else if (entry.isFile() && entry.name === "page.tsx") {
        const pathWithoutBaseDir = rawPath.replace(baseDir, "").replace("/[locale]", "");
        const localePaths = locales.map((locale) => `/${locale}${pathWithoutBaseDir}`);
        pagePaths = [...pagePaths, ...localePaths];
      }
    }
  };

  walk(baseDir);

  const privatePagePaths = pagePaths.filter((path) => path.includes("(private)"));

  const beautifiedPrivatePagePaths = privatePagePaths.map((path) => {
    const pathSegments = path.replace(/\/page\.tsx$/, "").split("/");
    const validPath = pathSegments
      .filter((seg) => /^[A-Za-z0-9\[]/.test(seg) || !seg)
      .map((seg) => (/^\[.*\]$/.test(seg) ? "[A-Za-z0-9]+" : seg))
      .join("/");

    return validPath;
  });

  fs.writeFileSync(targetDir, JSON.stringify(beautifiedPrivatePagePaths, null, 2));

  console.log("✅ Router Protected!");
};

generatePrivateRoutes();
