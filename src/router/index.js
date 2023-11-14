// Created by B20DCCN728

import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        children: [
            {
                path: "dashboard",
                name: "dashboard",
                component: () => import("../components/Menu.vue"),
            },
            {
                path: "sensor-data",
                name: "sensor-data",
                component: () => import("../components/SensorDataCom.vue"),
            },
            {
                path: "profile",
                name: "profile",
                component: () => import("../views/Profile.vue"),
            },  
            {
                path: "device-status",
                name: "device-status",
                components: () => import("../components/DeviceStatus.vue"),
            }
        ],
    },
];


const router = createRouter({   
    history: createWebHistory(),
    routes,
});


export default router;