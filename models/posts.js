const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    pokemon: [String],
    simId: Number,
    no: Number,
    lv: Number,
    nn: String,
    image: String,
    sex: Number,
    color: String,
    ability: String,
    abilities: Array,
    nature: String,
    item: String,
    bn: [Number],
    IN: [Number],
    en: [Number],
    rn: [Number],
    moves: Object,
    memo: String,
    username: String,
    created: {
        type: Date,
        default: Date.now
    },
});
module.exports = mongoose.model("Post", postSchema)