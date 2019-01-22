// 导包
const  express=require('express')
const path=require('path')
const bodyParser = require('body-parser')
const session = require('express-session')


// 创建app

const app=express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
// Use the session middleware
app.use(session({ secret: 'keyboard cat',resave:false,saveUninitialized:false, cookie: { maxAge: 60000 }}))
// 设置静态资源根目录
app.use(express.static(path.join(__dirname,"public")))
// 拦截所有的请求
app.all('/*',(req,res,next)=>{
if(req.url.includes('account')){
// 执行下一个中间件
next(0)

}else{
if(req.session.loginName){

    next()
}else{
res.send(`<script>alert('您还没有登录，请先登录!');location.href='/account/login'</script>`)
}

}


})



// 导入路由对象
const  accountRouter=require(path.join(__dirname,'routers/accoutRouter.js'))
const  studentManagerRouter= require(path.join(__dirname,'routers/studentRouter.js')) 

app.use('/account',accountRouter)
app.use('/studentmanager',studentManagerRouter)

// 启动 
app.listen(7788,'127.0.0.1',err=>{
if(err){

    console.log(err);   
}
console.log('start  ok');
})