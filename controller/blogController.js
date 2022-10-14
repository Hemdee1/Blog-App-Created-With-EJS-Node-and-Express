const mongoose = require("mongoose");
const DataModel = require("../database/dataSchema");

const blogs = [];

const getAllBlogs = async (req, res) => {
  const blogs = await DataModel.find();
  res.render("index", { title: "Home", blogs });
};

const createBlog = (req, res) => {
  res.render("create", { title: "Create" });
};

const postBlog = async (req, res, next) => {
  const data = req.body;

  const blog = await DataModel.create({
    ...data,
  });

  if (blog) {
    res.redirect("/blogs");
  }
};

const getBlog = async (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id.trim());

  const blog = await DataModel.findById(id);

  if (blog) {
    res.render("blog-details", {
      title: "Blog-Details",
      blog,
    });
  }
};

const deleteBlog = async (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id.trim());

  const blog = await DataModel.findByIdAndDelete(id);

  if (blog) {
    res.json({ redirect: "/blogs" });
  }
};

module.exports = { getAllBlogs, getBlog, postBlog, createBlog, deleteBlog };
