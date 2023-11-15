<!-- Created by B20DCCN728 - Nguyen Hoang Viet -->

<template>
  <Line :data="data" :options="option" :key="renderKey"/>
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

import { ref, onMounted, defineProps, watch, reactive, toRef } from 'vue';
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

// Define the chart data values by Props 
const props = defineProps({
  serverData: {
    type: Object,
    required: true,
  },
});

const xValues = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 120, 140, 160, 180, 200];
const numDataPoints = xValues.length;
const dataWindowSize = 15; // Number of data points to show in the window

// Initialize the initial data values
const initialData = {
  temperature: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  humidity: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  lightValue: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
};

// Define the chart data
const data = ref({
  labels: xValues.slice(-dataWindowSize), // Show only a window of data points
  datasets: [
    {
      data: initialData.temperature.slice(-dataWindowSize),
      label: 'Nhiệt độ',
      yAxisID: 'left',
      borderColor: "red",
      backgroundColor: 'transparent',
      fill: false,
    },  
    {
      data: initialData.humidity.slice(-dataWindowSize),
      label: 'Độ ẩm',
      yAxisID: 'left',
      borderColor: "green",
      backgroundColor: 'transparent',
      fill: false,
    },
    {
      data: initialData.lightValue.slice(-dataWindowSize),
      label: 'Ánh sáng',
      yAxisID: 'right',
      borderColor: "blue",
      backgroundColor: 'transparent',
      fill: false,
    }
  ],
  });
  
  // Define the chart options 
  const option = ref({
    responsive: true,
    animation: {
      duration: 0, // Disable default animation
    },
    scales: {
      left: {
            position: 'left',
            // type: 'linear',
            ticks: {
                beginAtZero: true,
                stepSize: 10,
                // reverse: true
            },
            min: 0,
            max: 100,
        },
      right:  {
            position: 'right',
            ticks: {
                // beginAtZero: true,
                stepSize: 100,             
            },
            min: 0,
            max: 1050,
        },
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

const renderKey = ref(0);

const updateChart = (newServerData) => {
  console.log("newServerData", newServerData.lightValue);
    try {
      data.value.datasets[0].data = data.value.datasets[0].data.slice(1).concat(newServerData.temperature);
      data.value.datasets[1].data = data.value.datasets[1].data.slice(1).concat(newServerData.humidity);
      data.value.datasets[2].data = data.value.datasets[2].data.slice(1).concat(newServerData.lightValue);
    } catch (error) {
      console.log(error);
    }
};

// Watch serverData change for update the chart data
watch(() => props.serverData, (newServerData) => {
    updateChart(newServerData);
    renderKey.value += 1;
  },
  { deep: true },
);
</script> 


