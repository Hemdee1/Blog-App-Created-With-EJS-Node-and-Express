const express = require("express");
const mongoose = require("mongoose");
const DataModel = require("./database/dataSchema");
const blogRouter = require("./routes/blogRoutes");

// express app
const app = express();

// settin up view engines
app.set("view engine", "ejs");

// connecting to database
mongoose
  .connect("mongodb://localhost:27017/hemdeeBlog")
  .then(() => {
    // listening to requests
    app.listen(3000, () => {
      console.log("connected to db and listening on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });

// using middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// returning pages
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// blogs routes
app.use("/blogs", blogRouter);

// redirects
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "Not Found" });
});
