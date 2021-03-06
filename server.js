const express = require('express')
const nunjucks = require('nunjucks')
const videos = require("./data")


const server = express()

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express:server,
    autoescape: false,
    noCache: true
})

server.get("/", function(req, res){
    const about = {
      avatar:  "/images/jefferson.jpg",
      name: "Jefferson Lennon",
      role: "Programador",
      description: 'Estudante de Análise e desenvolvimento de sistemas. <br> 26 years',
      links: [
          { name: "Github", url: "https://github.com/jefflennon1"  },
          { name: "Linkedin", url: "https://www.linkedin.com/in/jefferson-lennon-892404104/"  }          
      ]
    }
    return res.render("about", { about })
})

server.get("/portfolio", function(req, res){
    return res.render("portfolio", {items: videos})
})

server.get("/video", function(req, res){
    const id = req.query.id
   
    const video = videos.find(function(video){
      return video.id == id
    })
    if(!video){
        return res.send("Video not found!")
    }
    return res.render("video", {item: video})
   
    res.send(id) 
})

server.listen(5000, function (){
    console.log("server is running!")
})

