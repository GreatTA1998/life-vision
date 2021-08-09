<script>
  import supabase from '../supabase.js'

  export let user; 

  async function signInWithGithub () {
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
  <button on:click={signInWithGithub} class="btn btn-blue">
    Log in with Github
  </button>
{:else}
  <!-- <button on:click={printCurrentUser} class="btn btn-blue">
    Print logged in user
  </button> -->
{/if}