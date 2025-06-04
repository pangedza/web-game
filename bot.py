rom telegram import Bot, ReplyKeyboardMarkup, KeyboardButton, WebAppInfo

TOKEN = ''
CHAT_ID = ''  # узнай в @userinfobot

bot = Bot(token=TOKEN)
1
keyboard = [
    [KeyboardButton(text="🎮 Играть в WOK", web_app=WebAppInfo(url="https://web-game1.vercel.app"))]
]

markup = ReplyKeyboardMarkup(keyboard, resize_keyboard=True)

bot.send_message(
    chat_id=CHAT_ID,
    text="Запусти игру прямо здесь в Telegram!",
    reply_markup=markup
)
