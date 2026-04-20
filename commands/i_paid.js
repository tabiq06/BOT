/*CMD
command: /i_paid
help: User ne pay kar diya — UTR maango
need_reply: false
CMD*/

var status = User.getProperty('status');
if (status === 'approved') {
  Bot.sendMessage('✅ Tumhare paas already access hai!');
  return;
}

// QR wala message delete karo
var qrId = User.getProperty('qr_msg_id');
if (qrId) {
  Api.deleteMessage({ message_id: qrId, chat_id: chat.chatid });
  User.setProperty('qr_msg_id', '');
}

// Button wala message bhi delete karo
if (request && request.message && request.message.message_id) {
  Api.deleteMessage({
    message_id: request.message.message_id,
    chat_id:    chat.chatid
  });
}

User.setProperty('step', 'enter_utr');

Api.sendMessage({
  text:      '🔢 Apna UTR / Transaction ID bhejo 👇',
  on_result: '/save_prompt_id'
});
