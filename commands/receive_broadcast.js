/*CMD
command: /receive_broadcast
help: Har user ko broadcast message deliver karta hai (internal)
need_reply: false
CMD*/

var text = options ? options.text : '';
if (text) { Bot.sendMessage(text); }
