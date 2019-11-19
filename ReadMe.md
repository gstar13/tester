This command line program will ask the user for a search term, pull 5 books with that term in the title from the Google Books website, print them and ask the user which one they would like to save. Then that selection is saved in local storage and all queries are then printed for the reader to view.
In order to run this program you must have your own googlebooks API key to insert into the .env file. You can get this at https://developers.google.com/books You must have a googleaccount to acquire an API key. Once you have one, go to the 'Using the API' tab and scroll down to the 'To acquire an API key' section. It will instruct you to go the the credentials page (https://console.developers.google.com/apis/credentials) where you can create credentials and you will receive an API Key.


Once you have your API key:

1) Fork the git file into your git repo, copy the HTTPS address found under the 'Clone or Download' button on the top right of your new repo. 
2) Create a folder in your harddrive labeled GoogleBookSearch. CD into that folder from the command line and pull the git file into it using the command 'git clone' followed by the HTTPS address that you just copied onto your clipboard.

3)Still in your GoogleSearch folder, install the required npm packages one at a time by typing (without the quotation marks):
a) 'npm install inquirer' and then press enter. This will install the required npm package. Once complete install the next package.
b) 'npm install axios' then press enter. This will install the required npm package.
This will give you all the npm packages needed to run the program.

4) Copy and paste your api key into the .env file and you should be ready to run the program.

5) To run the program, type--without the quotes-- "node googlebookssearch.js" followed by your book search topic ie "history" and press enter. This should look like : node googlebookssearch.js history

This will give you a numbered list of 5 book titles, along with their author and publisher, with the word 'history' in the title.

5)Viola! Follow the prompt and enter the number of the selection (1-5) you would like to save.

The program will then inform you of which book title you have chosen to save and will list it for you under the heading 'Reading List'.
This is the end of the program but all of your selections are saved in the local storage and will continue to be displayed on your reading list along with the new book you have chosen to save each time you run the program.

