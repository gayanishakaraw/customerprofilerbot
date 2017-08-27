/*
  CONGRATULATIONS on creating your first Botpress bot!

  This is the programmatic entry point of your bot.
  Your bot's logic resides here.
  
  Here's the next steps for you:
  1. Read this file to understand how this simple bot works
  2. Read the `content.yml` file to understand how messages are sent
  3. Install a connector module (Facebook Messenger and/or Slack)
  4. Customize your bot!

  Happy bot building!

  The Botpress Team
  ----
  Getting Started (Youtube Video): https://www.youtube.com/watch?v=HTpUmDz9kRY
  Documentation: https://botpress.io/docs
  Our Slack Community: https://slack.botpress.io
*/

module.exports = function(bp) {
  // Listens for a first message (this is a Regex)
  // GET_STARTED is the first message you get on Facebook Messenger
  bp.hear(/GET_STARTED|hello|hi|test|hey|holla/i, (event, next) => {
    event.reply('#welcome') // See the file `content.yml` to see the block
  })

  // You can also pass a matcher object to better filter events
  bp.hear({
    type: /message|text/i,
    text: /exit|bye|goodbye|quit|done|leave|stop/i
  }, (event, next) => {
    event.reply('#goodbye', {
      // You can pass data to the UMM bloc!
      reason: 'unknown'
    })
  })

  bp.hear({
    type: /message|text/i,
    text: /items|buy|shop|shopping|goods/i
  }, (event, next) => {
  event.reply('#textWithQuickRepliesIcon', {
    icon1: `${process.env.BOT_BASE_URL}/formal_men.png`,
    icon2: `${process.env.BOT_BASE_URL}/shoes_men.png`,
    icon3: `${process.env.BOT_BASE_URL}/t-shirt_men.png`
  })
})

bp.hear(/QR_(FORMAL|SHOES|TSHIRT)_BUTTON/, (event, next) => {
  event.reply('#textWithQuickRepliesIcon_reply', { item: event.captured[0].toLowerCase() })
})

bp.hear('MENU_SEND_EX_02', (event, next) => {
  event.reply('#textWithQuickReplies')
})

bp.hear('TEXTWITHQUICKREPLIES.B1', (event, next) => {
  event.reply('#textWithQuickReplies_reply', { button: 'Button 1' })
})

bp.hear('TEXTWITHQUICKREPLIES.B2', (event, next) => {
  event.reply('#textWithQuickReplies_reply', { button: 'Button 2' })
})
}
