//function center
//ask for search query--exported to inquirermodule
function askUserforSearchQuery() {
    var searchTopic = process.argv.slice(2).join(" ");
    console.log("Hello,");
    console.log("You have chosen to search for book titles containing the word: " + searchTopic + ".");
    if (searchTopic === undefined) {

        console.log("You did not enter a proper search term for your book search. Please run the program again and enter a proper search term.");
    }
}
//make https request--exported to httpRequest module
function makeHttpRequestToGoogleBooksApi(searchTopic, API_KEY, response, savedBook) {
    axios.get("https://www.googleapis.com/books/v1/volumes?q=" + searchTopic + "&key=" + API_KEY)
        .then(function (response) {

            printQueryResults(response);
            

        })
}
//print Query Results--exproted to printReadingList
function printQueryResults(response) {
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

}
//ask user to choose a book to save to the reading list--exported to inquirer
function getUsersChoiceToSaveToReadingList() {
    console.log("Select a book to save to the Reading List:");
    inquirer
        .prompt([
            {
                type: "input",
                name: "bookId",
                message: "Enter the number of your selection",
            }

        ])
        .then(function (answer, response) {
            saveTheBookSelection (response);
            pushBookToLocalStorageArray(savedBook);
            // var bookSelectedToSavetoReadingList = (answer.bookId - 1);
            // var savedBook = response.data.items[bookSelectedToSavetoReadingList].volumeInfo.title;

            // console.log("\n");
            //         console.log("You have chosen to save " + savedBook + " to the Reading list.");
            //         console.log("\n");
            //         console.log("\n");
            
        
        }).catch(function (error) {

            console.log("See error code below");
            console.log(error);

        })
        .finally(function () {
            console.log("Enjoy Your Reading!");
        });
            
        };

//save book to local storage--exported to saveSelections
function pushBookToLocalStorageArray(savedBook) {
    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
        console.log("hello");
        console.log(savedBook);
    }
    const savedBooks = JSON.parse(localStorage.getItem("savedBooks")) || [];
                    savedBooks.push(savedBook);
                    localStorage.setItem("savedBooks", JSON.stringify(savedBooks));
}
//print Reading List--exported to Print Reading List
function printReadingListToConsole (savedBooks) {
    console.log("Reading List");
                    console.log("-----------------");
                    var theReadingList = localStorage.getItem("savedBooks");
                    console.log(JSON.parse(theReadingList));
}
//save the book selection--exported to saveSelections.js
function saveTheBookSelection (response, answer, bookId){
    var bookSelectedToSavetoReadingList = (answer.bookId - 1);
    var savedBook = response.data.items[bookSelectedToSavetoReadingList].volumeInfo.title;

    console.log("\n");
            console.log("You have chosen to save " + savedBook + " to the Reading list.");
            console.log("\n");
            console.log("\n");
}