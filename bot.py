rom telegram import Bot, ReplyKeyboardMarkup, KeyboardButton, WebAppInfo

TOKEN = '7513458526:AAHJVC3Q0xs6cp7CW8yijzaa4AQ1L5F8HxI'
CHAT_ID = '765808288'  # узнай в @userinfobot

bot = Bot(token=TOKEN)

keyboard = [
    [KeyboardButton(text="🎮 Играть в WOK", web_app=WebAppInfo(url="https://web-game1.vercel.app"))]
]

markup = ReplyKeyboardMarkup(keyboard, resize_keyboard=True)

bot.send_message(
    chat_id=CHAT_ID,
    text="Запусти игру прямо здесь в Telegram!",
    reply_markup=markup
)
