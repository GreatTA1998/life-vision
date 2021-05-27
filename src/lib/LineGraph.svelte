<script>
  import { Chart, registerables } from "chart.js";
  import { onMount } from 'svelte';

  Chart.register(...registerables);

  onMount(async () => {
    const canvas = document.getElementById("myChart")
    const ctx = canvas.getContext("2d")
    const chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: ["January", "February", "March", "April", "May", "June", "July", "Aug", "Sep", "Nov", "Dec"],
            datasets: [
                {
                    label: "16 Mar 2018",
                    borderColor: "#4A5568",
                    data: [0, 10000, 10000, 10000, 5400],
                    fill: false,
                    pointBackgroundColor: "#4A5568",
                    borderWidth: "3",
                    pointBorderWidth: "4",
                    pointHoverRadius: "6",
                    pointHoverBorderWidth: "8",
                    pointHoverBorderColor: "rgb(74,85,104,0.2)",
                },
            ],
        },
        options: {
            legend: {
                position: false,
            },
            scales: {
                yAxes: [
                    {
                        gridLines: {
                            display: false,
                        },
                        display: false,
                    },
                ],
            },
        },
    });
});
</script>

<div class="flex items-center justify-center py-8 px-4">
  <div class="w-11/12 lg:w-2/3">
      <div class="flex flex-col justify-between h-full">
          <div>
              <div class="lg:flex w-full justify-between">
                  <h3 class="text-gray-600 dark:text-gray-400 leading-5 text-base md:text-xl font-bold">Account Balance</h3>
              </div>
              <div class="flex items-end mt-6">
                  <h3 class="text-indigo-500 leading-5 text-lg md:text-2xl">$5400</h3>
              </div>
          </div>
          <div>
              <canvas id="myChart" width="1025" height="400"></canvas>
          </div>
      </div>
  </div>
</div>

