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
  <button on:click={signInWithGoogle}>
    Log in with Google
  </button>
{:else}
  <!-- <button on:click={printCurrentUser}>
    Print logged in user
  </button> -->
  <!-- <button on:click={signOut}>
    Sign out
  </button> -->
{/if}