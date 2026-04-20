/*CMD
command: /bharatpe_ok
help: BharatPe API success callback — UTR check karo
need_reply: false
CMD*/

var utr      = options ? options.utr      : '';
var price    = options ? options.price    : 139;
var admin_id = options ? options.admin_id : 0;

if (!content) {
  Bot.sendMessage('⚠️ BharatPe ka jawab khaali aaya. Admin se contact karo.');
  return;
}

var resp;
try { resp = JSON.parse(content); }
catch(e) {
  Bot.sendMessage('⚠️ Response parse nahi hua. Admin se contact karo.');
  return;
}

if (!resp || !resp.status) {
  Bot.sendMessage('⚠️ BharatPe API error. Dobara try karo ya admin se milao.');
  return;
}

var txns   = (resp.data && resp.data.transactions) ? resp.data.transactions : [];
var utrLow = utr.toLowerCase().trim();
var found  = null;

for (var i = 0; i < txns.length; i++) {
  var t       = txns[i];
  var bankRef = (t.bankReferenceNo || '').toLowerCase().trim();
  var intUtr  = (t.internalUtr    || '').toLowerCase().trim();
  if (utrLow === bankRef || utrLow === intUtr ||
      bankRef.indexOf(utrLow) === 0 || intUtr.indexOf(utrLow) === 0) {
    found = t;
    break;
  }
}

if (!found) {
  User.setProperty('status', 'new');
  Bot.sendMessage(
    '⚠️ UTR nahi mila!\n\n' +
    '• Payment abhi process ho rahi hai (2-3 min baad try karo)\n' +
    '• UTR galat type hua\n' +
    '• Payment actually fail hua\n\n' +
    '/start se dobara try karo.'
  );
  Api.sendMessage({
    chat_id:    admin_id,
    text:       '⚠️ <b>Failed UTR</b>\n' +
                'User: ' + user.first_name + ' (<code>' + user.id + '</code>)\n' +
                'UTR: <code>' + utr + '</code>\nReason: not_found',
    parse_mode: 'HTML'
  });
  return;
}

if (found.status !== 'SUCCESS') {
  User.setProperty('status', 'rejected');
  Bot.sendMessage(
    '❌ Is UTR ka payment SUCCESS nahi tha.\n' +
    'Status: ' + found.status + '\nDobara pay karke try karo. /start'
  );
  return;
}

if (parseFloat(found.amount) < price) {
  User.setProperty('status', 'rejected');
  Bot.sendMessage(
    '❌ Amount kam hai!\n' +
    'Required: ₹' + price + ' | Paid: ₹' + found.amount + '\n' +
    'Exact ₹' + price + ' pay karo. /start'
  );
  return;
}

User.setProperty('verified_utr', utr);
User.setProperty('payer_name',   found.payerName || '');
User.setProperty('paid_amount',  found.amount);

Bot.sendMessage('✅ Payment verified! Invite link generate ho raha hai...');
Bot.run({ command: '/create_invite', run_after: 1 });
