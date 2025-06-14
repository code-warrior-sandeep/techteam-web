if(process.env.NODE_ENV != "production") {
require('dotenv').config();
}

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const methodOverride = require("method-override");
const path = require("path");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync")
const ExpressError = require("./utils/ExpressError");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const session = require("express-session");
const MongoStore = require("connect-mongo")
const flash = require("connect-flash");
const Student = require("./models/student")
const learningRouter = require("./routes/learning")
const studentRouter = require("./routes/students")
const aboutRouter = require("./routes/about")
const contactRouter = require("./routes/contact")
const adminRouter = require("./routes/admin")
const StudentList = require("./models/studentList");
const ImportantDate = require('./models/exam');
const datesRoutes = require("./routes/dates")
const eventsRoutes = require('./routes/events');


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"))
app.use(express.urlencoded({extended:true}));
app.use(express.json()); // kjkhku
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

// const MONGO_URL = "mongodb://127.0.0.1:27017/techteam"
const dbUrl = process.env.ATLASDB_URL;
async function main() {
    await mongoose.connect(dbUrl)
} 

main().then(()=>{
    console.log("mongo connected")
}).catch((err)=> {
    console.log(err)
})

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.MONGO_SESSION_SECRET,
  },
  touchAfter: 24*3600,
});

store.on("error", () => {
  console.log("Error in mongo session store", error)
})

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave:  false,
    saveUninitialized: false,
    cookie: {
     expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
     maxAge: 7 * 24 * 60 * 60 * 1000,
     httpOnly : true,
    }
}



app.use(session(sessionOptions))
app.use(flash())

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Student.authenticate()));

passport.serializeUser(Student.serializeUser());
passport.deserializeUser(Student.deserializeUser())


app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currStudent = req.user;
    next();
})

// Show main page
app.get('/', async (req, res) => {
  const dates = await ImportantDate.find().sort('date');
  res.render('components/home.ejs', { dates });
});



app.use("/", learningRouter);
app.use("/", studentRouter );
app.use("/", aboutRouter);
app.use("/", contactRouter);
app.use("/", adminRouter);
app.use('/', datesRoutes);
app.use("/", eventsRoutes);

app.use((err, req, res, next) => {
  if (err.code === 'LIMIT_FILE_SIZE') {
    req.flash("error", "Image must be under 100 KB");
    return res.redirect("/signup");
  }

  if (err.message === "Only image files are allowed!") {
    req.flash("error", "Only image files (jpg/jpeg/png) are allowed");
    return res.redirect("/signup");
  }

  next(err);
});

app.use((err, req, res, next)=> {
    let {statusCode = 500, message= "something went wrong"} = err;
    // res.status(statusCode).send(message);
    res.status(statusCode).render("error.ejs", {err})
})


app.listen("3000", (req, res)=> {
    console.log("Server is listening to port 3000")
})