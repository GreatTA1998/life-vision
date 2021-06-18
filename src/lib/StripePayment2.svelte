<script lang="ts">
  import Stripe from 'stripe'

  async function initiateStripe () {
    const stripe = new Stripe('pk_live_yNCVabqsIlTJ6QQtaYys4SAb', {
      apiVersion: '2020-08-27',
    })

    const createCustomer = async () => {
      const params: Stripe.CustomerCreateParams = {
        description: 'test customer',
      };

      const customer: Stripe.Customer = await stripe.customers.create(params);

      console.log(customer.id);
    };
    // createCustomer();
  }
  
    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount: 1000,
    //   currency: 'usd',
    //   payment_method_types: ['card'],
    //   receipt_email: 'jenny.rosen@example.com',
    // });
</script>

<button on:click={initiateStripe}>
  Start Payment
</button>

