<script>
  export let appName
  export let appDescription
  export let appURL
  export let logoURL
</script>

<div class="p-2 lg:w-1/3 md:w-1/2 w-full cursor-pointer" target="_blank">
  <div class="h-full flex items-center border-gray-200 border p-4 rounded-lg">
    <img alt="team" class="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={logoURL}>
    <div class="flex-grow">
      <h2 class="text-gray-900 title-font font-medium">
        <a href={appURL} target="_blank">
          {appName}
        </a>
      </h2>
      <p class="text-gray-500">
        <a href={appURL} target="_blank">
          {appDescription}
        </a>
      </p>
    </div>
  </div>
</div>