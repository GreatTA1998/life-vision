<script>
  import { createEventDispatcher } from 'svelte';

  export let name; 
  export let metricName; 
  export let metricValue; 
  export let notesContent;   

  let localNotesContent = notesContent
  const dispatch = createEventDispatcher()

  function emitNoteUpdateEvent () {
    console.log('localNotesContent =', localNotesContent)
    dispatch('note-update', localNotesContent)
  }
</script>

<div class="p-4 xl:w-1/4 md:w-1/2 w-full">
  <div class="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden">
    <h2 class="text-sm tracking-widest title-font mb-1 font-medium">
      {name}
    </h2>
    
    <h1 class="text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
      <!-- class="text-red-600" is a good highlight color -->
      <span class="{ metricValue === 0 ? 'text-red-600' : '' }">
        {metricValue}
      </span>

      <span class="text-lg ml-1 font-normal text-gray-500">
        {metricName}
      </span>
    </h1>

    <div class="mb-3 pt-0">
      <div class="mb-3">(Photo uploads coming soon)</div>
      <textarea bind:value={localNotesContent}
        class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none" rows="10"
      />
      <button on:click={emitNoteUpdateEvent}>Update notes</button>
    </div>
  </div>
</div>   
