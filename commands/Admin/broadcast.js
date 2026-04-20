/*CMD
command: /broadcast
help: Admin — saare users ko message bhejo
need_reply: false
folder: Admin
CMD*/

var ADMIN_ID = 7202000077;
if (user.id != ADMIN_ID) { return; }

var parts = message ? message.split(' ') : [];
parts.shift();
var inline_text = parts.join(' ').trim();

if (inline_text) {
  User.setProperty('broadcast_text', inline_text);
  Bot.run({ command: '/do_broadcast', run_after: 1 });
  Bot.sendMessage('📣 Broadcasting: ' + inline_text);
  return;
}

Bot.sendMessage(
  '📣 Broadcast Mode\n\n' +
  'Jo message bhejoge woh SAARE users ko jayega.\n\n' +
  'Apna broadcast message type karo 👇'
);
User.setProperty('step', 'broadcast_input');
