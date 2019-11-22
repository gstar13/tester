//print Query Results
var printResults = {
    results: function printQueryResults(response) {
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

    },

    //print Reading List
    ReadingList: function printReadingListToConsole(savedBooks) {
        console.log("Reading List");
        console.log("-----------------");
        var theReadingList = localStorage.getItem("savedBooks");
        console.log(JSON.parse(theReadingList));
        console.log("Enjoy Your Reading!");


    }
}
module.exports = printResults
