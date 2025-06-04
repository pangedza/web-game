diff --git a/script.js b/script.js
index baf13ae99cf5340525bb7e60b6e6d3dff62a973f..a8dc8a8661f7d4d33b4206a1588b082bd10edcb6 100644
--- a/script.js
+++ b/script.js
@@ -1,26 +1,63 @@
 
 const cookBtn = document.getElementById("cookBtn");
 const orderBtn = document.getElementById("orderBtn");
 const result = document.getElementById("result");
+const currencyEl = document.getElementById("currency");
+const upgradeBtn = document.getElementById("upgradeBtn");
+const upgradeCostEl = document.getElementById("upgradeCost");
 
 // Telegram WebApp init
 const tg = window.Telegram.WebApp;
 tg.expand(); // Разворачиваем на весь экран
 
+// Игровые переменные
+let currency = parseInt(localStorage.getItem("currency") || "0");
+let earnings = parseInt(localStorage.getItem("earnings") || "1");
+let upgradeCost = parseInt(localStorage.getItem("upgradeCost") || "10");
+
+function updateUI() {
+  currencyEl.innerText = currency;
+  upgradeCostEl.innerText = upgradeCost;
+}
+
+function saveProgress() {
+  localStorage.setItem("currency", currency);
+  localStorage.setItem("earnings", earnings);
+  localStorage.setItem("upgradeCost", upgradeCost);
+}
+
+updateUI();
+
 const dishes = [
   "Вок с курицей и терияки",
   "Рамен с яйцом",
   "Том Ям с креветками",
   "Чао Фань с овощами"
 ];
 
 cookBtn.onclick = () => {
   const dish = dishes[Math.floor(Math.random() * dishes.length)];
   result.innerText = `🔥 Ты приготовил: ${dish}`;
+  currency += earnings;
   orderBtn.style.display = "inline-block";
+  updateUI();
+  saveProgress();
 };
 
 orderBtn.onclick = () => {
   tg.sendData("order"); // Отправка данных в Telegram-бот
   tg.close(); // Закрытие WebApp
 };
+
+upgradeBtn.onclick = () => {
+  if (currency >= upgradeCost) {
+    currency -= upgradeCost;
+    earnings += 1;
+    upgradeCost = Math.round(upgradeCost * 1.5);
+    updateUI();
+    saveProgress();
+    result.innerText = "🎉 Ваш повар стал опытнее!";
+  } else {
+    result.innerText = "Недостаточно средств для улучшения";
+  }
+};
