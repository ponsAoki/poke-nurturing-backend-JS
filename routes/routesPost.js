const express = require("express");
const router = express.Router();
const PostAPI = require("../controllers/PostController");
const multer = require("multer");

const authenticate = require("../middleware/authenticate");

//multer middleware
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});

let upload = multer({
  storage: storage,
}).single("image");

router.get("/test", PostAPI.testFunc);
router.get("/", PostAPI.fetchAllPost);
router.post("/yours", PostAPI.fetchYourPosts);
router.get("/:id", PostAPI.fetchPostByID);
router.post("/", upload, PostAPI.createPost);
router.patch("/:id", upload, PostAPI.updatePost);
router.delete("/:id", PostAPI.deletePost);

module.exports = router;
