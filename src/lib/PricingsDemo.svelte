<script>
  import supabase from '../supabase.js'
  import { onMount } from 'svelte';

  // TODO: use Plaid to fetch the data
  let accountBalance = 4000; 
  let monthlyIncome = 0; 
  let numOfFunActivitiesPerWeek = 0; 
  let numOfDatesPerMonth = 0; 
  let numOfLettersPerYear = 1; 

  let roomPhotoObjectURL
  onMount(async () => {
    // get information about the room photos bucket first
    const { data, error } = await supabase
      .storage
      .getBucket('photos')
    console.log('data1 =', data)
    console.log('error1 =', error)

    const bucketsRequest = await supabase
      .storage
      .listBuckets()
    console.log("buckets =", bucketsRequest.data)
    console.log('error =', bucketsRequest.error)

    async function downloadExampleFile () {
      console.log('downloadExampleFile()')
      const { data, error } = await supabase
        .storage
        .from('photos')
        .download('public/room.png')
      console.log('data =', data)
      roomPhotoObjectURL = URL.createObjectURL(data)
      console.log('error =', error)
    }
    downloadExampleFile()
  });

  let fileUploader // a Javascript reference to the <input/> element
  async function uploadFile (e) {
    if (e.target.files.length > 1) {
      alert('Only 1 image is allowed at a time')
    }
    for (const file of e.target.files) {
      const isImage = file.type.match("image.*")
      console.log('file.type =', file.type)
      // const objectURL = URL.createObjectURL(file)
      if (!isImage) alert('Only image files are allowed')

      // upload to storage
      const { data, error } = await supabase
        .storage
        .from('photos')
        .upload('public/room.png', file)
      console.log('data =', data)
      console.log('error =', error)
    }
  };
</script>




