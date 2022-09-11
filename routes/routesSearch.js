const express = require('express');
const router = express.Router();
const SearchController = require('../controllers/SearchController');

router.get("/poke", SearchController.searchPoke);
router.get("/item", SearchController.searchItem);
router.get("/move", SearchController.searchMove);
router.get("/toppoke", SearchController.searchTopTenOfPoke)
router.get("/:id", SearchController.searchPokeById)
router.post("/num", SearchController.searchPokeByNum)

module.exports = router;