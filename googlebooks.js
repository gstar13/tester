require("dotenv").config();
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
    axios.get("https://www.googleapis.com/books/v1/volumes?q=" + searchTopic + "&key=AIzaSyC6R_GmQ8RAr0i49iP8DcPTQwxLyrjXEko")
        .then(function (response) {

            for (var i = 0; i < 5; i++) {
                var item = response.data.items[i].volumeInfo;

                console.log("\n");
                console.log((i + 1) + ".");
                console.log("Title: " + item.title);
                console.log("Author: " + item.authors);
                console.log("Publishing Company: " + item.publisher);
                console.log("--------------------------------------");
                console.log("\n");
            }
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

                    var bookSelection = parseInt(answer.bookId);
                    var bookSelected = (bookSelection - 1);

                    var savedBook = response.data.items[bookSelected].volumeInfo.title;
                    console.log("\n");
                    console.log("You have chosen to save " + savedBook + " to the Reading list.");
                    console.log("\n");
                    console.log("\n");
                    if (typeof localStorage === "undefined" || localStorage === null) {
                        var LocalStorage = require('node-localstorage').LocalStorage;
                        localStorage = new LocalStorage('./scratch');
                    }
                    localStorage.setItem("savedBooks"[0], savedBook);
                    console.log("Reading List");
                    console.log("-----------------");
                    console.log(localStorage.getItem("savedBooks"[0]));
                    console.log(localStorage.getItem("savedBooks"[1]));
                    console.log(localStorage.getItem("savedBooks"[2]));

                }).catch(function (error) {

                    console.log("See error code below");
                    console.log(error);

                })
                .finally(function () {

                    console.log("Enjoy Your Reading!");
                });
        });
};

googleApiResponse();


