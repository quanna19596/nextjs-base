import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  ...compat.config({
    extends: ["next", "plugin:prettier/recommended", "plugin:jsx-a11y/recommended"],
    plugins: ["prettier", "jsx-a11y"],
    rules: {
      "prettier/prettier": [
        "error",
        {
          semi: true,
          tabWidth: 2,
          trailingComma: "all",
          printWidth: 100,
          bracketSameLine: false,
          useTabs: false,
          arrowParens: "always",
          singleQuote: false,
          endOfLine: "auto",
          importOrder: [
            "^(react/(.*)$)|^(react$)",
            "^next(.*)$",
            "<THIRD_PARTY_MODULES>",
            "^@root/(.*)$",
            "^@/app/(.*)$",
            "^@types$",
            "^@/assets/(.*)$",
            "^@/common/(.*)$",
            "^@/components/(.*)$",
            "^@/i18n/(.*)$",
            "^@/middlewares/(.*)$",
            "^@/providers/(.*)$",
            "^@/services/(.*)$",
            "^@/stores/(.*)$",
            "^@/styles/(.*)$",
            "^@/utils/(.*)$",
            "^[./]",
          ],
          importOrderSeparation: false,
          importOrderSortSpecifiers: true,
          plugins: ["@trivago/prettier-plugin-sort-imports", "prettier-plugin-tailwindcss"],
        },
        {
          usePrettierrc: false,
        },
      ],
      "arrow-body-style": "off",
      radix: "off",
      "no-shadow": "off",
      "no-static-element-interactions": "off",
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],

      // Imports & Sorting
      "import/prefer-default-export": "off",
      "import/extensions": "off",

      // TypeScript
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-empty-interface": "off",
      "@typescript-eslint/no-use-before-define": "off",
      "@typescript-eslint/interface-name-prefix": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/explicit-function-return-type": ["error"],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-unused-expressions": [
        "error",
        { allowShortCircuit: true, allowTernary: true },
      ],
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "interface",
          format: ["PascalCase"],
          prefix: ["I"],
        },
        {
          selector: "typeAlias",
          format: ["PascalCase"],
          prefix: ["T"],
        },
      ],

      // React
      "react/react-in-jsx-scope": "off",
      "react/jsx-no-target-blank": "warn",
      "react/prop-types": "off",
      "react/jsx-props-no-spreading": "off",
      "react/button-has-type": "off",

      // Accessibility (a11y)
      "jsx-a11y/click-events-have-key-events": "off",
      "jsx-a11y/no-static-element-interactions": "off",
      "jsx-a11y/alt-text": "warn",
      "jsx-a11y/aria-props": "warn",
      "jsx-a11y/aria-proptypes": "warn",
      "jsx-a11y/aria-unsupported-elements": "warn",
      "jsx-a11y/role-has-required-aria-props": "warn",
      "jsx-a11y/role-supports-aria-props": "warn",
    },
  }),
];

export default eslintConfig;
