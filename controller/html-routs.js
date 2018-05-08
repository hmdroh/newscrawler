var express = require("express");
var request = require("request");
var cheerio = require("cheerio");
var path = require("path");

var router = express.Router();
var db = require("../models");

router.get("/", function(req,res){
    res.sendfile(path.resolve("public/index.html"));
});

router.get("/saved", function(req,res){
    res.sendfile(path.resolve("public/saved.html"));
});

router.get("/showAll", function(req,res){
    db.Article.find({}).then(function(data){
        res.json(data);
    })
});

router.get("/showWithComment/:id", function(req,res){
    db.Article.findById({_id: req.params.id})
    .populate("comment")
    .then(function(data){
        res.json(data);
    })
});

router.get("/showSaved", function(req,res){
    db.Article.find({isSaved: true}).then(function(data){
        res.json(data);
    })
});

router.post("/savecomment", function(req,res){
    var comment = req.body.comment;
    var articleId = req.body.id;
    //save comment
        db.UserComment.create({comment: comment }).then(function(entry){
            var commentId = entry._id;

            db.Article.findOneAndUpdate({_id: articleId}, { $push: { "comment": commentId }}, {new:true}).then(function(data){
                
            })
        })
    //get id from comment
    res.end(true);
    //save it in the article comment db
});

router.get("/save/:id", function(req,res){
    db.Article.findOneAndUpdate({_id:req.params.id}, { $set: { "isSaved": true }}, {new:true}).then(function(data){
        res.redirect("/");
    })
});

router.get("/unsave/:id", function(req,res){
    db.Article.findOneAndUpdate({_id:req.params.id}, { $set: { "isSaved": false }}, {new:true}).then(function(data){
        res.redirect("/");
    })
});

router.get("/scrape", function(req,res){
     var url = "https://www.nytimes.com/";
    request(url, function(err, response, html ){
        var $ = cheerio.load(html);
        var titles = [];
        $("h2.story-heading").each(function(i,item){
           
            var entry = ({
                Headline: $(item).children().text().trim(),
                URL:  $(item).children().attr("href"),
                Summary: $(item).parent().children(".summary").text().trim()
            });

            titles.push(entry);
            db.Article.create(entry).then(function(dataEntered) {
                console.log(dataEntered);
              })
              .catch(function(err) {
                console.log(err.message);
              });

        });
        res.json(titles);
    })
});


module.exports = router;
