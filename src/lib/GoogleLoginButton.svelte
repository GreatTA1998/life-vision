<script>
  import supabase from '../supabase.js'

  export let user; 
  
  async function signInWithGoogle () {
    let { user, error } = await supabase.auth.signIn({
      provider: 'google'
    })
    console.log('user google =', user)
    console.log('error =', error)
  }

  function printCurrentUser () {
    console.log('user =', supabase.auth.user())
  }

  async function signOut () {
    console.log('signing out')
    let { error } = await supabase.auth.signOut()
    console.log('error =', error)
    user = supabase.auth.user()
  }

</script>

{#if !user}
  <button on:click={signInWithGoogle} 
    class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
  >
    Log in with Google
  </button>
{:else}
  <!-- <button on:click={printCurrentUser}>
    Print logged in user
  </button> -->
  <button on:click={signOut} 
    class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
  >
    Sign out
  </button>
{/if}