import fs from "fs";
import path from "path";

const generatePrivateRoutes = () => {
  const baseDir = path.join(process.cwd(), "src/app");
  const targetDir = path.join(
    process.cwd(),
    "generator/routes/private-routes.json"
  );

  const pageFullPaths = [];

  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile() && entry.name === "page.tsx") {
        pageFullPaths.push(fullPath);
      }
    }
  };

  walk(baseDir);

  const privatePageFullPaths = pageFullPaths.filter((path) =>
    path.includes("(private)")
  );

  const beautifiedPrivatePagePaths = privatePageFullPaths.map((path) => {
    const pathWithoutBaseDir = path.replace(baseDir, "");
    const pathComponents = pathWithoutBaseDir.split("/");
    const validPath = pathComponents
      .filter((seg) => /^[a-zA-Z0-9]/.test(seg) || !seg)
      .join("/");
    return validPath;
  });

  fs.writeFileSync(
    targetDir,
    JSON.stringify(beautifiedPrivatePagePaths, null, 2)
  );

  console.log("✅ Generated private routes");
};

generatePrivateRoutes();
