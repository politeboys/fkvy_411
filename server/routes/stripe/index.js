const express = require('express');
const router = express.Router();
const { stripe, sgMail } = require('../../services');
const queryString = require('query-string');
const Url = require('url-parse');
const bodyParser = require('body-parser');

const { Purchase } = require('../../models');

router.post('/session', async (req, res) => {
  try {
    const { albumCover, songName, artistName, size, frame, qrCode, shippingCharge } = req.body;

    const shippingAmount = shippingCharge ? 1500 : 0

    let purchasePriceCents;
    if (size.includes('37.99')){
      if (frame) {
        purchasePriceCents = 3799 + 1000
      } else {
        purchasePriceCents = 3799
      }
    } else {
      if (frame) {
        purchasePriceCents = 2499 + 1000
      } else {
        purchasePriceCents = 2499
      }
    }

    const lineItems = [
      {
        name: `Memory Photo Plate: ${songName} - ${artistName}`,
        //description: 'If you are located outside of the United States and Canada, there will be an additional shipping cost, our team will follow-up with you and let you know the cost. Thank you.',
        description: 'Build your custom music plate and have it shipped to your address easily. Contact us if you have any questions.',
        amount: purchasePriceCents,
        currency: 'usd',
        quantity: 1,
      }
    ];

    if (shippingAmount) {
      lineItems.push({
        name: 'Shipping Charge',
        amount: shippingAmount,
        currency: 'usd',
        quantity: 1
      })
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      shipping_address_collection: {
        allowed_countries: ['AC', 'AD', 'AE', 'AF', 'AG', 'AI', 'AL', 'AM', 'AO', 'AQ', 'AR', 'AT', 'AU', 'AW', 'AX', 'AZ', 'BA', 'BB', 'BD', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ', 'BL', 'BM', 'BN', 'BO', 'BQ', 'BR', 'BS', 'BT', 'BV', 'BW', 'BY', 'BZ', 'CA', 'CD', 'CF', 'CG', 'CH', 'CI', 'CK', 'CL', 'CM', 'CN', 'CO', 'CR', 'CV', 'CW', 'CY', 'CZ', 'DE', 'DJ', 'DK', 'DM', 'DO', 'DZ', 'EC', 'EE', 'EG', 'EH', 'ER', 'ES', 'ET', 'FI', 'FJ', 'FK', 'FO', 'FR', 'GA', 'GB', 'GD', 'GE', 'GF', 'GG', 'GH', 'GI', 'GL', 'GM', 'GN', 'GP', 'GQ', 'GR', 'GS', 'GT', 'GU', 'GW', 'GY', 'HK', 'HN', 'HR', 'HT', 'HU', 'ID', 'IE', 'IL', 'IM', 'IN', 'IO', 'IQ', 'IS', 'IT', 'JE', 'JM', 'JO', 'JP', 'KE', 'KG', 'KH', 'KI', 'KM', 'KN', 'KR', 'KW', 'KY', 'KZ', 'LA', 'LB', 'LC', 'LI', 'LK', 'LR', 'LS', 'LT', 'LU', 'LV', 'LY', 'MA', 'MC', 'MD', 'ME', 'MF', 'MG', 'MK', 'ML', 'MM', 'MN', 'MO', 'MQ', 'MR', 'MS', 'MT', 'MU', 'MV', 'MW', 'MX', 'MY', 'MZ', 'NA', 'NC', 'NE', 'NG', 'NI', 'NL', 'NO', 'NP', 'NR', 'NU', 'NZ', 'OM', 'PA', 'PE', 'PF', 'PG', 'PH', 'PK', 'PL', 'PM', 'PN', 'PR', 'PS', 'PT', 'PY', 'QA', 'RE', 'RO', 'RS', 'RU', 'RW', 'SA', 'SB', 'SC', 'SE', 'SG', 'SH', 'SI', 'SJ', 'SK', 'SL', 'SM', 'SN', 'SO', 'SR', 'SS', 'ST', 'SV', 'SX', 'SZ', 'TA', 'TC', 'TD', 'TF', 'TG', 'TH', 'TJ', 'TK', 'TL', 'TM', 'TN', 'TO', 'TR', 'TT', 'TV', 'TW', 'TZ', 'UA', 'UG', 'US', 'UY', 'UZ', 'VA', 'VC', 'VE', 'VG', 'VN', 'VU', 'WF', 'WS', 'XK', 'YE', 'YT', 'ZA', 'ZM', 'ZW', 'ZZ']
      },
      success_url: encodeURI(`${process.env.FRONTEND_URL}/payment/success?albumCover=${albumCover}&songName=${songName}&artistName=${artistName}&size=${size}&frame=${frame}&qrCode=${qrCode}`),
      cancel_url: `${process.env.FRONTEND_URL}/payment/fail`
    });

    res.send({ error: false, data: session });

  } catch(e) {
    res.send({ error: true, data: e.message });
  }
});

router.post('/webhook', bodyParser.raw({type: 'application/json'}), async (req, res) => {
  try {
    const data = req.body.data.object;
    if (data.object !== 'checkout.session') throw "This route only accepts checkout session events";
    const { customer, success_url, shipping, amount_total } = data;
    const { name, address: { city, country, line1, postal_code, state } } = shipping;
    const customerData = await stripe.customers.retrieve(customer);
    const { email } = customerData;
    const url = new Url(decodeURI(success_url));
    const { query } = url;
    const { albumCover, songName, artistName, size, frame, qrCode } = queryString.parse(query);
    const purchase = new Purchase({
      customer_name: name,
      customer_email: email,
      artist_name: artistName,
      song_name: songName,
      cover_url: albumCover,
      stripe_id: customer,
      size,
      frame,
      qr_code: qrCode
    });
    const purchaseInsertId = (await purchase.insertIntoDB()).insertId;
    console.log('purchase successful, id: ', purchaseInsertId);

    await sgMail.send({
      to: ['mymusicplate@hotmail.com'],
      from: 'support@getccino.com',
      subject: 'Congrats! A New Order Has Been Placed',
      html: `
        <p>Dear My Music Plate Team,</p>
        <p>A new customer has just placed a new order:</p>
        <ul>
          <li>Name: ${name}</li>
          <li>Email: ${email}</li>
          <li>Stripe Customer Id: ${customer}</li>
          <li>Product: Music Plate</li>
          <li>Total: $${amount_total/100}</li>
          <li>Address: ${line1}, ${city} ${state}, ${country} ${postal_code}</li>
        </ul>
        <p>For producing the product, the following info is available:</p>
        <ul>
          <li>Song Name: ${songName}</li>
          <li>Artist Name: ${artistName}</li>
          <li>Album Art URL: <a href="${albumCover}">${albumCover}</a></li>
          <li>Size: ${size}</li>
          <li>Frame: ${frame}</li>
          <li>QR code: ${qrCode}</li>
        </ul>
        <p>Thank you,<br/>My Music Plate Team</p>
      `
    });

    res.send({ error: false, data: 'success'});
  } catch(e) {
    res.send({ error: true, data: e.message });
  }
});

module.exports = router;
