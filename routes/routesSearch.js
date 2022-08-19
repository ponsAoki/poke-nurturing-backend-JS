const express = require('express');
const router = express.Router();
const SearchAPI = require('../controllers/SearchController');

router.get("/poke", SearchAPI.searchPoke);
router.get("/item", SearchAPI.searchItem);
router.get("/move", SearchAPI.searchMove);
router.get("/:id", SearchAPI.searchPokeById)
router.post("/num", SearchAPI.searchPokeByNum)

module.exports = router;