import Vue from 'vue'
import VueRouter from 'vue-router'
import app from "./app";
import admin from "./admin";

Vue.use(VueRouter)

const baseRoutes = [];
const routes = baseRoutes.concat(app, admin);

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})


// 注册一个全局前置守卫
// router.beforeEach((to, from, next) => {
//     if (to.path.startsWith("/")) {
//         next()
//     } else {
//         let token = sessionStorage.getItem("token")
//         if (!token) {
//             next({path: "/"})
//         } else {
//             this.$http.get("/checkToken", {header: {token: token}}).then((res) => {
//                 if(!res.data){
//                     next({path:"/"})
//                 }
//                 next()
//             })
//         }
//     }
// })


const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}


export default router
