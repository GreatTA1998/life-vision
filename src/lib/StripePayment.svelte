<!-- <script>
  import { loadStripe } from '@stripe/stripe-js';

  async function startPayment () {
    const stripe = await loadStripe('pk_live_yNCVabqsIlTJ6QQtaYys4SAb');
    console.log('Successfully loaded stripe.')
    
    const session = await stripe.checkout.sessions.create({
      success_url: 'https://example.com/success',
      cancel_url: 'https://example.com/cancel',
      payment_method_types: ['card'],
      line_items: [
        {price: 'price_H5ggYwtDq4fbrJ', quantity: 2},
      ],
      mode: 'payment',
    });

    const YOUR_DOMAIN = 'http://localhost:3000'
    stripe.redirectToCheckout({ sessionId: '123' })
    // const session = await stripe.checkout.sessions.create({
    //   payment_method_types: ['card'],
    //   line_items: [
    //     {
    //       price_data: {
    //         currency: 'usd',
    //         product_data: {
    //           name: 'Stubborn Attachments',
    //           images: ['https://i.imgur.com/EHyR2nP.png'],
    //         },
    //         unit_amount: 2000,
    //       },
    //       quantity: 1,
    //     },
    //   ],
    //   mode: 'payment',
    //   success_url: `${YOUR_DOMAIN}/success.html`,
    //   cancel_url: `${YOUR_DOMAIN}/cancel.html`,
    // });
  }
  // startPayment()
</script>

<button on:click={startPayment}>
  Start Payment
</button>
 -->
