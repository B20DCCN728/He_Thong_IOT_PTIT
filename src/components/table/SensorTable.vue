<!-- Created by Campus -->
<template>
    <div class="main">
      <div v-show="!loading" class="table-operations">
        <a-space direction="vertical">
          <a-space warp>
            <a-tooltip title="Clear Filters">
              <a-button @click="clearFilters">Dọn bộ lọc</a-button>
            </a-tooltip>
          <!-- 
            <a-select show-search style="width: 150px" placeholder="Thông số">
              <a-select-option value="temperature">Nhiệt độ</a-select-option>
              <a-select-option value="humidity">Độ ẩm</a-select-option>
              <a-select-option value="lightValue">Ánh sáng</a-select-option>
              <a-select-option value="voltage">Điện áp</a-select-option>
            </a-select> -->
            <a-range-picker
              allowClear
              :value="selectedTime"
              bordered
              style="width: 400px"
              show-time
              format="YYYY/MM/DD HH:mm:ss"
              :presets="rangePresets"
              @ok="saveTimeFilter"
              @change="onRangeChange"
            />
            <a-tooltip title="Search by Time">
              <a-button type="primary" :icon="h(SearchOutlined)" @click="searchTime" danger>Tìm kiếm</a-button>
            </a-tooltip>
          </a-space>
        </a-space>
      </div>
      <a-table 
        v-show="!loading" 
        :columns="columns" 
        :data-source="dataSource" 
        @change="handleChange" 
        size="middle"
      />
      <Skeleton 
        :loading="loading" 
      />
    </div>
  </template>
  <script setup>
  import { computed, ref, onMounted } from 'vue';
  import axios from 'axios';
  import { h } from 'vue';
  import dayjs from 'dayjs';
  import { SearchOutlined } from '@ant-design/icons-vue';
  import Skeleton from '../skeleton/Loading.vue'

  // Define variables
  const format = "YYYY-MM-DDTHH:mm:ss";
  const loading = ref(true);

  // Handle time filter
  const selectedTime = ref();
  const filteredInfo = ref();
  // const sortedInfo = ref({
  //   columnKey: 'id',
  //   order: 'descend',
  // });

  const columns = computed(() => {
    const filtered = filteredInfo.value || {};
    // const sorted = sortedInfo.value || {};
    return [
      {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
        sorter: (a, b) => a.id - b.id,
        // sortOrder: sorted.columnKey === 'id' && sorted.order
      },
      {
        title: 'Thời gian',
        dataIndex: 'timeStamp',
        key: 'timeStamp',
        filteredValue: filtered.timeRange || null,
        onFilter: (value, record) => {
          let arr = value.split(" ");
          let current = dayjs(record.timeStamp, { format });
          return  current.isAfter(dayjs(arr[0], { format })) 
                  && 
                  current.isBefore(dayjs(arr[1], { format }));
        },
        customRender: (timeStamp) => {
            return dayjs(timeStamp.value, { format }).format("HH:mm:ss ⏱️ DD/MM/YYYY"); 
        },
      },
      {
        title: 'Nhiệt độ',
        dataIndex: 'temperature',
        key: 'temperature',
        sorter: (a, b) => a.temperature - b.temperature,
        customRender: (temperature) => {
            return `${ temperature.value }°C`; 
        },
      },
      {
        title: 'Độ ẩm',
        dataIndex: 'humidity',
        key: 'humidity',
        sorter: (a, b) => a.humidity - b.humidity,
        customRender: (humidity) => {
            return `${ humidity.value }%`; 
        },
      },
      {
        title: 'Ánh sáng',
        dataIndex: 'lightValue',
        key: 'lightValue',
        sorter: (a, b) => a.lightValue - b.lightValue,
        customRender: (lightValue) => {
            return `${ lightValue.value } Lux`;
        },
      },
      {
        title: 'Điện áp',
        dataIndex: 'voltage',
        key: 'voltage',
        sorter: (a, b) => a.voltage - b.voltage,
        customRender: (voltage) => {
            return `${ voltage.value } Vol`;
        },
      },
    ];
  });

  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    console.log(filters);
    // filteredInfo.value = filters;
      // sortedInfo.value = sorter;
  };

  const clearFilters = () => {
    filteredInfo.value = null;  
    selectedTime.value = [];
    // sortedInfo.value = null;
  };

  // Fetch data from server
  const dataSource = ref();

  const fetchData = async () => {
      try {
          await new Promise(
            resolve => setTimeout(resolve, 500)
          );
          const response = await axios.get('http://localhost:8080/getAllSensorData');
          loading.value = false;
          dataSource.value = response.data; 
          console.log('Data fetched:', response.data); // Add this line
      } catch (error) {
          console.error('Error fetching data:', error);
          message.error('Error fetching data');
      }
  };
  
  // Handle time filter
  const onRangeChange = (dates, dateStrings) => {
    selectedTime.value = dates;
    console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
  };

  // Ok button
  const saveTimeFilter = (dates) => {
    selectedTime.value = dates;
  };
  
  // Handle search time
  const searchTime = () => {
    console.log('Search time: ', dayjs(selectedTime.value[0]).format(format));
    filteredInfo.value = {  
      timeRange: 
        [dayjs(selectedTime.value[0]).format(format) 
        + " " +
        dayjs(selectedTime.value[1]).format(format)]
      ,
    };
  };

  // Fetch data
  onMounted(() => {
      fetchData();
  })

  </script>
  <style scoped>
    /* main */

    .main {
        margin: 1.6rem;
    }
    
    .table-operations {
        margin-bottom: 16px;
    }
    
    .table-operations > button {
        margin-right: 8px;
    }
  </style>