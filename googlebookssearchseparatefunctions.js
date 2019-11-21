require("dotenv").config();
const API_KEY = process.env.API_KEY;

var inquirer = require("inquirer");
var axios = require("axios");

//GoogleBookSearch
askUserforSearchQuery();
makeHttpRequestToGoogleBooksApi (searchTopic, API_KEY);


//*GoogleBooksAPi function

function googleApiResponse() {
    // // Joining the remaining arguments since book name may contain spaces
    // var searchTopic = process.argv.slice(2).join(" ");
    // console.log("Hello,");
    // console.log("You have chosen to search for book titles containing the word: " + searchTopic + ".");
    // if (searchTopic === undefined) {

    //     console.log("You did not enter a proper search term for your book search. Please run the program again and enter a proper search term.");
    // }
    //*http request
    // axios.get("https://www.googleapis.com/books/v1/volumes?q=" + searchTopic + "&key=" + API_KEY)
    //     .then(function (response) {

    //         printQueryResults(response);

            // console.log("Select a book to save to the Reading List:");
            // inquirer
            //     .prompt([
            //         {
            //             type: "input",
            //             name: "bookId",
            //             message: "Enter the number of your selection",
            //         }

            //     ])
                .then(function (answer) {

                    if (answer.bookId >= 6) {
                        console.log("Please only enter a number from 1-5");
                        //inquirer();
                    };
                    var bookSelectedToSavetoReadingList = (answer.bookId - 1);
                    if (bookSelectedToSavetoReadingList >= 6) {
                        console.log("Please choose from selections 1-5");

                    };
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
//*fxn Command Center
// ask for search query function
function askUserforSearchQuery() {
    var searchTopic = process.argv.slice(2).join(" ");
    console.log("Hello,");
    console.log("You have chosen to search for book titles containing the word: " + searchTopic + ".");
    if (searchTopic === undefined) {

        console.log("You did not enter a proper search term for your book search. Please run the program again and enter a proper search term.");
    }
}
//make https request
function makeHttpRequestToGoogleBooksApi (searchTopic, API_KEY) {
    axios.get("https://www.googleapis.com/books/v1/volumes?q=" + searchTopic + "&key=" + API_KEY)
    .then(function (response) {
        printQueryResults(response);
        askReaderWhichBookToSaveToReadingList ();
}
,


// ask question function
function askReaderWhichBookToSaveToReadingList () {


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
            //inquirer();
        };
        var bookSelectedToSavetoReadingList = (answer.bookId - 1);
        if (bookSelectedToSavetoReadingList >= 6) {
            console.log("Please choose from selections 1-5");

        };
        var savedBook = response.data.items[bookSelectedToSavetoReadingList].volumeInfo.title;

}
}
// get answer function
function getAnswer (answer) {
    var bookSelectedToSavetoReadingList = (answer.bookId - 1);
}
//     error if answer is >5, return to ask question function
// save to Reading list function
// print reading list function

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
function negateSelectionsNotOffered(response) {

}
googleApiResponse();


