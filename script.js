
const cookBtn = document.getElementById("cookBtn");
const orderBtn = document.getElementById("orderBtn");
const result = document.getElementById("result");

// Telegram WebApp init
const tg = window.Telegram.WebApp;
tg.expand(); // Разворачиваем на весь экран

const dishes = [
  "Вок с курицей и терияки",
  "Рамен с яйцом",
  "Том Ям с креветками",
  "Чао Фань с овощами"
];

cookBtn.onclick = () => {
  const dish = dishes[Math.floor(Math.random() * dishes.length)];
  result.innerText = `🔥 Ты приготовил: ${dish}`;
  orderBtn.style.display = "inline-block";
};

orderBtn.onclick = () => {
  tg.sendData("order"); // Отправка данных в Telegram-бот
  tg.close(); // Закрытие WebApp
};
