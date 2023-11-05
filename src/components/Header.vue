<template>
    <div class="topbar">
        <div class="logo">
            <h2>Nguyễn Hoàng Việt</h2>
        </div>
        <div class="search">
            <input type="text" name="search" placeholder="Tìm kiếm ở đây">
            <label for="search"><i class="fas fa-search"></i></label>
        </div>
        <i class="fas fa-bell"></i>
        <div class="user">
            <img src="../assets/photo_2023-02-16_01-36-26.jpg" alt="Nguyễn Hoàng Việt">
        </div>
    </div>
</template>
<style scoped>
.topbar {
position: fixed;
background-color: #fff;
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.08);
width: 100%;
padding: 0 20px;
height: 60px;
display: grid;
grid-template-columns: 2fr 10fr 0.4fr 1fr;
align-items: center;
z-index: 1;
}

img {
position: absolute;
border-radius: 50px;
top: 0;
left: 0;
width: 100%;
height: 100%;
object-fit: cover;
}

.logo h2 {
margin-top: 10px;
color: #299B63;
font-weight: bold
}

.search {
position: relative;
width: 60%;
justify-self: center;
}

.search input {
width: 100%;
min-width: 128px;
height: 40px;
padding: 0 40px;
font-size: 16px;
outline: none;
border: none;
border-radius: 10px;
background: #f5f5f5;
}

.search i {
position: absolute;
right: 15px;
top: 15px;
cursor: pointer;
}

.fa-bell {
justify-self: right;
}

.user {
position: relative;
width: 50px;
height: 50px;
justify-self: right;
}
</style>