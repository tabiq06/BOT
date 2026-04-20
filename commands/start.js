/*CMD
command: /start
help: Bot start karo
need_reply: false
CMD*/

var ADMIN_ID   = 7202000077;
var CHANNEL_ID = -1003746787642;
var PRICE      = 139;
var UPI_ID     = 'BHARATPE.8D0W1V3J0H14182@fbpe';

var status = User.getProperty('status');
var name   = user.first_name || 'User';

if (!status || status === 'new') {
  var total = Bot.getProperty('total_users') || 0;
  Bot.setProperty('total_users', total + 1);
  User.setProperty('status', 'new');
}

if (status === 'approved') {
  var link = User.getProperty('invite_link') || '—';
  Bot.sendMessage(
    '✅ Tumhare paas already VIP access hai!\n\n' +
    '🔗 Join Link:\n' + link + '\n\n' +
    'Agar expire ho gaya ho toh admin se contact karo.'
  );
  return;
}

if (status === 'pending') {
  Bot.sendMessage(
    '⏳ Tumhara payment verify ho raha hai...\n' +
    'Thodi der mein automatically access mil jayega.'
  );
  return;
}

Bot.sendInlineKeyboard(
  [[{ title: '🔓 Get VIP Access  ₹' + PRICE, command: '/get_access' }]],
  '👋 𝐇𝐄𝐋𝐋𝐎 ' + name + ' \n\n' +
  '𝐃𝐢𝐫𝐞𝐜𝐭 𝐏#𝐫𝐧 𝐕𝐢𝐝𝐞𝐨 𝐂𝐡𝐚𝐧𝐧𝐞𝐥 🥵\n\n' +
  '✅𝐌𝐨𝐦 & 𝐒𝐨𝐧 𝐕𝐢𝐝𝐞𝐨𝐬 💞\n' +
  '✅𝐈𝐧𝐬𝐭𝐚𝐠𝐫𝐚𝐦 𝐕𝐢𝐫𝐚𝐥 𝐕𝐢𝐝𝐞𝐨 🤡\n' +
  '✅𝟐 𝐁𝐚𝐜𝐜𝐡𝐞 𝐎𝐫 𝐀𝐮𝐧𝐭𝐲 𝐊𝐢 𝐕𝐢𝐫𝐚𝐥 𝐕𝐢𝐝𝐞𝐨\n' +
  '✅𝐈𝐧𝐝𝐢𝐚𝐧 𝐃𝐞𝐬𝐢 𝐕𝐢𝐝𝐞𝐨𝐬❤️‍🔥\n\n' +
  '𝟓𝟏𝟎𝟎𝟎+ 𝐔𝐧𝐥𝐢𝐦𝐢𝐭𝐞𝐝 𝐕𝐢𝐝𝐞𝐨 𝐆𝐚𝐥𝐥𝐫𝐞𝐲 ⏳𝐋𝐢𝐟𝐞𝐭𝐢𝐦𝐞. 𝐀𝐜𝐜𝐞𝐬𝐬 𝐒𝐢𝐫𝐟:- 𝟏𝟑𝟗₹\n' +
  '𝐃𝐢𝐫𝐞𝐜𝐭 𝐕𝐢𝐝𝐞𝐨𝐬 (𝐍𝐨 𝐋𝐢𝐧𝐤𝐬)\n\n' +
  '𝐉𝐮𝐬𝐭 𝐏𝐚𝐲 𝐀𝐧𝐝 𝐄𝐧𝐭𝐫𝐲 𝐏𝐫𝐢𝐯𝐚𝐭𝐞 𝟏𝟖+ 𝐕𝐢𝐝𝐞𝐨 𝐂𝐡𝐚𝐧𝐧𝐞𝐥 👄💋 🥵\n\n' +
  '𝐋𝐢𝐦𝐢𝐭𝐞𝐝 𝐎𝐟𝐟𝐞𝐫 𝐏𝐫𝐢𝐜𝐞:- 𝟏𝟑𝟗𝐫𝐬'
);
