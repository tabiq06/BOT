/*CMD
command: /get_access
help: Payment page aur QR code dikha
need_reply: false
CMD*/

var PRICE  = 139;
var UPI_ID = 'BHARATPE.8D0W1V3J0H14182@fbpe';

var status = User.getProperty('status');
if (status === 'approved') {
  Bot.sendMessage('✅ Tumhare paas already VIP access hai!');
  return;
}
if (status === 'pending') {
  Bot.sendMessage('⏳ Payment already pending hai. Thoda wait karo.');
  return;
}

var upiData = 'upi://pay?pa=' + UPI_ID +
              '&pn=NextGen+Services&am=' + PRICE +
              '&cu=INR&tn=VIP+Access';
var qrUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=' +
            encodeURIComponent(upiData);

var caption =
  '⚡ 𝐏𝐀𝐘𝐌𝐄𝐍𝐓 𝐆𝐀𝐓𝐄𝐖𝐀𝐘\n\n' +
  '📛 𝐀𝐜𝐜𝐞𝐬𝐬: 𝐃𝐚𝐢𝐥𝐲 𝐍𝐞𝐰 𝐕𝐢𝐝𝐞𝐨 𝐀𝐧𝐝 𝐁𝐚𝐜𝐜𝐡𝐨 𝟏𝟎𝐤+ 𝐕𝐢𝐝𝐞𝐨 𝐀𝐯𝐚𝐢𝐥𝐚𝐛𝐥𝐞 🥵\n' +
  '💵 𝐀𝐦𝐨𝐮𝐧𝐭: ₹' + PRICE + '\n' +
  '🏦 𝐔𝐏𝐈 𝐈𝐃: ' + UPI_ID + '\n\n' +
  '1️⃣ 𝐒𝐜𝐚𝐧 𝐐𝐑 𝐂𝐨𝐝𝐞\n' +
  '2️⃣ 𝐏𝐚𝐲 𝐮𝐬𝐢𝐧𝐠 𝐔𝐏𝐈\n' +
  '3️⃣ 𝐂𝐥𝐢𝐜𝐤 𝐛𝐮𝐭𝐭𝐨𝐧 𝐛𝐞𝐥𝐨𝐰';

Api.sendPhoto({
  photo:     qrUrl,
  caption:   caption,
  on_result: '/save_qr_id',
  reply_markup: {
    inline_keyboard: [
      [{ text: '✅ Maine Pay Kar Diya', callback_data: '/i_paid' }],
      [{ text: '🔙 Wapas Jao',         callback_data: '/start'  }]
    ]
  }
});
