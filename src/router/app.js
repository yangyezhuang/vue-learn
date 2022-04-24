// 前台组件
import Index from '../views/Front/Index'
import Course from '../views/Front/courses/Course'
import Category from "../views/Front/courses/Category"
import Teacher from "../views/Front/Teacher/Teacher";
import TeacherDetail from "../views/Front/Teacher/TeacherDetail";

import Detail from '../views/Front/courses/Detail'
import Search from "../views/Front/courses/Search"
import Player from "../views/Front/courses/Player"
import Notice from "../views/Front/other/Notice"
import About from "../views/Front/other/About"
import Error from "../views/Front/other/404"

import User from '../views/Front/Users/User'
import UserInfo from "../views/Front/Users/UserInfo"
import UserCourse from "../views/Front/Users/UserCourse"
import UserData from "../views/Front/Users/UserData"
import Push from "../views/Front/Users/Push";
import UserNote from "../views/Front/Users/UserNote";


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
            {path: 'note', component: UserNote},
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
