const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const { response } = require("express");

app.use(cors());
app.use(express.json());
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Password@123",
  port: 3306,
  database: "music",
  multipleStatements: true,
});

app.listen(3001, function () {
  console.log("App listening  on port 3001!");
});

con.connect(function (err) {
  if (err) throw err;
});

//1
app.get("/song", urlencodedParser, (req, res) => {
  var sql = `select distinct Song.Id, Song.Name, Song.DOR, Song.Cover,UserRating.Rating from Song right join Sing on Song.Id=Sing.Song_id left join (select avg(Rating) as Rating, Song_Id from Rate group by Song_Id) as UserRating on UserRating.Song_Id=Song.Id order by UserRating.Rating desc;`;
  con.query(sql, function (err, result) {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});
//2
app.get("/artistForSong", urlencodedParser, (req, res) => {
  var sql = `select Artist.Name, Sing.Song_Id from Artist right join Sing on Artist.Id = Sing.Artist_Id`;
  con.query(sql, function (err, result) {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});
//3
app.post("/signup", urlencodedParser, (req, res) => {
  var response = {
    Name: req.body.Name,
    Email: req.body.Email,
    Contact: req.body.Contact,
  };
  var sql = `insert into User(Email, Name, Contact) values ("${response.Email}","${response.Name}","${response.Contact}")`;
  con.query(sql, function (err, result) {
    if (err) {
      console.log(err);
      res.send(result);
    } else {
      var sqlGetId = `Select Id from  User where Email="${response.Email}"`;
      con.query(sqlGetId, function (err, finalResult) {
        if (err) {
          throw err;
        }
        res.send(finalResult);
      });
    }
  });
});
//4
app.post("/login", urlencodedParser, (req, res) => {
  var response = {
    Name: req.body.Name,
    Email: req.body.Email,
  };
  var sql = `select Name,Id from User where Email="${response.Email}" and Name="${response.Name}"`;
  con.query(sql, function (err, result) {
    if (err) {
      console.log(err);
      res.send("null");
    } else {
      res.send(result);
    }
  });
});
//5
app.get("/artist", urlencodedParser, (req, res) => {
  var sql = `select distinct Artist.Id, Artist.Name, Artist.DOB from Artist right join Sing on Artist.Id=Sing.Artist_id;`;
  con.query(sql, function (err, result) {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});
//6
app.get("/songForArtist", urlencodedParser, (req, res) => {
  var sql = `select Song.Name, Sing.Artist_Id from Song right join Sing on Song.Id = Sing.Song_Id;`;
  con.query(sql, function (err, result) {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});
//7
app.post("/rate", urlencodedParser, (req, res) => {
  var response = {
    User_Id: req.body.User_Id,
    Song_Id: req.body.Song_Id,
    Rating: req.body.Rating,
  };
  var sql = `Select User_Id, Song_Id from Rate where User_Id="${response.User_Id}" and Song_Id="${response.Song_Id}"`;
  con.query(sql, function (err, result) {
    if (err) {
      throw err;
    } else {
      if (result.length == 0) {
        var sqlInsertion = `insert into Rate values (${response.User_Id},${response.Song_Id},${response.Rating});`;
        con.query(sqlInsertion, function (err, finalResult) {
          if (err) {
            throw err;
          }
          res.send(finalResult);
        });
      } else {
        var sqlInsertion = `update Rate set Rating=${response.Rating} where User_Id=${response.User_Id} and Song_Id=${response.Song_Id};`;
        con.query(sqlInsertion, function (err, finalResult) {
          if (err) {
            throw err;
          }
          res.send("Updated");
        });
      }
    }
  });
});
//8
app.get("/artist_name", urlencodedParser, (req, res) => {
  var sql = `SELECT Id, Name from Artist;`;
  con.query(sql, function (err, result) {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});
//9
app.post("/add", urlencodedParser, (req, res) => {
  var response = {
    Name: req.body.Name,
    DOR: req.body.DOR,
    Cover: req.body.Cover,
    Artist_Id: req.body.Artist,
  };
  var sql = `insert into Song(Cover, DOR, Name) values ("${response.Cover}","${response.DOR}","${response.Name}");`;
  con.query(sql, function (err, result) {
    if (err) {
      throw err;
    } else {
      var resultL;
      var sql1 = `insert into Sing values (${response.Artist_Id},${result.insertId})`;
      con.query(sql1, function (err, result2) {
        if (err) {
          throw err;
        }
        resultL = result2;
      });
      res.send(resultL);
    }
  });
});
//10
app.post("/addArtist", urlencodedParser, (req, res) => {
  var response = {
    Name: req.body.Name,
    DOB: req.body.DOB,
    Bio: req.body.Bio,
  };
  var sql = `insert into Artist(Bio,DOB,Name) values ("${response.Bio}","${response.DOB}","${response.Name}");`;
  con.query(sql, function (err, result) {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});
//11
app.get("/song_name", urlencodedParser, (req, res) => {
  var sql = `SELECT Id, Name from Song;`;
  con.query(sql, function (err, result) {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});
//12
app.get("/getallartist", urlencodedParser, (req, res) => {
  var sql = `select * from Artist`;
  con.query(sql, function (err, result) {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});
//13
app.get("/userratings", urlencodedParser, (req, res) => {
  var sql = `select s.Name SongName, r.Rating from Rate r inner join Song s on r.Song_Id=s.Id where User_Id="${req.query.Id}"`;
  con.query(sql, function (err, result) {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});
//14
app.get("/getuser", urlencodedParser, (req, res) => {
  var sql = `select * from User where Id="${req.query.Id}"`;
  con.query(sql, function (err, result) {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});
//15
app.delete("/deleteuser", urlencodedParser, (req, res) => {
  var sql = `Delete from rate where User_Id="${req.query.Id}"`;
  con.query(sql, function (err, result) {
    if (err) {
      throw err;
    } else {
      var sql_user = `Delete from user where Id="${req.query.Id}"`;
      con.query(sql_user, function (err, finalResult) {
        if (err) {
          throw err;
        }
        res.send(finalResult);
      });
    }
  });
});
