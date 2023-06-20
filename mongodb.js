// Tham chiếu thư viện
var MongoClient = require('mongodb').MongoClient;

//link kết nối đến database
var url = "mongodb+srv://buianhhong:HRUWQ91GqzarUlJb@cluster0.6ibmupd.mongodb.net/";

//tạo đối tượng và truyền dữ liệu qua url
var mongo = new MongoClient(url, {useNewUrlParser : true});

//kết nối đến Database
mongo.connect((err, db) => {
    if(err) { throw err;}
    else{
        console.log("Kết nối thành công");
    }
});

