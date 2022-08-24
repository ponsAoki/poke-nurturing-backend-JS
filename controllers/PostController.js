const Post = require("../models/posts")
const fs = require("fs");


module.exports = class PostAPI {
    //投稿一覧表示
    static async fetchAllPost(req, res) {
            try {
                const posts = await Post.find();
                res.status(200).json(posts)
            } catch (err) {
                res.status(404).json({ message: err.message })
            }
        }
        //特定のユーザーの投稿一覧表示
    static async fetchYourPosts(req, res) {
            const userName = req.body.name
            console.log(userName);
            try {
                const yourPosts = await Post.find({ 'username': userName });
                res.status(200).json(yourPosts)
            } catch (err) {
                res.status(404).json({ message: err.message })
            }
        }
        //投稿1つ取得
    static async fetchPostByID(req, res) {
            const id = req.params.id
            try {
                const post = await Post.findById(id)
                res.status(200).json(post);
            } catch (error) {
                res.status(400).json({ message: error.message })
            }
        }
        //投稿 (育成論作成)
    static async createPost(req, res) {
            const post = req.body;
            console.log(post);
            try {
                await Post.create(post);
                res.status(200).json({ message: '新しい育成論が追加されました。' })
            } catch (error) {
                res.status(400).json({ message: error.message })
            }
        }
        //育成論更新
    static async updatePost(req, res) {
            const id = req.params.id;
            const newPost = req.body
            console.log(newPost);
            // newPost.image = new_image

            try {
                await Post.findByIdAndUpdate(id, newPost);
                res.status(200).json({ message: '育成論が更新されました。' })
            } catch (error) {
                res.status(404).json({ message: error.message })
            }
        }
        //育成論削除
    static async deletePost(req, res) {
        const id = req.params.id
        try {
            const result = await Post.findByIdAndDelete(id)
                // if (result.image != '') {
                //     try {
                //         fs.unlinkSync('./uploads/' + result.image)
                //     } catch (error) {
                //         console.log(error);
                //     }
                // }
            res.status(200).json({ message: '育成論を消去しました。' })
        } catch (error) {
            res.status(404).json({ message: error.message })
        }
    }

    // //ポケモンデータ全件取得
    // static async searchPoke(req, res) {
    //         //データベース接続
    //         await MongoClient.connect('mongodb://localhost:27017', {
    //             useNewUrlParser: true
    //         }, (err, db) => {
    //             if (err) throw err;
    //             console.log("データベース接続に成功しました")
    //                 //取得
    //             const dbName = db.db("ポケモンDB")
    //             dbName.collection("poke_data8").find().toArray((err, results) => {
    //                 if (err) throw error;
    //                 // console.log(results);
    //                 res.send(results);
    //                 db.close();
    //             })
    //         });
    //     }
    //     //道具データ全件取得
    // static async searchItem(req, res) {
    //         //データベース接続
    //         await MongoClient.connect('mongodb://localhost:27017', {
    //             useNewUrlParser: true
    //         }, (err, db) => {
    //             if (err) throw err;
    //             console.log("データベース接続に成功しました")
    //                 //取得
    //             const dbName = db.db("ポケモンDB")
    //             dbName.collection("item").find({}, { id: 0, "name.japanese": 1, "name.english": 0, "name.chinese": 0 }).toArray((err, results) => {
    //                 if (err) throw error;
    //                 // console.log(results);
    //                 res.send(results);
    //                 db.close();
    //             })
    //         });
    //     }
    //     //技データ全件取得
    // static async searchMove(req, res) {
    //         //データベース接続
    //         await MongoClient.connect('mongodb://localhost:27017', {
    //             useNewUrlParser: true
    //         }, (err, db) => {
    //             if (err) throw err;
    //             console.log("データベース接続に成功しました")
    //                 //取得
    //             const dbName = db.db("ポケモンDB")
    //             dbName.collection("moves").find().toArray((err, results) => {
    //                 if (err) throw error;
    //                 // console.log(results);
    //                 res.send(results);
    //                 db.close();
    //             })
    //         });
    //     }
    //     //search pokemon by ID
    // static async searchPokeById(req, res) {
    //         // const id = '6286281c4ce508653ab41c0e'
    //         const id = req.params.id
    //         try {
    //             const Data = await Post.findById(id)
    //                 // console.log(Data);

    //             //データベース接続
    //             MongoClient.connect('mongodb://localhost:27017', {
    //                 useNewUrlParser: true
    //             }, (err, db) => {
    //                 if (err) throw err;
    //                 console.log("データベース接続に成功しました")
    //                 const dbName = db.db("ポケモンDB")
    //                 const collection = dbName.collection('poke_data8')
    //                     //検索
    //                 collection.findOne({ '_id': ObjectId(Data.pokemon[0]) }, function(err, results) {
    //                     if (err) {
    //                         throw error
    //                     } else {
    //                         // console.log(results);
    //                         res.send(results);
    //                     }
    //                     db.close()
    //                 })
    //             })
    //         } catch (error) {
    //             res.status(400).json({ message: error.message })
    //         }
    //     }
    //     //任意の図鑑番号に該当するポケモン全部取得
    // static async searchPokeByNum(req, res) {
    //     const Pokemon = req.body
    //     console.log(Pokemon.no);

    //     await MongoClient.connect('mongodb://localhost:27017', {
    //         useNewUrlParser: true
    //     }, (err, db) => {
    //         if (err) throw err;
    //         console.log("データベース接続に成功しました");
    //         const dbName = db.db('ポケモンDB')
    //         const collection = dbName.collection('poke_data8')
    //             //検索
    //         collection.find({ 'no': Pokemon.no }).toArray((err, results) => {
    //             if (err) {
    //                 throw error
    //             } else {
    //                 console.log(results);
    //                 res.send(results)
    //                 db.close()
    //             }
    //         })
    //     })
    // }
}