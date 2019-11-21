require("dotenv").config();
var inquirer = require("inquirer");
var axios = require("axios");
var searchTopic = process.argv.slice(2).join(" ");
var printSearchResults = require('./printLists');
//var SaveBookToReadingList = require('./modules/saveSelections');
//make https request
var hitGoogleApi = {
    
    request: function (searchTopic, key) {
        var key = "AIzaSyC6R_GmQ8RAr0i49iP8DcPTQwxLyrjXEko";
        var searchTopic = process.argv.slice(2).join(" ");
        axios.get("https://www.googleapis.com/books/v1/volumes?q=" + searchTopic + "&key=" + key)
            .then(function (response) {

                printSearchResults.results(response);
                console.log("Select a book to save to the Reading List:");
                inquirer
                    .prompt([
                        {
                            type: "input",
                            name: "bookId",
                            message: "Enter the number of your selection",
                        }
                        
                    ])
                    .then(function (answer) {
    
                        if (answer.bookId >= 6) {
                            console.log("Please only enter a number from 1-5");
                        };
                        var bookSelectedToSavetoReadingList = (answer.bookId - 1);
                        // if (bookSelectedToSavetoReadingList >= 6) {
                        //     console.log("Please choose from selections 1-5");
                        //     //inquirer();
                        // };
                        var savedBook = response.data.items[bookSelectedToSavetoReadingList].volumeInfo.title;
    
                        console.log("\n");
                        console.log("You have chosen to save " + savedBook + " to the Reading list.");
                        console.log("\n");
                        console.log("\n");
                        if (typeof localStorage === "undefined" || localStorage === null) {
                            var LocalStorage = require('node-localstorage').LocalStorage;
                            localStorage = new LocalStorage('./scratch');
                        }
                        const savedBooks = JSON.parse(localStorage.getItem("savedBooks")) || [];
                        savedBooks.push(savedBook);
                        localStorage.setItem("savedBooks", JSON.stringify(savedBooks));
    
                        console.log("Reading List");
                        console.log("-----------------");
                        var theReadingList = localStorage.getItem("savedBooks");
                        console.log(JSON.parse(theReadingList));
    
    
                    }).catch(function (error) {
    
                        console.log("See error code below");
                        console.log(error);
    
                    })
                    .finally(function () {
                        console.log("Enjoy Your Reading!");
                    });

            })
    }
}




module.exports = hitGoogleApi