<section class="text-gray-600 body-font overflow-hidden">
  <div class="container px-5 py-24 mx-auto">
    <div class="flex flex-col text-center w-full mb-20">
      <h1 class="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">Life Dashboard</h1>
      <p class="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-500">Metrics that correlate with how good/bad life is so you know what to do</p>
    </div>

    <div class="flex flex-wrap -m-4">

      <!-- My Physical Health -->
      <div class="p-4 xl:w-1/4 md:w-1/2 w-full">
        <div class="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden">
          <h2 class="text-sm tracking-widest title-font mb-1 font-medium">My Physical Health</h2>
          <h1 class="text-5xl text-gray-900 pb-4 mb-4 border-b border-gray-200 leading-none">Photo here</h1>
          <p class="flex items-center text-gray-600 mb-2">
            <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>Sleep: 8 hours/day
          </p>
          <p class="flex items-center text-gray-600 mb-2">
            <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>Productivity: 2 hours/day
          </p>
          <p class="flex items-center text-gray-600 mb-2">
            <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>Diet
          </p>

          <!-- Drink water, meditate etc. will be included in the detailed dashboard -->
          <button class="flex items-center mt-auto text-white bg-gray-400 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 rounded">More info
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-auto" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>

      <div class="p-4 xl:w-1/4 md:w-1/2 w-full">
        <div class="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden">
          <h2 class="text-sm tracking-widest title-font mb-1 font-medium">My Mental Health</h2>
          <h1 class="text-5xl text-gray-900 pb-4 mb-4 border-b border-gray-200 leading-none">Image here</h1>
          <p class="flex items-center text-gray-600 mb-2">
            <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>Story
          </p>
          <p class="flex items-center text-gray-600 mb-2">
            <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>Music
          </p>

          <!-- Drink water, meditate etc. will be included in the detailed dashboard -->
          <button class="flex items-center mt-auto text-white bg-gray-400 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 rounded">More info
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-auto" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- My Room -->
      <div class="p-4 xl:w-1/4 md:w-1/2 w-full">
        <div class="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden">
          <h2 class="text-sm tracking-widest title-font mb-1 font-medium">My Room</h2>
          <!-- <h1 class="text-5xl text-gray-900 pb-4 mb-4 border-b border-gray-200 leading-none">OK</h1> -->
          <img src={roomPhotoObjectURL} alt="Photo of my room">
            <!-- Upload a photo -->
            <button on:click={fileUploader.click()}
              class="mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none"
            >
              Upload a file
            </button>
            
            <!-- The real file uploader -->
            <input bind:this={fileUploader} on:change={uploadFile} id="hidden-input" type="file" multiple class="hidden" />
          <p class="flex items-center text-gray-600 mb-2">
            <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>Bed comfort: OK
          </p>

          <p class="flex items-center text-gray-600 mb-2">
            <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>Supplies: need shampoo
          </p>

          <button class="flex items-center mt-auto text-white bg-gray-400 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 rounded">More info
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-auto" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
      
      <div class="p-4 xl:w-1/4 md:w-1/2 w-full">
        <div class="h-full p-6 rounded-lg border-2 border-indigo-500 flex flex-col relative overflow-hidden">
          <!-- <span class="bg-indigo-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">POPULAR</span> -->
          <h2 class="text-sm tracking-widest title-font mb-1 font-medium">My Finance</h2>
          <h1 class="text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
            <!-- TODO: use the Plaid API -->
            <span class="{accountBalance < 3000 * 6 ? 'text-red-600' : ''} cursor-pointer">
              <a href="https://www.mitfcu2.org/tob/live/usp-core/app/redirectInitialLogin" target="_blank">${accountBalance}</a>
            </span>
            <span class="text-lg ml-1 font-normal text-blue-500">
              <a href="https://www.mitfcu2.org/tob/live/usp-core/app/redirectInitialLogin" target="_blank">
                <u>account balance</u>
              </a>
            </span>
          </h1>
          <p class="flex items-center { monthlyIncome < 4000 ? 'text-red-600' : 'text-gray-600' } mb-2">
            <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>Income: ${ monthlyIncome }/month
          </p>
          <p class="flex items-center text-gray-600 mb-2">
            <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>Rent: $1250/month
          </p>
          <p class="flex items-center text-gray-600 mb-2">
            <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>Food cost: $40/day
          </p>
          <button class="flex items-center mt-auto text-white bg-indigo-500 border-0 py-2 px-4 w-full focus:outline-none hover:bg-indigo-600 rounded">More info
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-auto" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>

      <div class="p-4 xl:w-1/4 md:w-1/2 w-full">
        <div class="h-full p-6 rounded-lg border-2 border-indigo-500 flex flex-col relative overflow-hidden">
          <!-- <span class="bg-indigo-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">POPULAR</span> -->
          <h2 class="text-sm tracking-widest title-font mb-1 font-medium">My Peers</h2>
          <h1 class="text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
            <span class="{numOfFunActivitiesPerWeek === 0 ? 'text-red-600' : ''}">{ numOfFunActivitiesPerWeek }</span>
            <span class="text-lg ml-1 font-normal text-gray-500">fun activities/week</span>
          </h1>
          <button class="flex items-center mt-auto text-white bg-indigo-500 border-0 py-2 px-4 w-full focus:outline-none hover:bg-indigo-600 rounded">More info
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-auto" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>   

      <!-- My Mentors -->
      <div class="p-4 xl:w-1/4 md:w-1/2 w-full">
        <div class="h-full p-6 rounded-lg border-2 border-indigo-500 flex flex-col relative overflow-hidden">
          <!-- <span class="bg-indigo-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">POPULAR</span> -->
          <h2 class="text-sm tracking-widest title-font mb-1 font-medium">My Mentors</h2>
          <h1 class="text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
            <span class="{numOfFunActivitiesPerWeek === 0 ? 'text-red-600' : ''}">0</span>
            <span class="text-lg ml-1 font-normal text-gray-500">meals/month</span>
          </h1>
          <button class="flex items-center mt-auto text-white bg-indigo-500 border-0 py-2 px-4 w-full focus:outline-none hover:bg-indigo-600 rounded">More info
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-auto" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>   

      <!-- My special relationships -->
      <!-- Write a letter to Prasad, Prabhakar and Winston -->
      <div class="p-4 xl:w-1/4 md:w-1/2 w-full">
        <div class="h-full p-6 rounded-lg border-2 border-indigo-500 flex flex-col relative overflow-hidden">
          <!-- <span class="bg-indigo-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">POPULAR</span> -->
          <h2 class="text-sm tracking-widest title-font mb-1 font-medium">My Special Relationships</h2>
          <h1 class="text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
            <span class="{numOfFunActivitiesPerWeek === 0 ? 'text-red-600' : ''}">{ numOfLettersPerYear }</span>
            <span class="text-lg ml-1 font-normal text-gray-500">letters/year</span>
          </h1>
          <button class="flex items-center mt-auto text-white bg-indigo-500 border-0 py-2 px-4 w-full focus:outline-none hover:bg-indigo-600 rounded">More info
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-auto" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>   

      <!-- My dates -->
      <div class="p-4 xl:w-1/4 md:w-1/2 w-full">
        <div class="h-full p-6 rounded-lg border-2 border-indigo-500 flex flex-col relative overflow-hidden">
          <!-- <span class="bg-indigo-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">POPULAR</span> -->
          <h2 class="text-sm tracking-widest title-font mb-1 font-medium">My Dates</h2>
          <h1 class="text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
            <span class="{numOfFunActivitiesPerWeek === 0 ? 'text-red-600' : ''}">{ numOfDatesPerMonth  }</span>
            <span class="text-lg ml-1 font-normal text-gray-500">dates/month</span>
          </h1>
          <button class="flex items-center mt-auto text-white bg-indigo-500 border-0 py-2 px-4 w-full focus:outline-none hover:bg-indigo-600 rounded">More info
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-auto" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>   

    </div>
  </div>
</section>