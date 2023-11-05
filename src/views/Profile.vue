<script setup>
    import { StarOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons-vue';
    import { ref, onMounted } from 'vue';
    import { message } from 'ant-design-vue';
    import axios from 'axios';

    // Sekeleton
    const loading = ref(true);
    const skeleton_time = 4;

    const myProfile = ref(
        {
            "id": 1,
            "fullName": "",
            "studentId": "",
            "groupId": "",
            "phoneNumber": "",
            "address": "",
            "note": ""
        }
    );



    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/profile');
            // dataSource.value = response.data; // Replace dataSource with the fetched data
            loading.value = false;

            myProfile.value = response.data;

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

<template>
    <div class="grid">
        <!-- Info -->
        <div class="grid__row client-info" v-show="!loading">
            <!-- detail info -->
            <div class="grid__column-9 client-info__container-form">
                <div class="client-info__container">
                    <div class="client-info__title">
                        <h3 class="client-info__heading">Hồ sơ của tôi</h3>
                        <span class="client-info__remind">Quản lý thông tin hồ sơ để bảo mật tài khoản</span>
                    </div>
                    <div class="client-info__form">
                        <form action="profile" method="post">
                            <label for="fullname" class="client-info__label">Họ và tên:</label>
                            <input 
                                type="text" 
                                name="fullname" 
                                class="client-info__input" 
                                placeholder="Nhập họ và tên" 
                                v-bind:value="myProfile.fullName"
                                disabled
                            ><br>
                            <label for="dateofbirth" class="client-info__label">Mã sinh viên: </label>
                            <input 
                                type="text" 
                                name="dateofbirth" 
                                class="client-info__input" 
                                v-bind:value="myProfile.studentId"
                                disabled
                            ><br>
                            <label for="phone" class="client-info__label">Số điện thoại:</label>
                            <input 
                                type="text" 
                                name="phone" 
                                class="client-info__input" 
                                placeholder="Số điện thoại" 
                                v-bind:value="myProfile.phoneNumber"
                                disabled
                            ><br>
                            <label for="email" class="client-info__label">Nhóm:</label>
                            <input 
                                type="text" 
                                name="email" 
                                class="client-info__input" 
                                placeholder="Email" 
                                v-bind:value="myProfile.groupId"
                                disabled
                            ><br>
                            <label for="address" class="client-info__label">Địa chỉ:</label>
                            <input 
                                type="text" 
                                name="address" 
                                class="client-info__input" 
                                placeholder="Nhập địa chỉ" 
                                v-bind:value="myProfile.address"
                                disabled
                            ><br>
                            <label for="note" class="client-info__label">Mô tả:</label>
                            <input 
                                type="text" 
                                name="note" 
                                class="client-info__input" 
                                placeholder="Ghi chú của bạn ở đây" 
                                v-bind:value="myProfile.note"
                                disabled
                            ><br>
                        </form>
                    </div>
                </div>
            </div>
            <!-- info sidebar -->
            <div class="grid__column-3">
                <div class="client-info__sidebar">
                    <div class="client-info__cart">
                        <img src="../assets/photo_2023-02-16_01-36-26.jpg" alt="avatar" class="client-info__cart-img">
                        <span class="client-info__cart-name">{{ myProfile.fullName }}</span>
                    </div>
                    <div class="client-info__explore">
                        <img src="../assets/thomas_shelby.jpg" style="width: 90%;" alt="PMC WAGNER">
                    </div>
                </div>
            </div>
        </div>   
        <!-- Skeleton -->
        <div class="skeleton">
            <a-skeleton :loading="loading" active class="skeleton" v-for="index in skeleton_time" :key="index">  
            </a-skeleton>
        </div>
    </div>    
</template>

<style scoped>
/* Created by Campus */

.skeleton {
    width: 97%;
    margin: 1rem 0 0 0.75rem;
}

.client-info {
    padding: 36px 0;
}

/* side bar */
.client-info__sidebar {
    /* border-right: 1px solid var(--border-product-color); */
    padding: 12px 0;
}

.client-info__cart {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.client-info__cart-img {
    width: 30%;
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.1);
}

.client-info__cart-name {
    padding-top: 12px;
    font-size: 1.8rem;
    font-weight: 500;
    color: var(--text-color);
}

.client-info__explore {
    margin: 30px 0 30px 34px;
}

.client-info__explore-component:last-child:hover {
    cursor: pointer;
    background-color: #f4e8e8;
}

.client-info__explore-component > div {
    padding: 4px;
    display: flex;
    align-items: center;
}

.client-info__explore-icon {
    font-size: 1.8rem;
    font-weight: 500;
    color: #e53e3e;
}

.client-info__explore-header {
    padding-left: 10px;
    font-size: 1.7rem;
    font-weight: 600;
    color: var(--text-color);
}

.client-info__explore-list {
    margin: 0 50px 0 36px;
    padding: 0;
    list-style: none;
}

.client-info__explore-item {
    margin-top: 18px;
    font-size: 1.6rem;
    font-weight: 400;
    color: var(--text-color);
}

.client-info__explore-item--active {
    color: var(--primary-color);
}

.client-info__explore-item:last-child {
    margin-bottom: 18px;
}

.client-info__explore-item:hover {
    border-radius: 2px;
    color: var(--primary-color);
    cursor: pointer;
}

/* detail info */
.client-info__container {
    padding-left: 50px;
    border-right: 1px solid var(--border-product-color);
}

.client-info__heading {
    padding-top: 12px;
    font-size: 2.2rem;
    font-weight: 600;
    color: var(--text-color);
}

.client-info__remind {
    font-size: 1.5rem;
    font-weight: 400;
    color: var(--text-color);
}

.client-info__form {
    margin: 12px 0 0 12px;
}

.client-info__label {
    white-space: nowrap;
    margin: 12px 0 6px 0;
    font-size: 1.4rem;
    font-weight: 500;
    display: block;
    color: var(--text-color);
    width: 20%;
}

.client-info__input {
    /* margin-bottom: 12px; */
    display: inline-block;
    font-size: 1.2rem;
    height: 38px;
    line-height: 1.4rem;
    border-radius: 2px;
    width: 80%;
    background-color: var(--white-color);
    /* font-size: 1.4rem; */
    padding: 0 8px;
    border: 1px solid var(--border-product-color);
    outline: none;
}

.client-info__btn {
    background-color: var(--primary-color);
    color: var(--white-color);
    margin: 24px 0 0 20%;
}

.client-info__btn:hover {
    background-color: var(--primary-color-hover);
}

.client-info__container-form:last-child{
    display: none;
}
</style>