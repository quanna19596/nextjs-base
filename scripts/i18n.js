import fs from "fs";
import path from "path";

const I18N_DIR = path.resolve("src/i18n");

const packageJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), "package.json"), "utf8"));
const { defaultLocale } = packageJson.config.internationalization;

const validateI18nSync = () => {
  const flatten = (obj, prefix) => {
    return Object.keys(obj).flatMap((key) => {
      const newKey = prefix ? `${prefix}.${key}` : key;
      return typeof obj[key] === "object" && !Array.isArray(obj[key])
        ? flatten(obj[key], newKey)
        : newKey;
    });
  };

  const files = fs.readdirSync(I18N_DIR).filter((f) => f.endsWith(".json"));
  const baseFile = path.join(I18N_DIR, `${defaultLocale}.json`);
  if (!fs.existsSync(baseFile)) throw new Error(`Missing base file: ${baseFile}`);

  const base = JSON.parse(fs.readFileSync(baseFile, "utf8"));
  const baseKeys = flatten(base);

  let hasError = false;

  for (const file of files) {
    if (file === `${defaultLocale}.json`) continue;

    const locale = file.replace(".json", "");
    const json = JSON.parse(fs.readFileSync(path.join(I18N_DIR, file), "utf8"));
    const keys = flatten(json);

    const missing = baseKeys.filter((k) => !keys.includes(k));
    const extra = keys.filter((k) => !baseKeys.includes(k));

    if (missing.length || extra.length) {
      hasError = true;
      console.error(`\n❌ Locale "${locale}" has issues:`);
      if (missing.length) console.error("   🚫 Missing keys:", missing);
      if (extra.length) console.error("   ⚠️ Extra keys:", extra);
    }
  }

  if (hasError) {
    console.error("\n❌ I18n validation failed!");
    process.exit(1);
  } else {
    console.log("✅ I18n files are synced!");
  }
};

const generateI18nKeyTypes = () => {
  const localePath = path.join(I18N_DIR, `${defaultLocale}.json`);
  const outputPath = path.join("generated", `i18n.types.d.ts`);

  const data = JSON.parse(fs.readFileSync(localePath, "utf8"));

  const flatten = (obj, prefix = "") => {
    return Object.entries(obj).flatMap(([key, value]) => {
      const newKey = prefix ? `${prefix}.${key}` : key;
      return typeof value === "object" ? flatten(value, newKey) : newKey;
    });
  };

  const keys = flatten(data);

  const typeDef = `export type TTranslationKey =\n${keys.map((k) => `  | "${k}"`).join("\n")};\n`;

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, typeDef);

  console.log("✅ Generated TranslationKey type");
};

validateI18nSync();
generateI18nKeyTypes();
