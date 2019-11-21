var myLogModule= require('./modules/yes.js');
var myQueryFunction = require('./modules/inquirer.js');
var myHttpRequest = require('./modules/httpRequest.js');

//Run Program
myLogModule.info('Node.js started');
myQueryFunction.searchTerm();
myHttpRequest.request();
//SaveBookToReadingList.whichBook();


