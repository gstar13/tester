var inquirer = require("inquirer");
var axios = require("axios");
var searchTopic = process.argv.slice(2).join(" ");
var printSearchResults = require('./printLists');
var printTheReadingList = require('./printLists');
var showSavedBook = require('./saveSelections.js');


//make https request
var hitGoogleApi = {

    request: function (searchTopic, key) {
        var key = "";
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

                        var bookSelectedToSavetoReadingList = (answer.bookId - 1);
                        var savedBook = response.data.items[bookSelectedToSavetoReadingList].volumeInfo.title;

                        showSavedBook.tellReaderWhatTheySaved(savedBook);


                        if (typeof localStorage === "undefined" || localStorage === null) {
                            var LocalStorage = require('node-localstorage').LocalStorage;
                            localStorage = new LocalStorage('./scratch');
                        }
                        const savedBooks = JSON.parse(localStorage.getItem("savedBooks")) || [];
                        savedBooks.push(savedBook);
                        localStorage.setItem("savedBooks", JSON.stringify(savedBooks));

                        printTheReadingList.ReadingList();

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

