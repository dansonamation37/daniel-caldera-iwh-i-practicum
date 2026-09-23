require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PRIVATE_APP_ACCESS = process.env.PRIVATE_APP_ACCESS;
const OBJECT_TYPE = process.env.CUSTOM_OBJECT_TYPE;
const headers = {
    Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
    'Content-Type': 'application/json'
};

//
app.get('/update-cobj', (req, res) => {
  res.render('updates', {
    title: 'Update Custom Object Form | Integrating With HubSpot I Practicum'
  });
});

app.post('/update-cobj', async (req, res) => {
  const newRecord = {
    properties: {
      name: req.body.name,
      performer_name: req.body.performer_name,
      genre: req.body.genre,
      audience_size: req.body.audience_size
    }
  };
  try {
    await axios.post(`https://api.hubapi.com/crm/v3/objects/${OBJECT_TYPE}`, newRecord, { headers });
    res.redirect('/');
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    res.status(500).send('Error creating record');
  }
});
//

app.listen(3000, () => console.log('Listening on http://localhost:3000'));