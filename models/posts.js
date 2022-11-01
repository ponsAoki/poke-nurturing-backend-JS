const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: String,
  pokemon: [String],
  no: Number,
  lv: Number,
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
    default: Date.now,
  },
});
module.exports = mongoose.model("Post", postSchema);
