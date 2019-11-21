var inquirer = require("inquirer");
//ask user to choose a book to save to the reading list-should be two functions 1)get userchoice and 2)save to readinglist
var GetBookToSave = {
    whichBook: function (response, answer) {
        console.log("Select a book to save to the Reading List:");
        inquirer
            .prompt([
                {
                    type: "input",
                    name: "answer.bookId",
                    message: "Enter the number of your selection",
                }

            ])
            .then(function (answer, response) {
                //saveTheBookSelection (response);
                //pushBookToLocalStorageArray(savedBook);
                console.log(answer +"answer");
                console.log(response+"hi");
                
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

    }
}

module.exports = GetBookToSave
