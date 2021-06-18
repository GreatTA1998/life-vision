<script>
  import supabase from '../supabase.js'

  async function logInWithGithub () {
    let { user, error } = await supabase.auth.signIn({
      provider: 'github'
    })
    console.log('user =', user)
    console.log('error =', error)
  }
  // logInWithGithub()
</script>

<button on:click={logInWithGithub}>
  Log in with Github
</button>