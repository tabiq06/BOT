/*CMD
command: /create_invite
help: Verified user ke liye Telegram invite link banao
need_reply: false
CMD*/

var CHANNEL_ID = -1003746787642;
var ADMIN_ID   = 7202000077;

var expire = Math.floor(Date.now() / 1000) + 86400;

Api.call('createChatInviteLink', {
  chat_id:      CHANNEL_ID,
  member_limit: 1,
  expire_date:  expire,
  name:         'user_' + user.id
}, {
  on_result:  '/invite_ready',
  bb_options: { admin_id: ADMIN_ID }
});
