'use strict';

const Telegram = require('telegram-node-bot');

class startController extends Telegram.TelegramBaseController {
    startHandler($) {
        $.sendMessage('Welcome');
    }
    
    get routes() {
        return {
            'startCommand': 'startHandler'
        };
    }
}

module.exports = startController;