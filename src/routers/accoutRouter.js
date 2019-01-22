// 注册和登录的处理
const express=require('express')

const path=require('path')

// 创建路由对象

const accoutRouter=express.Router()

// 导入控制器模块

const accoutController=require(path.join(__dirname,'../controllers/accountController.js'))

// mvc
accoutRouter.get('/register',accoutController.getRegisterPage)
accoutRouter.post('/register',accoutController.register)
accoutRouter.get('/login',accoutController.getloginpage)
accoutRouter.get('/vcode',accoutController.getVcodeImage)
accoutRouter.post('/login',accoutController.getlogin)
accoutRouter.get('/loginout',accoutController.getloginout)


// 导出路由对像
module.exports=accoutRouter