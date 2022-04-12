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
import EditCourse from "../views/Admin/Course/EditCourse"

import Proportion from "../views/Admin/Statistical/Sex";
import ClassType from "../views/Admin/Statistical/ClassType";
import UV from "../views/Admin/Statistical/UV";

import Comments from "../views/Admin/Comment/Comment"
import Board from "../views/Admin/Advice/Board"
import Advice from "../views/Admin/Advice/Advice";
import Setting from "../views/Admin/Setting/Setting";
import Shuffle from "../views/Admin/Setting/Shuffle";


//  admin后台路由
export default [
    {
        path: '/admin',
        component: Login
    },
    {
        path: '/mg',
        component: Index,
        redirect: '/mg/home',
        children: [
            {path: 'users', component: Users},
            {path: 'home', component: Home},
            {path: 'adminInfo', component: AdminInfo},
            {path: 'adduser', component: AddUser},
            {path: 'draw/:uid', component: UserDraw},
            {path: 'courses', component: Courses},
            {path: 'addCourse', component: AddCourse},
            {path: 'editCourse', component: EditCourse},
            {path: 'teacher', component: Teacher},
            {path: 'statistic1', component: Proportion},
            {path: 'statistic2', component: ClassType},
            {path: 'statistic3', component: UV},
            {path: 'comments', component: Comments},
            {path: 'board', component: Board},
            {path: 'advice', component: Advice},
            {path: 'setting', component: Setting},
            {path: 'shuffle', component: Shuffle},
        ]
    }
]
