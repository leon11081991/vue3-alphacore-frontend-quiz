# Alphacore Frontend Quiz（Vue 3 + TypeScript + Vite）

## 📁 專案介紹

此專案為天昕科技前端測驗<br>
使用 Vue 3、Quasar、TypeScript 開發

---

## 📦 安裝依賴

```bash
npm install
```

---

## ⚙️ 環境變數設定
請依照 .env.example 建立對應的環境檔：
```bash
cp .env.example .env.dev
```

---

## 🚀 啟用

```bash
#開發
npm run dev

#打包
npm run build

# 預覽
npm run preview
```

---

## 📁 專案架構
```bash
├── public/         # 靜態資源
├── src/
│ ├── assets/       # 圖片與樣式資源
│ ├── components/   # 可重用元件
│ ├── constants/    # 常數定義
│ ├── dto/          # 資料傳輸結構定義（Data Transfer Object）
│ ├── libs/         # 第三方套件相關
│ ├── views/        # 單頁應用頁面
│ ├── router/       # Vue Router 設定
│ ├── services/     # 請求路由
│ ├── stores/       # Pinia 狀態管理
│ ├── types/        # 型別定義
│ ├── utils/        # 工具方法
│ ├── App.vue       # 根組件
│ └── main.ts       # 入口文件
├── .env            # 環境變數
├── .env.example    # 環境變數範例
├── vite.config.ts  # Vite 設定
├── tsconfig.json   # TypeScript 設定
├── package.json    # 專案依賴與指令
└── README.md       # 說明文件（本檔案）
```

---

## 🧰 使用技術
- Vue 3(Composition API)
- TypeScript
- Pinia(Setup Stores)
- Vue Router
- Quasar UI
- Vite
