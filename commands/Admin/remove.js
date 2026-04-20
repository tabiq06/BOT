/*CMD
command: /remove
help: Admin — user ka access reset karo. Usage: /remove USER_ID
need_reply: false
folder: Admin
CMD*/

var ADMIN_ID = 7202000077;
if (user.id != ADMIN_ID) { return; }

var parts  = message ? message.split(' ') : [];
var target = parts[1] ? parseInt(parts[1]) : 0;

if (!target) {
  Bot.sendMessage('Usage: /remove USER_ID\nExample: /remove 123456789');
  return;
}

User.setProperty('status',       'new', target);
User.setProperty('invite_link',  '',    target);
User.setProperty('pending_utr',  '',    target);
User.setProperty('verified_utr', '',    target);
User.setProperty('step',         '',    target);

Bot.sendMessage(
  '🗑 User ' + target + ' reset ho gaya.\n' +
  'Ab woh dobara /start karke fresh payment kar sakta hai.'
);
