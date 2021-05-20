import React, { useState } from "react";
import {getFavorites} from './FavoritesDisplay';

const SearchField = () => {

    //Set up the constants and their initial state
    const [searchbarInput, setSearchbarInput] =  useState('');
    const [mediaTypeInput, setMediaTypeInput] =  useState('');
    const [favbarInput, setFavbarInput] =  useState('');
    
    //on input I set the state of the input
    const handleSearchBarChange = (e) => {
        setSearchbarInput(e.target.value)
    }
    const handleMediaTypeChange = (e) => {
        setMediaTypeInput(e.target.value)
    }
    const handleFavChange = (e) => {
        setFavbarInput(e.target.value)
    }

    //here I call the api function that adds an entry to the favorites
    const addToFavorites = () => {
        let favInput = document.getElementById('favInput').value;
        let data = document.getElementById(favInput).attributes.value.value;

        var url = '/?data=' + data + '';
          return fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          })
        .then(response => response.json(),
        getFavorites());
    }

    //I do a fetch based on the search term and then thereafter filter the results to remove any spaces or characters that interfere with the app backend and then build the table row
    const doSearch = () => {
        let searchTerm = document.getElementById('searchTerm').value.replace(" ", "+");
        let searchMedia = document.getElementById('mediaSelect').value;
        let resultsTable = document.getElementById('tableBody');
        resultsTable.innerHTML = '';

        var url = 'https://itunes.apple.com/search?term=' + searchTerm +'&media=' + searchMedia +  '&limit=25';
          return fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then(response => response.json()
            .then(results=>{
                console.log(results);
                results.results.forEach((element, index) => {
                    let names = '';
                    let track = '';
                    let type = '';
                    if(element.artistName == undefined){
                        element.artistName = 'undefined';
                    } else {
                        names = element.artistName.replaceAll(" ", "+");
                        names = names.replaceAll("&", "and");
                    }
                    if(element.trackName == undefined){
                        element.trackName = 'undefined';
                    } else {
                        track = element.trackName.replaceAll(" ", "+");
                        track = track.replaceAll("&", "and");
                    }
                    if(element.kind == undefined){
                        element.kind = 'undefined';
                    } else {
                        type = element.kind.replaceAll(" ", "+");
                        type = type.replaceAll("&", "and");
                    }
                    let idValue = index + 1;
                    let resultArray = [names, track, type];
                    let resultValue = resultArray.join('|');
                    resultsTable.innerHTML += '<tr id="'+ idValue +'" value=' + resultValue + '><td>' + idValue + '</td><td>' + element.artistName + '</td><td>' + element.trackName + '</td><td>' + element.kind + '</td></tr>';
                });
              }));
      }
  
    //this is just where I render the div
    return( 
      <div>
            <div className="form-group">
                <label>Find</label>
                <input type="text" id="searchTerm" onChange={ handleSearchBarChange } value={searchbarInput}></input>
                <select id="mediaSelect" onChange={ handleMediaTypeChange } value={mediaTypeInput}>
                    <option value="all">All</option>
                    <option value="audiobook">Audiobook</option>
                    <option value="ebook">Ebook</option>
                    <option value="movie">Movie</option>
                    <option value="music">Music</option>
                    <option value="musicVideo">Music Video</option>
                    <option value="podcast">Podcast</option>
                    <option value="shortFilm">Shortfilm</option>
                    <option value="software">Software</option>
                    <option value="tvShow">Tv Show</option>
                </select>
                <button className="btn btn-primary" onClick={() => doSearch()} style={{marginRight:'10px'}}>Search</button>

                <input type="text" id="favInput" onChange={ handleFavChange } value={favbarInput}></input>
                <button className="btn btn-success" onClick={() => addToFavorites()}>Add To Favorites</button>
            </div>
            <div id="resultsDiv">
                <table className="table" id="resultsTable">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Artist Name</th>
                            <th>Title</th>
                            <th>Media Type</th>
                        </tr>
                    </thead>
                    <tbody id="tableBody">

                    </tbody>
                </table>
            </div>
      </div>
    )
};

export default SearchField;