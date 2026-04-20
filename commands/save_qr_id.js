/*CMD
command: /save_qr_id
help: QR message ID save karta hai (internal)
need_reply: false
CMD*/

if (options && options.result && options.result.message_id) {
  User.setProperty('qr_msg_id', options.result.message_id);
}
