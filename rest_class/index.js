const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override")



app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")))

let posts = [
    {
        id: uuidv4(),
        username: "apna college",
        content: "love codeing"
    },
     {
        id: uuidv4(),
        username: "sandeep",
        content: "love techz"
    },
     {
        id: uuidv4(),
        username: "apna",
        content: "love apna"
    },
     {
        id: uuidv4(),
        username: "college",
        content: "heyy college"
    },
];

app.get("/posts", (req, res) => {
   res.render("index.ejs", {posts});
});


app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
})

app.post("/posts", (req,res) => {
    let {username, content} = req.body;
    let id  = uuidv4();
    posts.push({id, username, content});
    res.redirect("/posts")
})

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => p.id.toString() === id);
    if (!post) {
        return res.status(404).send("Post not found");
    }
    res.render("show.ejs", { post });
});

app.patch("/posts/:id", (req,res) => {
    let { id } = req.params;
    let  newContent = req.body.content;
    let post = posts.find((p) => id === p.id );
    post.content = newContent;
    res.redirect("/posts");
})

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => Number(id) === p.id);
    res.render("edit.ejs", {posts}); 
});

app.delete("/posts/:id", (req, res) => {
     let { id } = req.params;
    posts = posts.filter((p) =>  id !== p.id);
    res.redirect("/posts");
})


app.listen(port, (req, res) => {
    console.log("listenning port on 3000")
})