// 前台组件
import Index from '../views/Front/Main/Index'
import Course from '../views/Front/Main/Course'
import Category from "../views/Front/Main/Category"
import Teacher from "../views/Front/Main/Teacher";
import TeacherDetail from "../views/Front/Teacher/TeacherDetail";

import Detail from '../views/Front/Main/Detail'
import Search from "../views/Front/Main/Search"
import Player from "../views/Front/Main/Player"
import Notice from "../views/Front/Main/Notice"
import About from "../views/Front/Layout/About"
import Error from "../views/Front/Layout/404"

import User from '../views/Front/Users/User'
import UserInfo from "../views/Front/Users/UserInfo"
import UserCourse from "../views/Front/Users/UserCourse"
import UserData from "../views/Front/Users/UserData"
import Push from "../views/Front/Users/Push";


export default [
    {
        path: '/',
        component: Index,
        meta: {
            requireAuth: true
        },
    },
    {
        path: '/courses',
        component: Course
    },
    {
        path: '/courses/detail/:id',
        component: Detail
    },
    {
        path: '/courses/search/:keyword',
        component: Search
    },
    {
        path: '/teacher',
        component: Teacher
    },
    {
        path: '/teacher/:id',
        component: TeacherDetail
    },
    {
        path: "/category",
        component: Category
    },
    {
        path: '/courses/:course_id/chapter/:chapter_id',
        component: Player
    },
    {
        path: '/user',
        component: User,
        children: [
            {path: 'info', component: UserInfo},
            {path: 'courses', component: UserCourse},
            {path: 'data', component: UserData},
            {path: 'push', component: Push}
        ]
    },
    {
        path: '/notice',
        component: Notice
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/404',
        component: Error
    },
    {
        path: '*',
        redirect: "/404"
    }
]
