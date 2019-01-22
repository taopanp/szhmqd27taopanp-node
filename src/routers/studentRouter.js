// 注册和登录的处理
const express=require('express')

const path=require('path')

// 创建路由对象

const studentManagerRouter=express.Router()

const studentController=require(path.join(__dirname,'../controllers/studentController.js'))
// 获取学生列表
studentManagerRouter.get('/list',studentController.getstudentList)
// 渲染新增页面
studentManagerRouter.get('/add',studentController.addstudentPage)
// 添加数据
studentManagerRouter.post('/add',studentController.getstudent)
// 渲染编辑页面
// 动态路径参数 以冒号开头
studentManagerRouter.get('/edit/:studentId',studentController.editstudent)
// 编辑编辑页面
 studentManagerRouter.post('/edit/:studentId',studentController.giteditstudentPage)
//  删除数据
 studentManagerRouter.get('/delete/:studentId',studentController.deleteeditstudent)


// 导出路由对像
module.exports=studentManagerRouter