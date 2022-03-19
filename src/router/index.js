import Vue from 'vue'
import VueRouter from 'vue-router'
import app from "./app";
import admin from "./admin";

import {Message} from "element-ui";

Vue.use(VueRouter)

const baseRoutes = [];
const routes = baseRoutes.concat(app, admin);


const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})


// 注册一个全局前置守卫
router.beforeEach((to, from, next) => {
    if (to.path === '/course/:course_id/chapter/:chapter_id') {    //判断当前路由是否需要进行权限控制
        if (sessionStorage.getItem('token')) {    //权限控制的具体规则
            next()
        } else {
            Message.error('请先登陆')
        }
    } else {
        next() // 放行
    }
})

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}


export default router
