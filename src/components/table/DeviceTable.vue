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
              @change="onRangeChange"
            />
            <a-tooltip title="Search by Time">
              <a-button type="primary" :icon="h(SearchOutlined)" danger>Tìm kiếm</a-button>
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
  import { SearchOutlined } from '@ant-design/icons-vue';


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
        filters: [
          {
            text: 'Campus',
            value: '71',
          },
          {
            text: 'B20DCCN728',
            value: '72',
          },
        ],
        filteredValue: filtered.id || null,
        onFilter: (value, record) => record.id.includes(value),
        sorter: (a, b) => a.id - b.id,
        sortOrder: sorted.columnKey === 'id' && sorted.order,
        // ellipsis: true,
      },
      {
        title: 'Thời gian',
        dataIndex: 'timeStamp',
        key: 'timeStamp',
        sorter: (a, b) => a.timeStamp - b.timeStamp,
        sortOrder: sorted.columnKey === 'age' && sorted.order,
      },
      {
        title: 'Thiết bị',
        dataIndex: 'deviceName',
        key: 'deviceName',
        // filters: [
        //   {
        //     text: 'London',
        //     value: 'London',
        //   },
        //   {
        //     text: 'New York',
        //     value: 'New York',
        //   },
        // ],
        // filteredValue: filtered.address || null,
        // onFilter: (value, record) => record.address.includes(value),
        // sorter: (a, b) => a.address.length - b.address.length,
        // sortOrder: sorted.columnKey === 'address' && sorted.order,
        // ellipsis: true,
      },
      {
        title: 'Trạng thái',
        dataIndex: 'state',
        key: 'state',
        // sorter: (a, b) => a.age - b.age,
        // sortOrder: sorted.columnKey === 'age' && sorted.order,
      },
    ];
  });
  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    filteredInfo.value = filters;
    sortedInfo.value = sorter;
  };
  const clearFilters = () => {
    filteredInfo.value = null;  
  };
  const clearAll = () => {
    filteredInfo.value = null;
    sortedInfo.value = null;
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