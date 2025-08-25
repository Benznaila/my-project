const express = require("express");
const mongoose = require("mongoose");

const app = express();

/*app.get("/", (req, res) => {
	res.send("hello in node js project");
});*/


const Article = require("./models/Article");

mongoose
  .connect(
    "mongodb+srv://benznaila2005:8WDugS40oyG6UdNZ@cluster0.2dohifc.mongodb.net/mydb?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("✅ connected successfully to MongoDB");
  })
  .catch((error) => {
    console.error("❌ error with connecting with the DB ", error);
  });

app.use(express.json());

app.get("/", (req, res) => {
	res.send("cbn");
});

/*
app.get("/hello", (req, res) => {
	//res.send("hello");
  //res.send(<h1>hello</h1>);
  
});


app.get("/numbers", (req, res) => {
	let numbers = "";
	for (let i = 0; i <= 100; i++) {
		numbers += i + " - ";
	}
	//res.send(`the numbers are: ${numbers}`);
  //res.sendFile(__dirname + "/views/numbers.html");
  res.render("numbers.ejs",{
    name: "naila",
    numbers: numbers,
  }); //obligue views folder
});


app.put("/test", (req, res) => {
	res.send("hello world");
});

app.post("/addComment", (req, res) => {
	res.send("post request on add comment");
});

app.delete("/testingDelete", (req, res) => {
	res.send("delete request");
});

app.get("/findSummation/:number1/:number2", (req, res) => {
	const num1 = req.params.number1;
	const num2 = req.params.number2;

	const total = Number(num1) + Number(num2);

	res.send(`the total is ${total}`);
});


app.get("/sayHello", (req, res) => {
	//console.log(req.body);

	//console.log(req.query);
	//res.send(`Hello ${req.body.name}, Age is: ${req.query.age}`);

	res.json({
		name: req.body.name,
		age: req.query.age,
		language: "Arabic",
	});
});*/

app.post ("/articles", async (req, res) => {
  
  const newArcicle = new Article({
    title: "My third article",
    body: "This is the body of my third  article",
    numberOfLikes: 20,
  });
  await newArcicle.save();
  res.send("article added");

  /*const newArcicle = new Article();
  const artTitle = req.body.articletitle;
  const artBody = req.body.articlebody;

  newArcicle.title = artTitle;
  newArcicle.body = artBody;
  newArcicle.numberOfLikes = 0;
  await newArcicle.save();
  res.json(newArcicle);*/
});

app.get("/articles", async (req, res) => {
  const allArticles = await Article.find({});
  console.log(allArticles);
  res.json(allArticles);

});  

app.get("/articles/:articleId", async (req, res) => {
  const id = req.params.articleId;
  try {
    const article = await Article.findById(id);
    res.json(article);
  } catch (error) {
    res.status(404).json({message: "Article not found"});
  }

});

app.delete("/deleteArticles/:articleId", async (req, res) => {
  const id = req.params.articleId;
  try {
    const article = await Article.findByIdAndDelete(id);
    res.json(article);
    return;
  } catch (error) {
    res.status(404).json({message: "Article not found"});
  }
});

app.get("/showArticles", async (req, res) => {
	const articles = await Article.find();

	res.render("articles.ejs", {
		allArticles: articles,
	});
});

app.listen(3000, () => {
	console.log("I am listening in port 3000");
});