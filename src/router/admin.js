// admin后台组件
import Index from '../views/Admin/Index'
import Home from "../views/Admin/Other/Home"
import Login from '../views/Admin/Other/Login'
import AdminInfo from "../views/Admin/Other/AdminInfo";

import Users from "../views/Admin/User/Student"
import AddUser from "../views/Admin/User/AddUser"
import UserDraw from "../views/Admin/User/UserDraw";
import Teacher from "../views/Admin/User/Teacher";

import Courses from "../views/Admin/Course/Courses"
import AddCourse from "../views/Admin/Course/AddCourse"

import Breadcrumb from '../views/Admin/Other/Breadcrumb'
import Proportion from "../views/Admin/Statistical/Sex";
import ClassType from "../views/Admin/Statistical/ClassType";
import UV from "../views/Admin/Statistical/UV";

import Comments from "../views/Admin/Comment/Comment"
import Board from "../views/Admin/Advice/Board"
import Advice from "../views/Admin/Advice/Advice";
import Shuffle from "../views/Admin/Setting/Shuffle";
import CourseHot from "../views/Admin/Statistical/CourseHot";
import ChapterList from "../views/Admin/Course/ChapterList";


export default [
    {
        path: '/admin',
        component: Login
    },
    {
        path: '/mg',
        component: Index,
        redirect: '/mg/home',
        meta: {title: '首页'},
        children: [
            {path: 'home', component: Home},
            {path: 'adminInfo', component: AdminInfo},
            {
                path: 'userManager',
                component: Breadcrumb,
                meta: {title: '用户管理'},
                children: [
                    {path: 'users', component: Users, meta: {title: '用户管理'}},
                    {path: 'adduser', component: AddUser, meta: {title: '添加用户'}},
                    {path: 'draw/:uid', component: UserDraw, meta: {title: '用户画像'}},
                    {path: 'teacher', component: Teacher, meta: {title: '教师管理'}},
                ]
            },
            {
                path: 'courseManager',
                component: Breadcrumb,
                meta: {title: '课程管理'},
                children: [
                    {path: 'courses', component: Courses, meta: {title: '课程管理'}},
                    {path: 'addCourse', component: AddCourse, meta: {title: '添加课程'}},
                    {path: 'course/:course_id', component: ChapterList, meta: {title: '章节信息'}},
                ]
            },
            {
                path: 'commentManager',
                component: Breadcrumb,
                meta: {title: '评论管理'},
                children: [
                    {path: 'comments', component: Comments, meta: {title: '评论管理'}},
                ]
            },
            {
                path: 'dataManager',
                component: Breadcrumb,
                meta: {title: '数据统计'},
                children: [
                    {path: 'statistic1', component: Proportion, meta: {title: '用户性别统计'}},
                    {path: 'statistic2', component: ClassType, meta: {title: '课程类别统计'}},
                    {path: 'coursehot', component: CourseHot, meta: {title: '课程热度'}},
                    {path: 'statistic3', component: UV, meta: {title: '用户访问量'}},
                ]
            },
            {
                path: 'boardManager',
                component: Breadcrumb,
                meta: {title: '建议公告'},
                children: [
                    {path: 'board', component: Board, meta: {title: '网站公告'}},
                    {path: 'advice', component: Advice, meta: {title: '建议投诉'}},
                ]
            },
            {
                path: 'settings',
                component: Breadcrumb,
                meta: {title: '设置'},
                children: [
                    {path: 'shuffle', component: Shuffle, meta: {title: '轮播图'}},
                ]
            },
        ]
    }

]
