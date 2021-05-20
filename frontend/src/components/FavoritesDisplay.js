import React, { useState } from "react";

//This function gets the array of favorites to display and creates a table row for each result in the array
export const getFavorites = () => {
    var favoritesTableBody = document.getElementById('favoritesTableBody');
    favoritesTableBody.innerHTML = '';
    fetch('https://dry-refuge-63595.herokuapp.com/favs')
      .then(res=>res.json())
      .then(results=>{
        results.forEach((element, index) => {
            let idValue = index + 1;
            favoritesTableBody.innerHTML += '<tr id="'+ idValue +'"><td>' + idValue + '</td><td>' + element.artistName + '</td><td>' + element.trackName + '</td><td>' + element.kind + '</td></tr>';
        });
      })
  }

  //had to include refresh button for incase
  const refreshFavorites = () => {
    getFavorites();
  }

const FavoritesDisplay = () => {

    //Set up the constants and their initial state
    const [favRemoveInput, setFavRemoveInput] =  useState('');
    
    //on input I set the state of the input
    const handleFavRemoveChange = (e) => {
        setFavRemoveInput(e.target.value)
    }

    //call the api function to delete a specific favorite entry
    const removeFromFavorites = () => {
        let favInput = document.getElementById('favRemoveInput').value;

        var url = 'https://dry-refuge-63595.herokuapp.com/?id=' + favInput + '';
          return fetch(url, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          })
        .then(response => response.json(),
        getFavorites());
    }
  
    //this is just where I render the div
    return( 
      <div>
        <div id="favoritessDiv" className="form-group">
            <button className="btn btn-secondary" onClick={() => refreshFavorites()}>Refresh</button>
            <input type="text" id="favRemoveInput" onChange={ handleFavRemoveChange } value={favRemoveInput}></input>
            <button className="btn btn-warning" onClick={() => removeFromFavorites()}>Remove From Favorites</button>
            <table className="table" id="favoritesTable">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Artist Name</th>
                        <th>Title</th>
                        <th>Media Type</th>
                    </tr>
                </thead>
                <tbody id="favoritesTableBody">

                 </tbody>
            </table>
        </div>
      </div>
    )
};

export default FavoritesDisplay;