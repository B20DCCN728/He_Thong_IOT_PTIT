<script setup>
import { ref, onMounted } from 'vue';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const serverData = ref('ok'); // Store the received data from server

const socketUrl = "http://localhost:8080/ws"; // Replace with your server URL

const socket = new SockJS(socketUrl);
const stompClient = Stomp.over(socket);

// Callback function to handle received data
const onDataReceived = (message) => {
  const data = JSON.parse(message.body);

  serverData.value = data;

  console.log('Received data:', data);
  // Do something with the received data
};



onMounted(() => {
  console.log('Connecting to WebSocket...');
  stompClient.connect({}, async (frame) => {
    console.log('Connected to WebSocket');
    // Subscribe to a specific STOMP destination to get real-time data
    const subscription = stompClient.subscribe('/sensor', onDataReceived);

    // Optionally, you can unsubscribe when you no longer need the data
    // subscription.unsubscribe();
  });
});

</script>


<template>  
    <div>
        <p>Data from server: {{ serverData }}</p>
        ok
    </div>    
</template>

<style scoped>

</style>