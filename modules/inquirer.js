//ask for search query
var askFirstQuestion = {
    searchTerm: function askUserforSearchQuery() {
        var searchTopic = process.argv.slice(2).join(" ");
        console.log("Hello,");
        console.log("You have chosen to search for book titles containing the word: " + searchTopic + ".");
        if (searchTopic === undefined) {

            console.log("You did not enter a proper search term for your book search. Please run the program again and enter a proper search term.");
        }
    }
}







module.exports = askFirstQuestion

