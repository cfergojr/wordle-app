const PORT = process.env.PORT || 5000;
const path = require('path');
const cool = require('cool-ascii-faces');
const axios = require("axios").default
const express = require("express")
const cors = require("cors")
require('dotenv').config()
const app = express()

app.use(cors())

app.get('/word', (req, res) => {
    const options = {
        method: 'GET',
        url: 'https://random-words5.p.rapidapi.com/getMultipleRandom',
        params: {count: '5', wordLength: '5'},
        headers: {
          'X-RapidAPI-Host': 'random-words5.p.rapidapi.com',
          'X-RapidAPI-Key': process.env.RAPID_API_KEY
        }
      }
      
      axios.request(options).then((response) => {
          console.log(response.data)
          res.json(response.data[0])
      }).catch((error) => {
          console.error(error);
      })
})


app.get('/check', (req, res) => {
  const word = req.query.word

  const options = {
    method: 'GET',
    url: 'https://twinword-word-graph-dictionary.p.rapidapi.com/association/',
    params: {entry: word},
    headers: {
      'X-RapidAPI-Host': 'twinword-word-graph-dictionary.p.rapidapi.com',
      'X-RapidAPI-Key': process.env.RAPID_API_KEY
    }
  }
  axios.request(options).then((response) => {
    console.log(response.data)
    res.json(response.data.result_msg)
  }).catch((error) => {
    console.error(error)
  })
})

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/cool', (req, res) => res.send(cool()))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));