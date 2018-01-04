'use strict';

const Telegram = require('telegram-node-bot');

class OtherwiseController extends Telegram.TelegramBaseController {
    handle($){
        $.sendMessage("En ymmärrä");
    }
}

module.exports = OtherwiseController;