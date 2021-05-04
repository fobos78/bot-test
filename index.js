const TelegramApi = require('node-telegram-bot-api');
const {gameOptions} = require('./options');
const token = '1790988929:AAHDa-EipV4s9ILtJ2YbbFdX3lmLm3psmCA';

const bot = new TelegramApi(token, {polling: true});

const  chats = {};

bot.setMyCommands([
  {command: '/info', description: 'информация о пользователе'},
  {command: '/game', description: 'Игра угадай число'},
]);

const start = () => {
  bot.on('message', async msg => {
    const text = msg.text;
    const chatId = msg.chat.id;
    if(text === '/info') {
      await bot.sendSticker(chatId,'https://tlgrm.ru/_/stickers/ea5/382/ea53826d-c192-376a-b766-e5abc535f1c9/7.webp');
      return bot.sendMessage(chatId, `Тебя зовут - ${msg.from.first_name}`);
    }
    if(text === '/game') {
      await bot.sendMessage(chatId, `Сейчас я загадаю число от 0 до 9, а ты должен его угадать`);
      const randomNum = Math.floor(Math.random() * 10);
      chats[chatId] = randomNum;
      return bot.sendMessage(chatId, 'Отгадывай', gameOptions);
    }
    return bot.sendMessage(chatId, 'Я тебя не понимаю');
  });
  bot.on('callback_query', async msg => {
    const data = msg.data;
    const chatId = msg.message.chat.id;

    await bot.sendMessage(chatId, `Ты выбрал цифру ${data}`);
    if(chats[chatId] == data){
      return bot.sendMessage(chatId, `Ты угадал`);
    } else {
      return bot.sendMessage(chatId, `Ты не угадал`);
    }
  });
};

start();