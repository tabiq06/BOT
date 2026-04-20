/*CMD
command: /stats
help: Admin — bot statistics dekho
aliases: /users
need_reply: false
folder: Admin
CMD*/

var ADMIN_ID = 7202000077;
if (user.id != ADMIN_ID) { return; }

var total    = Bot.getProperty('total_users')    || 0;
var approved = Bot.getProperty('approved_count') || 0;
var pending  = Bot.getProperty('pending_count')  || 0;

Bot.sendMessage(
  '📊 Bot Statistics\n' +
  '━━━━━━━━━━━━━━━━━━━━━\n' +
  '👥 Total Users  : ' + total    + '\n' +
  '✅ Approved     : ' + approved + '\n' +
  '⏳ Pending      : ' + pending  + '\n' +
  '🆕 Others       : ' + (total - approved - pending)
);
