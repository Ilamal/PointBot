'use strict';

const Telegram = require('telegram-node-bot');

class stopController extends Telegram.TelegramBaseController {
    stopHandler($) {
        $.sendMessage('123');
    }
    
    get routes() {
        return {
            'stopCommand': 'stopHandler'
        };
    }
}

module.exports = stopController;