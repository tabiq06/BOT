/*CMD
command: /do_broadcast
help: Broadcast execute karta hai (internal)
need_reply: false
folder: Admin
CMD*/

var ADMIN_ID = 7202000077;
if (user.id != ADMIN_ID) { return; }

var text = User.getProperty('broadcast_text') || '';
if (!text) {
  Bot.sendMessage('❌ Broadcast text nahi mila.');
  return;
}

Bot.runAll({
  command:    '/receive_broadcast',
  bb_options: { text: text }
});

Bot.sendMessage('✅ Broadcast send ho raha hai saare users ko!');
