const Post = require("../models/posts")
const fs = require("fs");


module.exports = class PostAPI {
    //test
    static async testFunc(req, res) {
        console.log("testFuncです");
    }
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

}