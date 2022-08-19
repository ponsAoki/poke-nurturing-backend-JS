const Post = require("../models/posts")
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId


const uri = process.env.CLIENT_URI;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//     if (err) {
//         console.log("MongoClient接続失敗");
//     } else {
//     }
//     // const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
// });

// const db = client.db("ポケモンDB")
// const MongoClientConnect = () => {

// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//     if (err) {
//         console.log("MongoClient接続失敗");
//     } else {
//         console.log("MongoClient接続成功");
//     }
//     // const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
// });
//     return client
// }


//ポケモンデータ全件取得
const searchPoke = (req, res) => {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    client.connect(err => {
        if (err) {
            console.log("MongoClient接続失敗");
        } else {
            console.log("MongoClient接続成功");
            const db = client.db("ポケモンDB")
            db.collection("poke_data8").find().toArray((err, results) => {
                if (err) throw error;
                // console.log(results);
                res.send(results);
                client.close();
            })
        }
        // const collection = client.db("test").collection("devices");
        // perform actions on the collection object
    });
};

//道具データ全件取得
const searchItem = (req, res) => {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    client.connect(err => {
        if (err) {
            console.log("MongoClient接続失敗");
        } else {
            console.log("MongoClient接続成功");
            const db = client.db("ポケモンDB")
            db.collection("items").find({}, { id: 0, "name.japanese": 1, "name.english": 0, "name.chinese": 0 }).toArray((err, results) => {
                if (err) throw error;
                // console.log(results);
                res.send(results);
                client.close();
            })
        }
        // const collection = client.db("test").collection("devices");
        // perform actions on the collection object
    });
};

//技データ全件取得
const searchMove = (req, res) => {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    client.connect(err => {
        if (err) {
            console.log("MongoClient接続失敗");
        } else {
            console.log("MongoClient接続成功");
            const db = client.db("ポケモンDB")
            db.collection("moves").find().toArray((err, results) => {
                if (err) throw error;
                // console.log(results);
                res.send(results);
                client.close();
            })
        }
        // const collection = client.db("test").collection("devices");
        // perform actions on the collection object
    });
};

//ObjectIdからポケモン1体取得
const searchPokeById = async(req, res) => {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    client.connect(async(err) => {
        if (err) {
            console.log("MongoClient接続失敗");
        } else {
            console.log("MongoClient接続成功");
            const db = client.db("ポケモンDB")
                // const id = '6286281c4ce508653ab41c0e'
            const id = req.params.id
            console.log(id);
            try {
                const Data = await Post.findById(id)
                console.log(Data.pokemon[0]);

                const collection = db.collection('poke_data8')
                    //検索
                collection.findOne({ '_id': ObjectId(Data.pokemon[0]) }, function(err, results) {
                    if (err) {
                        throw error
                    } else {
                        console.log(results);
                        res.send(results);
                    }
                    client.close()
                })

            } catch (error) {
                res.status(400).json({ message: error.message })
            }
        }
        // const collection = client.db("test").collection("devices");
        // perform actions on the collection object
    });
}

//特定の図鑑番号のポケモン全部取得
const searchPokeByNum = (req, res) => {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    client.connect(err => {
        if (err) {
            console.log("MongoClient接続失敗");
        } else {
            console.log("MongoClient接続成功");
            const db = client.db("ポケモンDB")
            const Pokemon = req.body
            console.log(Pokemon.no);

            const collection = db.collection('poke_data8')
                //検索
            collection.find({ 'no': Pokemon.no }).toArray((err, results) => {
                if (err) {
                    throw error
                } else {
                    console.log(results);
                    res.send(results)
                    client.close()
                }
            })
        }
        // const collection = client.db("test").collection("devices");
        // perform actions on the collection object
    });
}

module.exports = {
    searchPoke,
    searchItem,
    searchMove,
    searchPokeById,
    searchPokeByNum
}