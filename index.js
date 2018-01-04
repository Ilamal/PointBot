'use strict'

const Telegram = require('telegram-node-bot');
const TelegramBaseController = Telegram.TelegramBaseController
const TextCommand = Telegram.TextCommand
const tg = new Telegram.Telegram('452126621:AAH7SQZAKoNw26DHg2Y2ZixyXtJ3RR7zd88', {
    workers: 1
});

const startController = require('./controllers/start')
    , stopController = require('./controllers/stop')
    , pointController = require('./controllers/point')
    , OtherwiseController = require('./controllers/otherwise');

tg.router.when(new Telegram.TextCommand('/start','startCommand'), new startController())
.when(new Telegram.TextCommand('/stop','stopCommand'), new stopController())
.when(new Telegram.TextCommand('/add','addCommand'), new pointController())
.when(new Telegram.TextCommand('/view','viewCommand'), new pointController())
.when(new Telegram.TextCommand('/delete','deleteCommand'), new pointController())
.when(new Telegram.TextCommand('/limit','limitCommand'), new pointController())
.otherwise(new OtherwiseController());



