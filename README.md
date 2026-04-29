# 多元需求平台

這是一個以 React + Bootstrap 建構的多元需求平台，提供使用者依照地址與分類篩選服務店家，並完成預約流程。

---

## 功能整理

### 1. 使用者帳號與會員資料

- 註冊 / 登入 / 登出
- 會員資料管理（姓名、電話）
- 常用地址管理（新增、刪除、選擇目前地址）
- Google Places API 自動完成地址輸入

### 2. 地址管理

- Navbar 中可快速輸入或選擇常用地址
- Modal 管理地址清單（新增 / 刪除 / 選擇）
- 刪除地址時有確認提示

### 3. 服務分類與店家顯示

- 首頁顯示分類卡片（居家清潔、水電維修、寵物照顧、油漆工程…）
- 點擊分類卡片 → 導向 `/category/:categoryId`
- Category 頁面：
  - 依分類 ID 過濾店家
  - 依使用者目前地址過濾服務範圍
  - 顯示店家卡片（名稱、技能、價格範圍、服務範圍）
  - 提供「預約服務」按鈕 → 導向 Booking 頁面

### 4. 店家詳細頁面

- Provider 頁面顯示單一店家詳細資訊
- 包含店家圖片、評價、聯絡方式
- 提供「預約服務」按鈕 → 導向 Booking 頁面

### 5. 預約流程

- Booking 頁面：選擇日期、時間，提交預約
- BookingSuccess 頁面：顯示預約成功訊息
- MyBookings 頁面：顯示使用者所有預約紀錄（從 localStorage 讀取）

---

## 使用步驟

1. **註冊 / 登入**
   - 使用者建立帳號並登入平台。

2. **設定常用地址**
   - 在 Profile 頁面或 Navbar 輸入地址。
   - 選擇一個地址作為 `currentAddress`。

3. **選擇服務分類**
   - 在首頁點擊分類卡片 → 進入 `/category/:categoryId`。
   - 系統會依照分類與地址顯示符合的店家。

4. **瀏覽店家**
   - 在 Category 或 Provider 頁面查看店家資訊。
   - 點擊「預約服務」進入 Booking 頁面。

5. **完成預約**
   - 在 Booking 頁面選擇日期與時間。
   - 提交後顯示 BookingSuccess。
   - 預約紀錄會存入 localStorage。

6. **查看我的預約**
   - 在 Navbar 點擊「我的預約」。
   - 顯示所有已完成的預約紀錄。

---

## 技術架構

- React 19
- React Router
- React Bootstrap
- Google Maps Places API
- LocalStorage 作為使用者資料與預約紀錄的暫存

## 專案下載與運行

### 1. 下載專案

```bash
git clone https://github.com/你的帳號/你的專案.git
cd 你的專案
```

### 2. 安裝依賴

```bash
npm install
```

### 3. 設定環境變數

```bash
REACT_APP_GOOGLE_MAPS_API_KEY=你的API_KEY
```

### 4. 啟動開發伺服器

```bash
REACT_APP_GOOGLE_MAPS_API_KEY=你的API_KEY
```

### 5. 瀏覽專案

```bash
http://localhost:3000
```
