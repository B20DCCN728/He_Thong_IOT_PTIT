<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import axios from 'axios';
import { message } from 'ant-design-vue';
import Line from './chart/LineChart.vue';

const temperature = ref({
    color: '#299B63',
});

const humidity = ref({
    color: '#299B63',
});

const lightValue = ref({
    color: '#299B63',
});

const voltage = ref({
    color: '#299B63',
}); 

// led
const led = ref(false);

// fan
const fan = ref(false);

const request = {
    "message": "ON"
}

// watch led
watch(led, async (newLed) => {
    if(newLed === true) {
        request.message = "ON";
    } else {
        request.message = "OFF";
    }

    try {
        const response = await axios.post('http://localhost:8080/led-device', request);
        console.log('Data fetched:', response.data); // Add this line
        message.success(`Đã gửi yêu cầu điều khiển đèn: ${request.message}`);
    } catch (error) {
        console.log("Lỗi rồi!! ", error);
        message.error('Gửi yêu cầu điều khiển đèn thất bại');
    } 
});

// watch fan 
watch(fan, async (newFan) => {
    if(newFan === true) {
        request.message = "ON";
    } else {
        request.message = "OFF";
    }

    try {
        const response = await axios.post('http://localhost:8080/fan-device', request);
        console.log('Data fetched:', response.data); // Add this line
        message.success(`Đã gửi yêu cầu điều khiển quạt: ${request.message}`);
    } catch (error) {
        console.log("Lỗi rồi!! ", error);
        message.error('Gửi yêu cầu điều khiển quạt thất bại');
    } 
});

// Server data
const serverData = ref(
    {
        "id": 251,
        "timeStamp": "2023-11-08T22:59:41.2964305",
        "temperature": 28.5,
        "humidity": 85.0,
        "lightValue": 1024.0,
        "voltage": 3.3
    }
); 

// Set up the WebSocket connection
const socketUrl = "http://localhost:8080/ws"; 
const socket = new SockJS(socketUrl);
const stompClient = Stomp.over(socket);

// Callback function to handle received data
const onDataReceived = (message) => {
  const data = JSON.parse(message.body);
  serverData.value = data;
  console.log('Received data:', data);
};

// Watch server data to change color of value
watch(serverData, (newServerData) => {
    if(newServerData.temperature >= 30) {
        temperature.value.color = 'rgb(255,205,116)';
        console.log("Temperature is high!!!");
    } else if(newServerData.temperature <= 24) {
        temperature.value.color = '#B8E1FF';
        console.log("Temperature is cold!!!");
    } else {
        lightValue.value.color = '#299B63';
        console.log("Temperature is normal!!!");
    }

    if(newServerData.humidity >= 80) {
        humidity.value.color = '#FF0000';
        console.log("Humidity is high!!!");
    } else if(newServerData.humidity <= 50) {
        humidity.value.color = '#299B63';
        console.log("Humidity is low!!!");
    } else {
        lightValue.value.color = '#299B63';
        console.log("Humidity is normal!!!");
    }

    if(newServerData.lightValue >= 800) {
        lightValue.value.color = '#FF0000';
        console.log("Light value is low!!!");
    } else if(newServerData.lightValue <= 400) {
        lightValue.value.color = 'rgb(255,205,116)';
        console.log("Light value is high!!!");
    } else {
        lightValue.value.color = '#299B63';
        console.log("Light value is normal!!!");
    }

    // if(newServerData.voltage <= 2.0) {
    //     voltage.value.color = '#FF0000';
    // } else if(newServerData.voltage > 3.3) {
    //     voltage.value.color = '#299B63';
    // }
});

// Subscribe to a specific STOMP destination to get real-time data
onMounted(() => {
    console.log('Connecting to WebSocket...');
    stompClient.connect({}, (frame) => {
    console.log('Connected to WebSocket');
        // Subscribe to a specific STOMP destination to get real-time data
    const subscription = stompClient.subscribe('/sensor', onDataReceived);
        // subscription.unsubscribe();
  });
});
</script>

