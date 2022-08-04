import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        name: "home",
        component: () => import(/* webpackChunkName: "home" */ "../components/PasswordGenerator.vue")
    },
    {
        path: "/sha",
        name: "sha",
        component: () => import(/* webpackChunkName: "xy" */ "../components/SHA.vue")
    },
]


const router = new VueRouter({
    mode: "hash",
    routes
})

export default router;