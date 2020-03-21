// In the previous lesson, Introduction to Express you built an Express server that served up a list of Playstore apps and provided sorting and filtering option. Refactor that server to prepare it for testing then write tests using Mocha, Chai, and SuperTest to adequately test the endpoints that you have written.

const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(morgan('common'))

const games = require('./playstore.js');

app.get('/apps',(req,res)=>{
    
    const { sort = "", genre = "" } = req.query;

    // sort by rating or app, if not provided, don't sort
    
    if(sort){
      let sortString = sort.toLowerCase();
      if(!['rating', 'app'].includes(sortString)){
        return res 
          .status(400)
          .send('Sort must be one of rating or app')
      }
    }


    // filter by genre if provided, it must be one of the following: 'Action','Puzzle','Strategy','Casual','Arcade','Card'
    let genreFilter = genre.toLowerCase()
    if(genreFilter){
      if(!['action','puzzle','strategy','casual','arcade','card'].includes(genreFilter)){
        return res 
          .status(400)
          .send('Filter genre must be one of the following: Action, Puzzle, Strategy, Casual, Arcade, Card')
      }
    }
    if(!genre && !sort){
      res
        .json(games)
    }
    
    let results = games
      .filter(game =>
        game
          .Genres
          .toLocaleLowerCase()
          .includes(genre.toLowerCase()));
    

    if(sort){
      let sortString = sort.toLowerCase();
      let altSort = sortString.charAt(0).toUpperCase()+sortString.slice(1)
      console.log(altSort)
      if(altSort === 'Rating'){
        results
          .sort((a, b) => {
            return b[altSort] > a[altSort] ? 1 : b[altSort] < a[altSort] ? -1 : 0;
        });
        }    

      if(altSort === 'App'){
        results
          .sort((a, b) => {
            return a[altSort] > b[altSort] ? 1 : a[altSort] < b[altSort] ? -1 : 0;
        });
      }

    }
      
    res
      .json(results)
})

module.exports = app;