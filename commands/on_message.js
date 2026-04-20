/*CMD
command: on_message
help: Saare free text messages handle karta hai
need_reply: false
CMD*/

var ADMIN_ID    = 7202000077;
var PRICE       = 139;
var MERCHANT_ID = '68838295';
var BP_TOKEN    = 'e2bcf65470144e22bb0ac0be8c7216f8';

var step   = User.getProperty('step');
var status = User.getProperty('status');

// ─── Broadcast input (Admin) ───────────────────────────────
if (step === 'broadcast_input') {
  if (user.id != ADMIN_ID) { User.setProperty('step', ''); return; }

  if (!message || !message.trim()) {
    Bot.sendMessage('❌ Message khaali hai. Dobara /broadcast karo.');
    return;
  }

  User.setProperty('step', '');
  User.setProperty('broadcast_text', message.trim());
  Bot.sendMessage('📣 Broadcast shuru ho raha hai...');
  Bot.run({ command: '/do_broadcast', run_after: 1 });
  return;
}

// ─── UTR input (User) ──────────────────────────────────────
if (step !== 'enter_utr') { return; }

if (status === 'approved') {
  Bot.sendMessage('✅ Tumhare paas already access hai!');
  User.setProperty('step', '');
  return;
}

var utr = message ? message.trim() : '';

if (!utr || utr.length < 6) {
  Bot.sendMessage('⚠️ UTR bahut chhota hai. Sahi Transaction ID bhejo.');
  return;
}

// UTR prompt delete karo
var promptId = User.getProperty('prompt_msg_id');
if (promptId) {
  Api.deleteMessage({ message_id: promptId, chat_id: chat.chatid });
  User.setProperty('prompt_msg_id', '');
}

// User ka khud ka message bhi delete karo
if (request && request.message_id) {
  Api.deleteMessage({ message_id: request.message_id, chat_id: chat.chatid });
}

User.setProperty('step', '');
User.setProperty('pending_utr', utr);
User.setProperty('status', 'pending');

var pending = (Bot.getProperty('pending_count') || 0) + 1;
Bot.setProperty('pending_count', pending);

Bot.sendMessage('🔄 Verify ho raha hai... BharatPe se check kar raha hoon ⏳');

var apiUrl =
  'https://payments-tesseract.bharatpe.in/api/v1/merchant/transactions' +
  '?module=PAYMENT_ALL&pageSize=100&merchantId=' + MERCHANT_ID;

HTTP.get({
  url: apiUrl,
  headers: {
    'token':      BP_TOKEN,
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    'Accept':     'application/json',
    'Referer':    'https://merchant.bharatpe.in/'
  },
  success:    '/bharatpe_ok',
  error:      '/bharatpe_err',
  bb_options: { utr: utr, price: PRICE, admin_id: ADMIN_ID }
});
