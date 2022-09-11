const Post = require("../models/posts")
const { MongoClient, ServerApiVersion } = require('mongodb');
const { default: axios } = require("axios");
const ObjectId = require('mongodb').ObjectId


const uri = process.env.CLIENT_URI;
//MongoClient接続
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => console.log(err ? "MongoClient接続失敗" : "MongoClient接続成功"))
    //「ポケモンDB」に接続
const db = client.db("ポケモンDB")


//ポケモンデータ全件取得
const searchPoke = (req, res) => {
    debugger
    let poke = []
    db.collection("poke_data8").find().toArray((err, results) => {
        if (err) throw err;
        // console.log(results);
        poke = results
        res.send(results);
    })
};

//道具データ全件取得
const searchItem = (req, res) => {
    db.collection("items").find().toArray((err, results) => {
        if (err) throw err;
        res.send(results);
    })
};

//技データ全件取得
const searchMove = (req, res) => {
    db.collection("moves").find().toArray((err, results) => {
        if (err) throw err;
        res.send(results);
    })
};

//ObjectIdからポケモン1体取得
const searchPokeById = async(req, res) => {
    const id = req.params.id
    console.log(id);
    try {
        const Data = await Post.findById(id)
        console.log(Data.pokemon[0]);

        const collection = db.collection('poke_data8')
            //検索
        collection.findOne({ '_id': ObjectId(Data.pokemon[0]) }, (err, results) => {
            if (err) throw err
            console.log(results);
            res.send(results);
        })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

//特定の図鑑番号のポケモン全部取得
const searchPokeByNum = (req, res) => {
    const Pokemon = req.body
    console.log(Pokemon.no);
    const collection = db.collection('poke_data8')
        //検索
    collection.find({ 'no': Pokemon.no }).toArray((err, results) => {
        if (err) throw err
        console.log(results);
        res.send(results)
    })
}

//使用率TOP10のポケモンの図鑑番号、名前、フォルムを取得
const searchTopTenOfPoke = async(req, res) => {
    const topTeers = await axios.get('https://resource.pokemon-home.com/battledata/ranking/10342/0/1662560377/pokemon')
    const topTenArr = topTeers.data.slice(0, 10)
    console.log(topTenArr);

    // const numSearchFunc = async(poke, num) => {
    //     const cursor = db.collection("poke_data8").find({ 'no': num }).toArray()
    //     return await cursor.then((results) => {
    //         const applicablePoke = results[poke.form]
    //         poke.name = `${applicablePoke.name} ${applicablePoke.form}`
    //         return poke.name
    //     })
    // }
    let resArr = []
    await topTenArr.map(async(poke, i) => {
        // console.log(i);
        // console.log(poke);
        const num = await poke.id;
        // const pokeName = await numSearchFunc(poke, num)
        const cursor = db.collection("poke_data8").find({ 'no': num }).toArray()
        await cursor.then((results) => {
            const applicablePoke = results[poke.form]
            poke.name = `${applicablePoke.name} ${applicablePoke.form}`
            const pokeName = poke.name
            console.log(num, pokeName);
            const resObj = {
                id: num,
                form: poke.form,
                name: pokeName
            }
            resArr.push(resObj)
            if (resArr.length === 10) {
                console.log(resArr);
                res.send(resArr)
            }
        })
    })
}


module.exports = {
    searchPoke,
    searchItem,
    searchMove,
    searchPokeById,
    searchPokeByNum,
    searchTopTenOfPoke,
}