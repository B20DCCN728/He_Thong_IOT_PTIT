<template>
  <Line :data="data" :options="options" />
</template>

<script setup>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { ref } from 'vue';
import { Line } from 'vue-chartjs';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const xValues = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 120, 140, 160, 180, 200];
const numDataPoints = xValues.length;
const dataWindowSize = 15; // Number of data points to show in the window

// Initialize the initial data values
const initialData = {
  temperature: [30, 35, 25, 11, 45, 17, 28, 40, 17, 2, 14, 12, 50, 34, 25],
  humidity: [50, 30, 17, 85, 70, 75, 81, 94, 60, 70, 92, 73, 100, 73, 56, 97],
  light: [300, 700, 2000, 1050, 100, 500, 120, 100, 300, 100, 1000, 2000, 56, 72, 456, 230]
};


const data = ref({
  labels: xValues.slice(-dataWindowSize), // Show only a window of data points
  datasets: [
    {
      data: initialData.temperature.slice(-dataWindowSize),
      label: 'Nhiệt độ',
      yAxisID: 'A',
      borderColor: "red",
      backgroundColor: 'transparent',
      fill: false
    },
    {
      data: initialData.humidity.slice(-dataWindowSize),
      label: 'Độ ẩm',
      yAxisID: 'A',
      borderColor: "green",
      backgroundColor: 'transparent',
      fill: false
    },
    {
      data: initialData.light.slice(-dataWindowSize),
      label: 'Ánh sáng',
      yAxisID: 'B',
      borderColor: "blue",
      backgroundColor: 'transparent',
      fill: false
    }
  ],
  });
  
  const options = ref({
    scales: {
      A: {
            position: 'left',
            type: 'linear',
            ticks: {
                min: 0,
                max: 100,
                stepSize: 5,
                reverse: true
            },
        },
      B:  {
            position: 'right',
            ticks: {
                min: 0,
                max: 2000,
                stepSize: 100,             
            },
        },
      x: [
        {
            type: 'category',
        },
    ],
  },
  legend: { 
    display: false 
  },
  elements: {
    line: {
      cubicInterpolationMode: 'monotone' // Set this to 'monotone' for a smooth curve
    }
  },
});

// // Create a function to shift data points to the left
// function shiftDataLeft(data) {
//   return data.slice(1).concat(data[0]);
// }

// const chart = new Chart(ctx, {
//   type: "line",
//   data: datasets,
//   options: options,
// });


// // Function to update chart data by shifting it to the left
// function updateChartData() {
//   // Shift data to the left for each category
//   chart.data.datasets[0].data = shiftDataLeft(chart.data.datasets[0].data);
//   chart.data.datasets[1].data = shiftDataLeft(chart.data.datasets[1].data);
//   chart.data.datasets[2].data = shiftDataLeft(chart.data.datasets[2].data);

//   // Redraw the chart
//   chart.update();
// }

// // Update chart data every 3 seconds (adjust the interval as needed)
// setInterval(updateChartData, 1000);

</script> 


