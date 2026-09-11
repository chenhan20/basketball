# HOOPS LAB · 籃球技術分享與戰術學院 🏀

> 專門針對「側翼如何餵球給中鋒 (Post Entry Pass)」與「中鋒如何卡位要球 (Post Seal & Target Hand)」的高階實戰教學庫。具備純靜態 GitHub Pages 支援與 SVG 互動動態推演。

## 🎯 核心技術單元

1. **🏀 互動戰術動態模擬板 (Interactive Tactics Board)**：5 套即時動態 SVG 戰術推演（標準 45 度擊地、3/4 繞前破解、全繞前高低位、勇士 Split Cut、破包夾 Inside-Out）。
2. **📖 動作細節與物理槓桿 (Mechanics Breakdown)**：傳球者視角（角度、2/3 擊地、Fake to Pass、Pass Away）與中鋒視角（提早卡位、下盤鎖腳、前臂牆、目標手、下巴護球）。
3. **⚡ 5v5 團隊戰術體系 (5v5 Team Offense)**：金州勇士 Split Cut 剪刀戰術、古典高低位連線 (High-Low)、內外傳導 (Inside-Out) 與空間幾何鐵律。
4. **🎥 精選影音教學庫 (Curated Video Hub)**：整理 SportsEdTV、ATTACKBball、Shot Science、Thinking Basketball / Hakeem Olajuwon 等權威名師教學，支援頁面內嵌播放與一鍵直連 YouTube。
5. **🏋️ 科學化特訓課表 (Drill Station)**：雙人椅子卡位練習、2v2 繞前防守判讀、3人剪刀走位、破包夾三分轟炸，配備互動完成追蹤。
6. **🧠 實戰智商測驗 (Tactical IQ Quiz)**：4 道實戰低位難題即時測驗與解析。

## 🚀 部署到 GitHub Pages

本專案已設定好 GitHub Actions 工作流程（`.github/workflows/deploy.yml`），會在每次 push 到 `main` 分支時自動 build 並部署到 GitHub Pages。

- 本機開發：`npm run dev`
- 本機建置：`npm run build`
- 預覽建置：`npm run preview`


Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
