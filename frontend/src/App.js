import React, { Component } from 'react';
import SearchField from './components/SearchField';
import FavoritesDisplay from './components/FavoritesDisplay';


class App extends Component { 
    
    render() {
     
      return (
          <div className="App">
            <link
              rel="stylesheet"
              href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" />
            
            <div className="row" style={{marginTop: '50px'}}>

              <div className="col-6">
                <h4>Search For Your Favorite Media</h4>
                <br/>
                <SearchField />
              </div>
              <div className="col-6">
                <h4>Your Favorites</h4>
                <br/>
                <FavoritesDisplay />
              </div>

            </div>
        </div>
      );
     
 }
 }


 export default App;
