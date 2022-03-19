// admin后台组件
import Index from '../views/Admin/Index'
import Home from "../views/Admin/Home"
import Login from '../views/Admin/Login'
import Users from "../views/Admin/Users/Users"
import AddUser from "../views/Admin/Users/AddUser"
import EditUser from "../views/Admin/Users/EditUser"
import Courses from "../views/Admin/Course/Courses"
import AddCourse from "../views/Admin/Course/AddCourse"
import EditCourse from "../views/Admin/Course/EditCourse"
import Comments from "../views/Admin/Comments/Comments"
import Board from "../views/Admin/Board"
import Setting from "../views/Admin/Settings/Setting";
import Shuffle from "../views/Admin/Settings/Shuffle";


//  admin后台路由
export default [
    {
        path: '/admin',
        component: Login
    },
    {
        path: '/mg',
        component: Index,
        redirect:'/mg/home',
        children: [
            {path: 'users', component: Users},
            {path: 'home', component: Home},
            {path: 'adduser', component: AddUser},
            {path: 'edituser/:uid', component: EditUser},
            {path: 'courses', component: Courses},
            {path: 'addCourse', component: AddCourse},
            {path: 'editCourse', component: EditCourse},
            {path: 'comments', component: Comments},
            {path: 'board', component: Board},
            {path: 'setting', component: Setting},
            {path: 'shuffle', component: Shuffle},
        ]
    }
]
