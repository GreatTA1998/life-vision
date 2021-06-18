<script>
  import supabase from '../supabase.js'

  let user = supabase.auth.user()
  console.log('user initially =', user)

  async function logInWithGithub () {
    let { user, error } = await supabase.auth.signIn({
      provider: 'github'
    })
    console.log('user =', user)
    console.log('error =', error)
  }

  function printCurrentUser () {
    console.log('user =', supabase.auth.user())
  }
</script>

{#if !user}
  <button on:click={logInWithGithub}>
    Log in with Github
  </button>
{:else}
  <button on:click={printCurrentUser}>
    Print logged in user
  </button>
{/if}