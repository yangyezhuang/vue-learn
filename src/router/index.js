import Vue from 'vue'
import VueRouter from 'vue-router'

// 前台组件
import Index from '../views/Users/Index'
import Course from '../views/Users/Course'
import CourseDetail from '../views/Users/CourseDetail'
import Player from "../views/Users/Player"
import Register from "../views/Users/Login/Register"
import User from '../views/Users/Users/User'

import Test1 from "../views/Users/Users/List1"
import Test2 from "../views/Users/Users/List2"

// admin后台组件
import Admin from '../views/Admin/Home'
import AdminLogin from '../views/Admin/Login'
import Users from "../views/Admin/Users/Users"
import AddUser from "../views/Admin/Users/AddUser"
import EditUser from "../views/Admin/Users/EditUser"
import Courses from "../views/Admin/Course/Courses"
import AddCourse from "../views/Admin/Course/AddCourse"
import EditCourse from "../views/Admin/Course/EditCourse"
import DataAnalyse from "../views/Admin/DataAnalyse"
import Home2 from "../views/Admin/Home2";


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: Index
    },
    {
        path: '/register',
        component: Register
    },
    {
        path: '/course',
        component: Course
    },
    {
        path: '/coursedetail',
        component: CourseDetail
    },
    {
        path: '/player',
        component: Player
    },
    {
        path: '/user',
        component: User,
        children: [
            {path: 'test1', component: Test1},
            {path: 'test2', component: Test2}
        ]
    },

    //  admin后台路由
    {
        path: '/admin',
        component: Admin,
        children: [
            {path: 'users', component: Users},
            {path: 'home', component: Home2},
            {path: 'adduser', component: AddUser},
            {path: 'edituser', component: EditUser},
            {path: 'courses', component: Courses},
            {path: 'addCourse', component: AddCourse},
            {path: 'editCourse', component: EditCourse},
            {path: 'dataAnalyse', component: DataAnalyse}
        ]
    },
    {
        path: '/adminLogin',
        component: AdminLogin
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})


export default router
