require("dotenv").config();
const API_KEY = process.env.API_KEY;
var inquirer = require("inquirer");
var axios = require("axios");

//GoogleBooksAPi function
function googleApiResponse() {
    // Joining the remaining arguments since book name may contain spaces
    var searchTopic = process.argv.slice(2).join(" ");
    console.log("Hello,");
    console.log("You have chosen to search for book titles containing the word: " + searchTopic + ".");
    if (searchTopic === undefined) {
        var searchTopic = "Gray's Anatomy";
        console.log("The topic was undefined");
    }
    //http request
    axios.get("https://www.googleapis.com/books/v1/volumes?q=" + searchTopic + "&key=" + API_KEY)
        .then(function (response) {

            printQueryResults(response);

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
        });
};
//fxn Command Center
function printQueryResults(response) {
    for (var i = 0; i < 5; i++) {
        var item = response.data.items[i].volumeInfo;
        console.log((i + 1) + ".");
        console.log("Title: " + item.title);
        console.log("Author: " + item.authors);
        console.log("Publishing Company: " + item.publisher);
        console.log("--------------------------------------");
        console.log("\n");
    }
}
googleApiResponse();


