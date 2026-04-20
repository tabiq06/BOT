/*CMD
command: /help
help: Admin commands ki list
need_reply: false
folder: Admin
CMD*/

var ADMIN_ID = 7202000077;
if (user.id != ADMIN_ID) { return; }

Bot.sendMessage(
  '🛠 Admin Commands\n' +
  '━━━━━━━━━━━━━━━━━━━━━\n\n' +
  '📊 Stats\n' +
  '/stats — Bot statistics\n\n' +
  '🗑 User Management\n' +
  '/remove USER_ID — User reset karo\n\n' +
  '📣 Broadcast\n' +
  '/broadcast — Saare users ko message\n' +
  '/broadcast Hello! — Direct broadcast\n\n' +
  '❓ Help\n' +
  '/help — Yeh message'
);
