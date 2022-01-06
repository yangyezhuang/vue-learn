# 在线学习平台

## 项目介绍

本项目是基于vue2.0 + SpringBoot构建的在线学习平台，项目采用前后端分离。前端使用vue + element-ui，后端使用SpringBoot + MySQL实现。
前后台账号密码都为admin。



## 安装依赖

```
npm install
```



## 项目启动

```
npm run serve
```

## 数据库

course_tbl

```sql
CREATE TABLE `course_tbl` (
  `id` int(30) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `people` int(255) DEFAULT NULL,
  `hour` int(255) DEFAULT NULL,
  `info` varchar(255) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `chapter` int(64) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```



chapter_tbl

```sql
CREATE TABLE `chapter_tbl` (
  `course_id` varchar(255) DEFAULT NULL,
  `course_title` varchar(255) DEFAULT NULL,
  `chapter_title` varchar(255) DEFAULT NULL,
  `chapter` varchar(255) DEFAULT NULL,
  `chapter_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```



user_tbl

```sql
CREATE TABLE `user_tbl` (
  `user_id` bigint(10) NOT NULL,
  `user_name` varchar(64) DEFAULT NULL,
  `password` varchar(64) DEFAULT NULL,
  `sex` varchar(64) DEFAULT NULL,
  `phone_num` bigint(11) DEFAULT NULL,
  `email` varchar(64) DEFAULT NULL,
  `group_id` int(11) DEFAULT NULL,
  `login_time` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```



## 后端接口

### User端

```bash
## User端

# 用户注册
/register

# 用户登录
/login

# 获取全部课程
/courses

# 获取课程详情页信息
/coursedetail

# 获取视频数
/player


```

### Admin端

```bash
# 管理员登陆
/adminLogin

# 查看全部用户
/users

# 添加用户
/addUser

# 删除用户
/delUser

# 查看全部课程
/getCourses

# 添加课程
/addCourse

# 删除课程
/delCourse
```