<template>
  <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@3.5.1/dist/chart.min.js"></script> -->
  <div class="main">
      <div class="cards">
          <div class="card">
              <div class="card-content">
                  <div id="temperature" :style="temperature" class="number cold"> {{ serverData.temperature }}°C</div>
                  <div class="card-name">Nhiệt độ</div>
              </div>
              <div class="icon-box">
                  <i :style="temperature" class="fa-solid fa-temperature-high"></i>
              </div>
          </div>
          <div class="card">
              <div class="card-content">
                  <div id="humidity" :style="humidity" class="number">{{ serverData.humidity }}%</div>
                  <div class="card-name">Độ ẩm</div>
              </div>
              <div class="icon-box">
                  <i :style="humidity" class="fa-solid fa-umbrella"></i>
              </div>
          </div>
          <div class="card">
              <div class="card-content">
                  <div id="lightvalue" :style="lightValue" class="number">{{ serverData.lightValue }} lux</div>
                  <div class="card-name">Độ sáng</div>
              </div>
              <div class="icon-box">
                  <i :style="lightValue" class="fa-solid fa-lightbulb"></i>
              </div>
          </div>
          <div class="card">
              <div class="card-content">
                  <div id="voltage" :style="voltage" class="number">{{ serverData.voltage }} Vol</div>
                  <div class="card-name">Điện áp</div>
              </div>
              <div class="icon-box">
                  <i :style="voltage" class="fa-solid fa-bolt">{{ x }}</i>
              </div>
          </div>
      </div>
      <div class="charts">
          <div class="chart">
              <h2>Đồ thị biểu diễn trạng thái cảm biến</h2>
              <Line />
              <div>
                  <!-- <canvas id="lineChart"></canvas> -->
                  <canvas id="lineChart" style="width:100%;max-width:800px"></canvas>
              </div>
          </div>
          <div class="chart">
              <h2>Điều khiển thiết bị</h2>
              <div class="equipment-home">
                  <div class="equipment my-fan">
                      <h3 class="equipment__header">Quạt thông minh</h3>
                      <div class="equipment_body">
                          <div class="switch-container" id="fan">
                              <label class="switch">
                                  <input type="checkbox" id="toggle-switch" v-model="fan">
                                  <span class="slider"></span>
                              </label>
                          </div>
                          <i :class="{ 'rotate': fan }" class="equipment_body-sticker fa-solid fa-fan"></i>
                      </div>
                  </div>
                  <div class="equipment my-led">
                      <h3 class="equipment__header">Đèn học</h3>
                      <div  class="equipment_body">
                          <div class="switch-container" id="led">
                              <label class="switch">
                                  <input type="checkbox" id="toggle-switch" v-model="led">
                                  <span class="slider"></span>
                              </label>
                          </div>
                          
                          <i v-show="!led" class="equipment_body-sticker fa-solid fa-lightbulb"></i>
                          <i v-show="led" 
                          style="color: rgb(224, 224, 82);" 
                          class="equipment_body-sticker fa-regular fa-lightbulb"></i>
                      </div>
                  </div>
              </div> 
          </div>
      </div>
  </div>
</template>

<style scoped>
/* main */

.main {
    position: absolute;
    top: 40px;
    width: calc(100% - 260px);
    min-height: calc(100vh - 60px);
    left: 260px;
    background: #f5f5f5;
}

.cards {
    width: 100%;
    padding: 35px 20px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 20px;
}

.cards .card {
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 7px 25px rgba(0, 0, 0, 0.08);
}

.number {
    font-size: 35px;
    font-weight: 500;
}

.card-name {
    color: #888;
    font-weight: 600;
}

.icon-box i {
    font-size: 45px;
}

/* charts */

.charts {
    display: grid;
    grid-template-columns: 5fr 2fr;
    grid-gap: 20px;
    width: 100%;
    padding: 20px;
    padding-top: 0;
}

.chart {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 7px 25px rgba(0, 0, 0, 0.08);
    width: 100%;
}


.chart:last-child {
    padding:  20px 20px 0;
}

.chart h2 {
    margin-bottom: 5px;
    font-size: 20px;
    color: #666;
    text-align: center
}

@media (max-width:1115px) {
    .sidebar {
        width: 60px;
    }
    .main {
        width: calc(100% - 60px);
        left: 60px;
    }
}

@media (max-width:880px) {
    /* .topbar {
        grid-template-columns: 1.6fr 6fr 0.4fr 1fr;
    } */
    .fa-bell {
        justify-self: left;
    }
    .cards {
        width: 100%;
        padding: 35px 20px;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 20px;
    }
    .charts {
        grid-template-columns: 1fr;
    }
    /* .doughnut-chart {
        padding: 50px;
    } */
    #doughnut {
        padding: 50px;
    }
}

@media (max-width:500px) {
    .topbar {
        grid-template-columns: 1fr 5fr 0.4fr 1fr;
    }
    .logo h2 {
        font-size: 20px;
    }
    .search {
        width: 80%;
    }
    .search input {
        padding: 0 20px;
    }
    .fa-bell {
        margin-right: 5px;
    }
    .cards {
        grid-template-columns: 1fr;
    }
    .doughnut-chart {
        padding: 10px;
    }
    #doughnut {
        padding: 0px;
    }
    .user {
        width: 40px;
        height: 40px;
    }
}

.equipment {
    padding: 0 40px 20px;
    height: 40%;
    width: 100%;
    margin: 10px 20px 0;
    background-color: rgb(221, 246, 243);
    border-radius: 20px;
    box-shadow: 0 7px 25px rgba(0, 0, 0, 0.08);
    border: 2px solid rgb(109, 245, 177);
}

.chart .equipment-home {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
}

.equipment-home .equipment__header {
    text-align: center;
    font-size: 100;
    font-weight: 700;
    margin-top: 0;
    padding: 10px 0;
}

.equipment:last-child {
    margin-top: 40px;
}

.equipment .equipment_body {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.equipment_body-sticker {
    font-size: 60px;
}


/* Bonus */
.switch-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: rgb(105, 220, 168);
    border-radius: 12px;
    border: 1px solid rgb(236, 140, 140);
    padding: 30px;
}

.switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 34px;
}

.slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 50%;
}

input:checked + .slider {
    background-color: #2196F3;
}

input:focus + .slider {
    box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
}

.rotate {
  animation: rotate 0.5s infinite linear;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>