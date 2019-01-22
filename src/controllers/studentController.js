const path = require("path");
const template = require("art-template");
const  databasetools=require(path.join(__dirname,'../tools/databasetools.js'))
// const MongoClient = require("mongodb").MongoClient;
// Connection URL
// const url = "mongodb://localhost:27017";
// Database Name
// const dbName = "szhmqd27_tpp";

/**
 * 返回列表页面
 * @param {*} req
 * @param {*} res
 */
const getstudentList = (req, res) => {
  // Use connect method to connect to the server

  const keyword=req.query.keyword||''
  databasetools.findmone('studentInfo',{name:{$regex:keyword}},(err, docs)=>{

    const html = template(path.join(__dirname, "../public/views/list.html"), 
    {students:docs,keyword,loginName:req.session.loginName});
    res.send(html);
    console.log(docs);
    console.log(keyword);
   
  })

  // MongoClient.connect(
  //   url,
  //   { useNewUrlParser: true },
  //   function(err, client) {
  //     // 拿到的数据库db对象
  //     const db = client.db(dbName);

  //     // 拿到要操作的集合
  //     const collection = db.collection("studentInfo");

  //     // 查询多条
  //     collection.find({name:{$regex:keyword}}).toArray((err, docs) => {
  //       client.close();

  //       // 渲染页面的代码
       
  //     });
  //   }
  // );
};// 渲染添加页面
const addstudentPage=(req,res)=>{

  const html = template(path.join(__dirname, "../public/views/add.html"), {loginName:req.session.loginName});

    res.send(html);
  

  }
// 编辑添加页面

  const getstudent=(req,res)=>{
   
    databasetools.isertYige('studentInfo',req.body,(req,result)=>{

      if(!result){ //失败
        res.send(`<script>alert("插入失败!")</script>`)
      } else {
        res.send(`<script>location.href='/studentmanager/list'</script>`)
      }
    
          })
          
  }

// 渲染编辑页面
const  editstudent=(req,res)=>{
  const _id = databasetools.ObjectId(req.params.studentId);
  // console.log(_id);

  databasetools.findYige('studentInfo',{_id},(err,doc)=>{
    doc.loginName=req.session.loginName 
    console.log(doc._id);
    const html = template(path.join(__dirname, "../public/views/edit.html"), doc);
    // console.log(res.name);
      res.send(html);
  })

}


const giteditstudentPage=(req,res)=>{
  const _id = databasetools.ObjectId(req.params.studentId);
  console.log(_id);
  console.log(req.body);
  databasetools.updatedYige('studentInfo',{_id},req.body,(err,result)=>{
    if(!result){ //失败
      res.send(`<script>alert("修改失败!")</script>`)
    } else{
      res.send(`<script>location.href='/studentmanager/list'</script>`)
    }

  })


}

const deleteeditstudent=(req,res)=>{
    const _id = databasetools.ObjectId(req.params.studentId);

    databasetools.deleteYige('studentInfo',{_id},(req,result)=>{
      if(!result){ //失败
        res.send(`<script>alert("删除失败!")</script>`)
      } else{
        console.log('111');
        res.send(`<script>location.href='/studentmanager/list'</script>`)
      }
    })

}



module.exports = {
  getstudentList,
  addstudentPage,
  getstudent,
  editstudent,
  giteditstudentPage,
  deleteeditstudent
};
