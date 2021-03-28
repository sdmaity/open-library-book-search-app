# Getting Started with Open Library Book search App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

You need to have node js and npm installed in your machine for runnig this app. Go to [node js website](https://nodejs.org/en/) and download & install the stable version if not already installed in the machine.

After downloading the repository from git to local machine, navigate to the app folder in cmd and run

### `npm install`

For installing any additional dependency

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view the app in the browser.


## `Resources - Open Library API`
Using [Open Library API](https://openlibrary.org/developers/api) for fetching data when searching

### Description
After starting the app a page containing input box and search button will open in the localhost path. After entering input in the fields and clicking search it will show a list of books with similar titles in a table format. It shows 10 rows in a single page. Pagination is enabled and available at the bottom of the page. By clicking next and previous you can navigate the list. Currently we are searching by book title only but It can be expanded into more complex way where user can choose and search books by author name, text, subjects etc.

To know more about the api used for fetching go to [this openlibrary link](https://openlibrary.org/dev/docs/api/search).
We are sending title and page number as parameter in the api call.