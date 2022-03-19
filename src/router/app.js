// 前台组件
import Index from '../views/Users/Index'
import Course from '../views/Users/Course'
import Category from "../views/Users/Category"
import Notice from "../views/Users/Notice"
import About from "../views/Users/About"
import Error from "../views/Users/404"
import Detail from '../views/Users/Detail'
import Search from "../views/Users/Search"
import Player from "../views/Users/Player"
import User from '../views/Users/Users/User'

import UserInfo from "../views/Users/Users/UserInfo"
import UserCourse from "../views/Users/Users/UserCourse"
import UserData from "../views/Users/Users/UserData"
import Push from "../views/Users/Users/Push";


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
