const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./app/config/db.config');
const app = express();

mongoose.connect(config.database, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
let db = mongoose.connection;

db.once('open', () => {
  console.log('connected to MLAB');
});

db.on('err', () => {
  console.log(err);
});

// const corsOptions = {
//   origin: 'http://localhost:8081',
// };

// app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

const Building = require('./models/Building');

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to bezkoder application.' });
});

app.get('/api', (req, res) => {
  Building.find({}, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
});

// app.post('/api/add', (req, res) => {
//     let building = new Building({
//         title: req.body.title,
//         description: req.body.description,
//         address: req.body.address,
//         links: [
//             {
//                 link: req.body.link
//             },
//         ],
//         type: req.body.type
//     })

//     building.save((err) => {
//         if(err) throw err;
//         res.send('ok');
//     })
// })

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
