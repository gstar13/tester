//save the book selection
var BookSaving ={
    saveTheBookSelection: function  (response, answer, bookId){
    var bookSelectedToSavetoReadingList = (answer.bookId - 1);
    var savedBook = response.data.items[bookSelectedToSavetoReadingList].volumeInfo.title;

    console.log("\n");
            console.log("You have chosen to save " + savedBook + " to the Reading list.");
            console.log("\n");
            console.log("\n");
},

//save book to local storage
pushBookToLocalStorageArray:function (savedBook) {
    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
        console.log("hello");
        console.log(savedBook);
    }
    const savedBooks = JSON.parse(localStorage.getItem("savedBooks")) || [];
                    savedBooks.push(savedBook);
                    localStorage.setItem("savedBooks", JSON.stringify(savedBooks));
},
 onlyFive: function (answer) {
    if (answer.bookId >= 6) {
        console.log("Please only enter a number from 1-5");
        //call httprequest again here
    };
}
}




module.exports = BookSaving