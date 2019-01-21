// 导出一个方法  获取注册页面
const path=require('path')
const MongoClient = require('mongodb').MongoClient;
const captchapng=require('captchapng')
// Connection URL
const url = 'mongodb://localhost:27017';
const dbName = 'szhmqd27_tpp';

exports.getRegisterPage=(req,res)=>{
    // res.send('我是注册页面')
    // 内部sendFile()  内部对 fs.readFile的封装
    res.sendFile(path.join(__dirname,'../public/views/register.html'))
}

exports.register=(req,res)=>{
    const result={
        status:0,
        message:'注册成功'
    }

    const {username,password}=req.body
    MongoClient.connect(url, function (err, client) {
        // console.log("Connected successfully to server");
        //操作数据库的一个db对象
        const db = client.db(dbName);
        // Get the documents collection 拿到要操作的集合
        const collection = db.collection('accountInfo');


        // 根据用户名查找用户名和密码是否是否存在    
       collection.findOne({username},(err,doc)=>{
      console.log(doc);
      if(doc){//如果存在
result.status=1,
result.message='用户名已经存在'

res.send(result)
client.close()
      }else{//不存在
           
        collection.insertOne((obj.body),(err,result2)=>{
            // rusult2有值代表插入成功  没有值 null代表失败
             if(!result2){//失败
                   result.status=2,
                   result.message='插入失败'
             }
             res.send(result),
             client.close()//关闭数据库

        })
      }
      


       })



    })


}

// 导出获取登录页面的方法
exports.getloginpage=(req,res)=>{

    res.sendFile(path.join(__dirname,'../public/views/login.html'))

}


// 获取验证码的方法


exports.getVcodeImage=(req,res)=>{

   var vcode=parseInt(Math.random()*9000+1000)
//    req.session是存在express-session里面的方法
    //    给req.session添加一个vcode方法
    console.log(vcode);
       req.session.vcode=vcode
        //    console.log(req.session);
    var p = new captchapng(80,30,vcode); // width,height,numeric captcha
        p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
        p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)
 
        var img = p.getBase64();
        var imgbase64 = new Buffer(img,'base64');
        res.writeHead(200, {
            'Content-Type': 'image/png'
        });
        res.end(imgbase64);
}

// 登录


exports.getlogin=(req,res)=>{
    const result={
        status:0,
        message:'登录成功'
    }
  const {username,password,vcode}=req.body
console.log(vcode);
console.log(req.session.vcode);


if(vcode!=req.session.vcode){
  result.status=1,
  result.message='验证码错误'

  res.send(result)

  return

}

    MongoClient.connect(url, function (err, client) {
        // console.log("Connected successfully to server");
        //操作数据库的一个db对象
        const db = client.db(dbName);
        // Get the documents collection 拿到要操作的集合
        const collection = db.collection('accountInfo');


        // 根据用户名查找用户名和密码是否是否存在    
       collection.findOne({username,password},(err,doc)=>{
            if(!doc){
                result.status=2,
                result.message='用户名或密码错误'

                res.send(result)
              client.close()
            }else{

                res.send(result)
                client.close()
            }
    

       })


    })


}



