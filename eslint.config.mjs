import js from "@eslint/js";
import ts from "typescript-eslint";
import prettier from "eslint-config-prettier";
import globals from "globals";

export default ts.config(
  // 1. 基本となる JS/TS 推奨設定
  js.configs.recommended,
  ...ts.configs.recommended,

  // 2. プロジェクト全体の設定
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.es2022,
      },
    },
    rules: {
      /**
       * google-config の代わりとなる主要なルール
       */
      "indent": ["error", 2],
      "quotes": ["error", "single"],
      "semi": ["error", "always"],
      "no-var": "error",
      "prefer-const": "error",
      "curly": ["error", "all"],
      "max-len": ["warn", { "code": 80 }], // Google 標準は 80 ですが、お好みで 100~120 に。

      // TypeScript 用の調整があればここに追加
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },

  // 3. Prettier との競合回避（最後に配置）
  prettier,

  // 4. 無視するファイルの設定 (旧 .eslintignore)
  {
    ignores: ["dist/", "node_modules/", "build/"],
  }
);
