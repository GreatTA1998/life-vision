<script lang="ts">
  import logo from './assets/svelte.png'
  import Counter from './lib/Counter.svelte'
  import LineGraph from './lib/LineGraph.svelte'
  import StatisticsPage from './lib/StatisticsPage.svelte'
  import Whiteboard from './lib/Whiteboard.svelte'

  import PricingsDemo from './lib/PricingsDemo.svelte'
  import VirtualDesktop from './lib/VirtualDesktop.svelte'
</script>

<!-- <iframe
  src="https://explain.mit.edu"
  target="_top"
  width="1000"
  height="500"
/> -->

<!-- iFrame can enable different technology stacks to be mixed and matched -->
<!-- <iframe src="https://calendar.google.com/calendar/embed?src=be0qdjkrvrtbjk5ln964p13l90%40group.calendar.google.com&ctz=America%2FNew_York" style="border: 0" width="800" height="600" frameborder="0" scrolling="no"></iframe> -->
<PricingsDemo/>

<a href="https://explain.mit.edu/class/mDbUrvjy4pe8Q5s5wyoD/section/mDbUrvjy4pe8Q5s5wyoD/room/hoAqWPNWAywd7MLgTfAh" target="_blank">
  <h2 class="text-center text-lg">
    Whiteboard
  </h2>
</a>

<VirtualDesktop/>

<!-- <Whiteboard/> -->

<!-- <StatisticsPage/> -->

<!-- 
  It should be like a map - only show details when the users zoom in, so DON'T show 
  account balance graph unless I click for more information. 
-->
<!-- <LineGraph/> -->
