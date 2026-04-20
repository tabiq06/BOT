/*CMD
command: /bharatpe_err
help: BharatPe API error callback
need_reply: false
CMD*/

var admin_id = options ? options.admin_id : 0;
var utr      = options ? options.utr      : '';

User.setProperty('status', 'new');

Bot.sendMessage(
  '⚠️ BharatPe server se connect nahi ho paya.\n' +
  'Network error. 2 minute baad dobara try karo.\n\n' +
  '/start se retry karo.'
);

Api.sendMessage({
  chat_id:    admin_id,
  text:       '⚠️ <b>BharatPe API Error</b>\n' +
              'User: ' + user.first_name + ' (<code>' + user.id + '</code>)\n' +
              'UTR: <code>' + utr + '</code>\n' +
              'Error: ' + (content || 'network error'),
  parse_mode: 'HTML'
});
