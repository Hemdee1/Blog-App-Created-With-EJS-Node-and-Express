const express = require("express");
const {
  getAllBlogs,
  getBlog,
  postBlog,
  createBlog,
  deleteBlog,
} = require("../controller/blogController");

const router = express.Router();

// using middleware
router.use(express.static("public"));

// get all blogs
router.get("/", getAllBlogs);

// post a blog
router.post("/", postBlog);

// create a blog
router.get("/create", createBlog);

// get a single blog
router.get("/:id", getBlog);

// delete a single blog
router.delete("/:id", deleteBlog);

module.exports = router;
