'use strict';

const Telegram = require('telegram-node-bot');
let limit = 10;
class pointController extends Telegram.TelegramBaseController {
    addHandler($) {
        let name = $.message.text.split(' ').splice(1,1).join();
        let points = parseInt($.message.text.split(' ').splice(2));                      
        
        if(!name)
            return $.sendMessage('Please add name, /add name points');
        if (!points)
            return $.sendMessage('Please add points, /add name points');
        if(points>limit)
            return $.sendMessage('Point ammount is over the limit. Current limit is : '+limit);
        
        $.getChatSession('pisteet')
            .then(pisteet => {
                if(!Array.isArray(pisteet)){ 
                    $.setChatSession('pisteet', [{"name": name, "points": points}]);
                    return $.sendMessage('Points added first');
                }
                else if(this._findNameAdd(name, pisteet, points)){
                    $.setChatSession('pisteet',pisteet);
                    return $.sendMessage('Points added on top');
                }
                else $.setChatSession('pisteet', pisteet.concat([{"name": name, "points": points}]));
                $.sendMessage('Points added');
            });              
    }
    
    viewHandler($) {
        $.getChatSession('pisteet').then(pisteet => {
            if(!Array.isArray(pisteet))
                return $.sendMessage('Ei vielä pisteitä, lisää /add komennolla');
          $.sendMessage(this._serializeList(pisteet), { parse_mode: 'Markdown'});

        });
    }
    
    deleteHandler($) {
        let name = $.message.text.split(' ').splice(1).join();
        if(!name)
            return $.sendMessage('Please add a name to delete');
        $.getChatSession('pisteet')
            .then(pisteet => {
            if(!Array.isArray(pisteet))
                return $.sendMessage('Ei vielä pisteitä, lisää /add komennolla');
            if(this._findNameDel(name,pisteet,$))
                return $.sendMessage('Success!');
            else
                $.sendMessage('Name not found');
        });
        
    }
    limitHandler($) {
        let newLimit = parseInt($.message.text.split(' ').splice(1,1));
        if(!newLimit)
            return $.sendMessage('Please give a valid new limit');
        limit = newLimit;
        $.sendMessage('Success! New limit is set to : '+limit);
    }
    get routes() {
        return {
            'addCommand': 'addHandler',
            'viewCommand': 'viewHandler',
            'deleteCommand': 'deleteHandler',
            'limitCommand': 'limitHandler'
        };
    }
    _serializeList(pisteetList) {
        let serialized = '*Pistelista:*\n\n';
        pisteetList = pisteetList.sort(function(a, b){
            return b["points"] - a["points"];
        });
        pisteetList.forEach((t, i) => {
            serialized += `*${i+1}* - ${t["name"]} - ${t["points"]} \n`;
        });
        return serialized;
    }
    _findNameDel(name,list, $) {
        let found = false;
        list.forEach((t, i) => {
            if (t.name === name) {
            found = true;
            list.splice(i,1);
            $.setChatSession('pisteet', list);
        }
    });
        return found;
    }
        _findNameAdd(name,list,addition) {
        let found = false;
        list.forEach((t, i) => {
            if (t.name === name) {
            found = true;
            t['points']+=addition;
        }
    });
        return found;
    }

}

module.exports = pointController;