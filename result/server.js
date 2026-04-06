const fs = require("fs");
const path = require("path");

var express = require('express'),
    async = require('async'),
    { Pool } = require('pg'),
    cookieParser = require('cookie-parser'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server);

var port = process.env.PORT || 5001;

io.on('connection', function (socket) {

  socket.emit('message', { text : 'Welcome!' });

  socket.on('subscribe', function (data) {
    socket.join(data.channel);
  });
});

var pool = new Pool({
  connectionString: 'postgres://postgres:postgres@voting_database:5432/postgres'
});

async.retry(
  {times: 10, interval: 10},
  function(callback) {
    pool.connect(function(err, client, done) {
      if (err) {
        console.error("Waiting for db");
      }
      callback(err, client);
    });
  },
  function(err, client) {
    if (err) {
      return console.error("Giving up");
    }
    console.log("Connected to db");
    getVotes(client);
  }
);

function getVotes(client) {
  client.query('SELECT vote, COUNT(id) AS count FROM votes GROUP BY vote', [], function(err, result) {
    if (err) {
      console.error("Error performing query: " + err);
    } else {
      var votes = collectVotesFromResult(result);
      io.sockets.emit("scores", JSON.stringify(votes));
    }

    //refresh every 1 second
    setTimeout(function() {getVotes(client) }, 1000);
  });
}

function collectVotesFromResult(result) {
  var votes = {a: 0, b: 0, c:0, d:0};

  result.rows.forEach(function (row) {
    votes[row.vote] = parseInt(row.count);
  });
  
  /* for (let vote in votes) {
    console.log(vote + ": " + votes[vote]);
  } */

  return votes;
}

app.use(cookieParser());
app.use(express.urlencoded());

//get stats from db
app.get('/db/voters_data', async function (req, res) {
  try {
    const result = await pool.query('SELECT vote, COUNT(id) AS count FROM votes GROUP BY vote');
    const votes = collectVotesFromResult(result);
    res.json(votes);
  } catch(err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// home route
app.get('/', function (req, res) {
  const categories = (process.env.VOTE_OPTIONS || "Cats,Dogs,Ducks,Lions")
    .split(",")
    .map(c => c.trim());

  if (categories.length < 4) {
    return res.status(500).send("Need at least 4 categories");
  }

 //html = html.replace(/__CATEGORY_A__/g, "TEST_VALUE");
  let html = fs.readFileSync(path.join(__dirname, "views", "index.html"), "utf8");
  html = html
    .replace(/__CATEGORY_A__/g, categories[0])
    .replace(/__CATEGORY_B__/g, categories[1])
    .replace(/__CATEGORY_C__/g, categories[2])
    .replace(/__CATEGORY_D__/g, categories[3]);

  res.send(html);
});

app.use(express.static(__dirname + '/views'));

server.listen(port, function () {
  var port = server.address().port;
  console.log('App running on port ' + port);
});
