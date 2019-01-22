// mongodb代码
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
// Connection URL
const url = "mongodb://localhost:27017";
// Database Name
const dbName = "szhmqd27_tpp";

/**
 * 暴露出一个方法，插入一条数据
 * @param {*} collectionName 集合名称
 * @param {*} data 数据
 * @param {*} callback 回调，把结果告知控制器
 */
const isertYige=(collectionName,data,callback)=>{

  MongoClient.connect(
        url,
        { useNewUrlParser: true }, 
        function(err, client) {
          // 拿到的数据库db对象
          const db = client.db(dbName);
    
          // 拿到要操作的集合
          const collection = db.collection(collectionName);

    collection.insertOne(data,(err,result)=>{
        callback(err,result)

           // 关闭数据库
           client.close();
    })

})
}
/**
 * 暴露出一个方法，查找一条数据
 * @param {*} collectionName 集合名称
 * @param {*} data 数据
 * @param {*} callback 回调，把结果告知控制器
 */
const findYige=(collectionName,data,callback)=>{

    MongoClient.connect(
        url,
        { useNewUrlParser: true },
        function(err, client) {
          // 拿到的数据库db对象
          const db = client.db(dbName);
    
          // 拿到要操作的集合
          const collection = db.collection(collectionName);
    collection.findOne(data,(err,result)=>{

        callback(err,result)

           // 关闭数据库
           client.close();
    })

})
}
/**
 * 暴露出一个方法，查找多条数据
 * @param {*} collectionName 集合名称
 * @param {*} data 数据
 * @param {*} callback 回调，把结果告知控制器
 */
const findmone=(collectionName,data,callback)=>{

    MongoClient.connect(
        url,
        { useNewUrlParser: true },
        function(err, client) {
          // 拿到的数据库db对象
          const db = client.db(dbName);
    
          // 拿到要操作的集合
          const collection = db.collection(collectionName);

      collection.find(data).toArray((err,result)=>{
              
        callback(err,result)
    
        // 关闭数据库
        client.close();

      })

})
}
const updatedYige=(collectionName,condition,data,callback)=>{

    MongoClient.connect(
        url,
        { useNewUrlParser: true },
        function(err, client) {
          // 拿到的数据库db对象
          const db = client.db(dbName);
    
          // 拿到要操作的集合
          const collection = db.collection(collectionName);

          collection.updateOne(condition,{$set:data},(err,result)=>{
            callback(err,result)
    
               // 关闭数据库
               client.close();
        })
})
}
const deleteYige=(collectionName,data,callback)=>{

    MongoClient.connect(
        url,
        { useNewUrlParser: true },
        function(err, client) {
          // 拿到的数据库db对象
          const db = client.db(dbName);
    
          // 拿到要操作的集合
          const collection = db.collection(collectionName);

          collection.deleteOne(data,(err,result)=>{
            callback(err,result)
    
               // 关闭数据库
               client.close();
        })
})
}

module.exports={
    isertYige,
    findYige,
    findmone,
    updatedYige,
    ObjectId,
    deleteYige
}