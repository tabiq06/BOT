/*CMD
command: /save_prompt_id
help: UTR prompt message ID save karta hai (internal)
need_reply: false
CMD*/

if (options && options.result && options.result.message_id) {
  User.setProperty('prompt_msg_id', options.result.message_id);
}
