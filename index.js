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
    //var username = profile.id;
    var gender = undefined;
    var wearType = undefined;
    var bodyType = undefined;
    var dressType = undefined;
    var size = undefined;
    var sleeveType = undefined;
    var color = undefined;

    //const staticData = require('../static_data');

    var catalog = [
    { name: 'LeBond Fashion - Slim Fit Shirt', sku: 'LBFS-81060-COL04', image: 'https://hameedia.com/media/catalog/product/optimized/0/4/04f2fc83c449f2edc679b5ecfa45d7b0/aus_web-445_0001_layer_18.jpg', price: 'Rs 1,990.00' },
    { name: 'Envoy London Tailored Fit - Platinum Collection', sku: 'ENPC-5138522-COL04', image: 'https://hameedia.com/media/catalog/product/optimized/2/c/2cf3b70370d0fce4aebe111bc2e5ca43/28_1.jpg', price: 'Rs 4,495.00' },
    { name: 'Envoy London - Ceremonial Shirt', sku: 'ECLR-5130865-White', image: 'https://hameedia.com/media/catalog/product/optimized/5/f/5fe08e7a485d8b894ca21b7be461c715/37.jpg', price: 'Rs 5,995.00' },
    { name: 'Envoy Sport Regular Fit Shirt', sku: 'ENSP-80091-2', image: 'https://hameedia.com/media/catalog/product/optimized/0/d/0d503f086f31d334f16152e65b912931/hho_7093_copy.jpg', price:'Rs 2,995.00' },
    { name: 'LB Sport Slim Fit Shirt', sku: 'LBSP-79690-2-Blue', image: 'https://hameedia.com/media/catalog/product/optimized/0/d/0d503f086f31d334f16152e65b912931/hho_7122_copy_1.jpg', price:'Rs 1,995.00' }
  ];

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
    icon1: `https://d30y9cdsu7xlg0.cloudfront.net/png/110381-200.png`,
    icon2: `https://d30y9cdsu7xlg0.cloudfront.net/png/72758-200.png`,
    icon3: `https://d30y9cdsu7xlg0.cloudfront.net/png/60394-200.png`
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

bp.hear('WELCOME.B1', (event, next) => {
  event.reply('#storeSelection_reply', { button: 'Shop' })
})

bp.hear('WELCOME.B2', (event, next) => {
  event.reply('#contactUsSelection_reply', { button: 'Contact Us' })
})

bp.hear('STORESELECTION_REPLY.B1', (event, next) => {
  this.wearType = 'Party';
  event.reply('#itemsSelection_reply', { button: 'Party' })
})

bp.hear('STORESELECTION_REPLY.B2', (event, next) => {
  this.wearType = 'Casual';
  event.reply('#itemsSelection_reply', { button: 'Casual' })
})

bp.hear('STORESELECTION_REPLY.B3', (event, next) => {
  this.wearType = 'Formal';
  event.reply('#itemsSelection_reply', { button: 'Formal' })
})

bp.hear('STORESELECTION_REPLY.B4', (event, next) => {
  this.wearType = 'Function';
  event.reply('#itemsSelection_reply', { button: 'Function' })
})

bp.hear('ITEMSSELECTION_REPLY.B1', (event, next) => {
  this.gender = 'Men';
  event.reply('#genderSelection_reply', {
    ovel: `https://customerprofilerbot.herokuapp.com/bodyshapes/ovel.PNG`,
    trangle: `https://customerprofilerbot.herokuapp.com/bodyshapes/Trangle.PNG`,
    rectangles: `https://customerprofilerbot.herokuapp.com/bodyshapes/Rectangles.PNG`,
    romboid: `https://customerprofilerbot.herokuapp.com/bodyshapes/Romoboid.PNG`,
    invertedTrangle: `https://customerprofilerbot.herokuapp.com/bodyshapes/InvertedTrangle.PNG`    
  })
})

bp.hear(/QR_(OVEL|TRANGLE|RECTANGLE|RHOMBOID|ITRANGLE)_BUTTON/, (event, next) => {
  event.reply('#bodyTypeSection_reply', { bodyType: event.captured[0].toLowerCase() }, { items:this.catalog })
})

//bp.hear('GENDERSELECTION_REPLY', (event, next) => {
//  event.reply('#carouselOfCities', { items: staticData.items })
//})
}

