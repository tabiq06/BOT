/*CMD
command: /invite_ready
help: Invite link ban gaya — user ko bhejo
need_reply: false
CMD*/

var admin_id = options ? options.admin_id : 0;

if (!options || !options.result || !options.result.invite_link) {
  Bot.sendMessage('⚠️ Invite link generate nahi hua. Admin se contact karo.');
  return;
}

var link   = options.result.invite_link;
var utr    = User.getProperty('verified_utr') || '';
var payer  = User.getProperty('payer_name')   || '';
var amount = User.getProperty('paid_amount')  || '';

User.setProperty('status',      'approved');
User.setProperty('invite_link', link);

var approved = (Bot.getProperty('approved_count') || 0) + 1;
var pending  = Math.max((Bot.getProperty('pending_count') || 1) - 1, 0);
Bot.setProperty('approved_count', approved);
Bot.setProperty('pending_count',  pending);

Bot.sendMessage(
  '🎉 Payment Verified! Access Granted!\n\n' +
  '✅ BharatPe se payment confirm!\n\n' +
  '🔗 Join karo abhi:\n' + link + '\n\n' +
  '⚠️ Important:\n' +
  '• Yeh link sirf 1 baar use hoga\n' +
  '• 24 ghante mein expire hoga\n' +
  '• Kisi ko share mat karna\n\n' +
  '🔥 Enjoy karo!'
);

Api.sendMessage({
  chat_id:    admin_id,
  text:       '✅ <b>Auto-Verified Payment</b>\n' +
              '👤 Name   : ' + user.first_name + '\n' +
              '🆔 ID     : <code>' + user.id + '</code>\n' +
              '💵 Amount : ₹' + amount + '\n' +
              '🔢 UTR    : <code>' + utr + '</code>\n' +
              '👛 Payer  : ' + payer + '\n\n' +
              '🤖 Access automatically grant hua.',
  parse_mode: 'HTML'
});
