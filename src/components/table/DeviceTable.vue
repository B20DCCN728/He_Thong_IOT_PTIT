<template>
    <div class="main">
      <div class="table-operations">
        <a-space direction="vertical">
          <a-space warp>
            <a-tooltip title="Clear Filters">
              <a-button @click="clearFilters">Dọn bộ lọc</a-button>
            </a-tooltip>

            <a-select show-search style="width: 150px" placeholder="Thông số">
              <a-select-option value="device">Thiết bị</a-select-option>
              <a-select-option value="status">Trạng thái</a-select-option>
            </a-select>

            <a-range-picker
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
      <a-table :columns="columns" :data-source="dataSource" @change="handleChange" size="middle"/>
    </div>
  </template>
  <script setup>
  import { computed, ref, onMounted } from 'vue';
  import axios from 'axios';
  import { h } from 'vue';
  import dayjs from 'dayjs';
  import { SearchOutlined } from '@ant-design/icons-vue';

  // Define format
  const format = "YYYY-MM-DDTHH:mm:ss";

  // Handle time filter
  const selectedTime = ref();
  const filteredInfo = ref();
  const sortedInfo = ref();

  const columns = computed(() => {
    const filtered = filteredInfo.value || {};
    const sorted = sortedInfo.value || {};
    return [
      {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
        filteredValue: filtered.id || null,
        sorter: (a, b) => a.id - b.id,
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
        title: 'Thiết bị',
        dataIndex: 'deviceName',
        key: 'deviceName',
      },
      {
        title: 'Trạng thái',
        dataIndex: 'state',
        key: 'state',
      },
    ];
  });

  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    // filteredInfo.value = filters;
    // sortedInfo.value = sorter;
  };

  const clearFilters = () => {
    filteredInfo.value = null;  
  };

  const clearAll = () => {
    filteredInfo.value = null;
    selectedTime.value = [];
  };

  const setAgeSort = () => {
    sortedInfo.value = {
      order: 'descend',
      columnKey: 'age',
    };
  };

  const dataSource = ref();

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/getAllDeviceData');

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

  
  onMounted(() => {
      fetchData();
  })

  </script>
  <style scoped>
    /* main */

    .main {
        /* position: absolute;
        top: 40px;
        width: calc(100% - 260px);
        min-height: calc(100vh - 60px);
        left: 260px;
        background: #f5f5f5; */
        margin: 1.6rem;
    }
    
    .table-operations {
        margin-bottom: 16px;
    }
    
    .table-operations > button {
        margin-right: 8px;
    }
  </style>