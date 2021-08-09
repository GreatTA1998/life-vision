<script lang="ts">
  import LifeArea from './lib/LifeArea.svelte'
  import GithubLoginButton from './lib/GithubLoginButton.svelte'
  import GoogleLoginButton from './lib/GoogleLoginButton.svelte'
  import supabase from './supabase.js'

  // HELPFUL EXAMPLE CODE
  // import Counter from './lib/Counter.svelte'
  // import logo from './assets/svelte.png'
  
  let user = null
  let lifeAreas = []

  supabase.auth.onAuthStateChange(async (event, session) => {
    console.log('event, session =', event, session)

    // part 1: fetch the user
    user = supabase.auth.user()
    console.log('supabase.auth.user() =', user)

    if (!user) return

    let result = await supabase.from('AllUsers').select('*').filter('email', 'eq', user.email)
    console.log('result of looking for mirror user doc =', result)
    if (result.data.length === 0) {
      // create a mirror entry in SQL database
      const resultOfAddingUser = await supabase.from('AllUsers').insert([
        { string_id: user.id, email: user.email }
      ])
      console.log('registered the user...', resultOfAddingUser)

      const { data, error } = await supabase.from('LifeCategories').insert([
        { name: 'My physical health', metricName: 'days with 8 hours sleep', metricValue: 7, notesContent: 'Eating well, and drinking water, stretching and socializing are fundamental. Skin care matters a lot, not just for apperanace, but because itchy skin is the absolute worst.', user_email: user.email },
        { name: 'My mental health', metricName: 'weeks without insomnia', metricValue: 1, notesContent: 'If you enjoyed wasting time, it was not a waste of time (put down stories/songs/visions you like)', user_email: user.email },
        { name: 'My room', metricName: 'major cleanup/week', metricValue: 1, notesContent: 'Soft mattresses DESTROY my spine, thick blankets will make it really hot and hard to sleep, use thin ones. Windows that face walls have no sunshine and destroys mood. Insects, flies and pests are a nightmare, maintain a good hygiene level.', user_email: user.email }, 
        { name: 'My finance', metricName: '$ spent/week', metricValue: 140, notesContent: 'NEVER USE DOORDASH WHATSOEVER', user_email: user.email },

        { name: 'My peers', metricName: 'fun activities/week', metricValue: 1, user_email: user.email },
        { name: 'My special relationships', metricName: 'phone calls/month', metricValue: 1, notesContent: 'Call grandma on 503 250 3868', user_email: user.email},
        { name: 'My dates', metricName: 'dates/month', metricValue: 1, notesContent: 'Try ballroom dancing', user_email: user.email },
        { name: 'My mentors', metricName: 'sessions/month', metricValue: 0, user_email: user.email }
      ])
      // if new user, register in table
      console.log('created 8 default life areas for the user')
      console.log('data =', data)
      console.log('error =', error)
    }

    // part 2: fetch all his/her life categories
    console.log('user.id =', user.id)

    let { data, error } = await supabase
      .from('LifeCategories')
      .select('*')
      .eq('user_email', user.email)
     //  .eq('user_id', 'd2e8219b-b478-4d6a-a7ab-c36f2696ea9e') // d2e8219b-b478-4d6a-a7ab-c36f2696ea9e user.id
    
    console.log('data =', data)
    if (data) lifeAreas = data 
  })

  // helper functions
  async function updateNotesContent (nameOfLifeArea, newVal) {
    console.log('newVal =', newVal)
    const { data, error } = await supabase
      .from('LifeCategories')
      .update({ notesContent: newVal })
      .eq('name', nameOfLifeArea)
      .eq('user_email', user.email)
    console.log('successfully updated notes content, data =', data)
  }

  // helper functions
  async function updateMetricValue (newVal, nameOfLifeArea) {
    const { data, error } = await supabase
      .from('LifeCategories')
      .update({ metricValue: newVal })
      .eq('name', nameOfLifeArea)
      .eq('user_email', user.email)
    console.log('successfully updated notes content, data =', data)

    // copy and pasted from the initial fetch of categories
    let result = await supabase
      .from('LifeCategories')
      .select('*')
      .eq('user_email', user.email)
    
    if (result.data) lifeAreas = result.data
  }
</script>

<section class="text-gray-600 body-font overflow-hidden">
  <div class="container px-5 py-24 mx-auto">
    <div class="flex flex-col text-center w-full mb-20">
      <h1 class="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">Life Dashboard</h1>
      <p class="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-500">
        Metrics that correlate with how good/bad life is so you know what you neglected.
        Changing your underlying lifestyle, environment, and developing habits, skills and knowledge, is probably 
        the way to sustainably increase all these metrics over time.
      </p>
    </div>

    <GoogleLoginButton 
      {user}
    />
    <!-- <GithubLoginButton
      {user}
    /> -->

    <div class="flex flex-wrap -m-4">
      {#each lifeAreas as lifeArea }
        <LifeArea
          name={lifeArea.name}
          metricName={lifeArea.metricName}
          metricValue={lifeArea.metricValue}
          notesContent={lifeArea.notesContent}
          on:note-update={e => updateNotesContent(lifeArea.name, e.detail)}
        >
          <button on:click={updateMetricValue(lifeArea.metricValue + 1, lifeArea.name)}>+</button>
          <button on:click={updateMetricValue(lifeArea.metricValue - 1, lifeArea.name)}>-</button>
        </LifeArea>
      {/each}
    </div>
  </div>
</section>
<!-- 
<iframe 
  title="blackboard" 
  src="https://explain.education/class/XqvjscRJRntaOlPnLI3N/section/XqvjscRJRntaOlPnLI3N/room/XqvjscRJRntaOlPnLI3N"
  style="width: 100%"
  height="500"  
>

</iframe> -->
<!-- 
<a href="https://explain.mit.edu/class/mDbUrvjy4pe8Q5s5wyoD/section/mDbUrvjy4pe8Q5s5wyoD/room/hoAqWPNWAywd7MLgTfAh" target="_blank">
  <h2 class="text-center text-lg">
    Whiteboard
  </h2>
</a> -->

<!-- Expermental technologies -->
<!-- iFrame can enable different technology stacks to be mixed and matched -->
<!-- <iframe src="https://calendar.google.com/calendar/embed?src=be0qdjkrvrtbjk5ln964p13l90%40group.calendar.google.com&ctz=America%2FNew_York" style="border: 0" width="800" height="600" frameborder="0" scrolling="no"></iframe> -->

<!-- FUTURE ROADMAP -->
<!-- <VirtualDesktop/> -->
<!-- <MyExperience/> -->
<!-- <Whiteboard/> -->

<!--
TODO: 
  1. Be able to add additional "regression tests" to each category
  2. Be able to change the metric numbers 
  3. Be able to upload photos
-->

<!-- 
  It should be like a map - only show details when the users zoom in, so DON'T show 
  account balance graph unless I click for more information. 
-->

