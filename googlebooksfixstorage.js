require("dotenv").config();
var inquirer = require("inquirer");
var axios = require("axios");
//fxn center
// function printReadingList() {
//     for (var i = 0; i < 5; i++) {
//         var item = response.data.items[i].volumeInfo;

//         console.log("\n");
//         console.log((i + 1) + ".");
//         console.log("Title: " + item.title);
//         console.log("Author: " + item.authors);
//         console.log("Publishing Company: " + item.publisher);
//         console.log("--------------------------------------");
//         console.log("\n");
//     }
// }
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
            //printReadingList();
            for (var i = 0; i < 5; i++) {
                var item = response.data.items[i].volumeInfo;
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

                    //var bookSelection = parseInt(answer.bookId);
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
                    localStorage.setItem("ReadingList", savedBook);
                    console.log("Reading List");
                    console.log("-----------------");
                    console.log("hi1" + localStorage.getItem("ReadingList"));
                    console.log(localStorage);
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


 //         }
//i think all we need to do is get the localStorage.length into a variable , make that the key pair of where the item is stored in thea rrat
//then print /console.log the whole list of local storage . length. took this out cuz node was crashing but i think i t is the internet here.


            //     ,);
            // console.log(localStorage.length);
            // for (var i = 0; i < ((localStorage.length) + 1); i++) {
            //     console.log("Reading List");
            //     console.log("-----------------");
            //     console.log(localStorage.getItem("savedBooks"[i]));

            //}