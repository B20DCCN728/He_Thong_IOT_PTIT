<script setup>
import { ref, watch } from 'vue';

</script>

<template>
    <div class="sidebar">
        <ul>
            <li v-bind:class="{ 'active' : $route.path === '/dashboard' }">
                <router-link class="sidebar-link" to="dashboard">
                    <i class="fas fa-th-large"></i>
                    <div id="dashboard">Dashboard</div>s
                </router-link>
            </li>
            <li v-bind:class="{ 'active' : $route.path === '/profile' }">
                <router-link class="sidebar-link" to="profile" exact>
                    <i class="fa-regular fa-user"></i>                        
                    <div>Thông tin cá nhân</div>
                </router-link>
            </li>
            <li v-bind:class="{ 'active' : $route.path === '/sensor-data' }">
                <router-link class="sidebar-link" to="sensor-data">
                    <i class="fas fa-chalkboard-teacher"></i>
                    <div id="sensorInfo"> Thông tin cảm biến </div> 
                </router-link>
            </li>
            <li v-bind:class="{ 'active' : $route.path === '/device-status' }">
                <router-link class="sidebar-link" to="device-status">
                    <i class="fa-solid fa-cloud"></i>
                    <div> Trạng thái thiết bị </div>
                </router-link>
            </li>
            <li v-bind:class="{ 'active' : $route.path === '/about' }">
                <router-link class="sidebar-link" to="about ">
                    <i class="fas fa-chart-bar"></i>
                    <div>Chi tiết dự án</div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<style scoped>
/* sidebar */
.sidebar {
    position: fixed;
    top: 60px;
    width: 260px;
    height: calc(100% - 60px);
    background: #299B63;
    overflow-x: hidden;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    z-index: 2;
}

.sidebar ul {
    margin-top: 20px;
}

.sidebar ul li {
    width: 100%;
    list-style: none;
}

.sidebar ul li:hover {
    background: #fff;
}

.sidebar ul li:hover a {
    color: #299B63;
}

.sidebar ul li a {
    width: 100%;
    text-decoration: none;
    color: #fff;
    height: 60px;
    display: flex;
    align-items: center;
}

.sidebar ul li.active {
    background: #fff;
}

.sidebar ul li.active a {
    color: #299B63;
}


.sidebar ul li a i {
    min-width: 60px;
    font-size: 24px;
    text-align: center;
}
</style>