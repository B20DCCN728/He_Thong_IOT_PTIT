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
                component: () => import("../views/SensorData.vue"),
            },
            {
                path: "profile",
                name: "profile",
                component: () => import("../views/Profile.vue"),
            },  
            {
                path: "device-status",
                name: "device-status",
                component: () => import("../views/DeviceStatus.vue"),
            },
            {
                path: "about",
                name: "about",
                component: () => import("../views/About.vue"),
            }
        ],
    },
];


const router = createRouter({   
    history: createWebHistory(),
    routes,
});


export default router;