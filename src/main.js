import { createApp } from 'vue'
import { createWebHashHistory, createRouter } from 'vue-router'
import App from "./app"
import Challenge from "./components/Challenge";
import BeginScherm from "./components/BeginScherm";
import Configure from "./components/Configure";

const routes = [
    { path: '/', component: BeginScherm },
    { path: '/challenge/:challengeId', component: Challenge },
    { path: '/conf', component: Configure },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})


createApp(App).use(router).mount('#app')
