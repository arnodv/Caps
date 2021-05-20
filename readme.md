## Installing, testing and running

After downloading the project to your local machine, use the command line to navigate to the project directory and run npm install.
After the first npm install cd into the frontend directory and run npm install.

Run npm start in the frontend directory and use a second command line to run npm test in the main project directory.
npm test can also be run in the frontend directory to perform a test there.

In the frontend directory, in the package.json file change "proxy": "https://dry-refuge-63595.herokuapp.com" to "proxy": "http://localhost:8080" and remove instances in fetch api's that contain https://dry-refuge-63595.herokuapp.com for local use.
Run npm start in both the main directory and the frontend directory to start the application for usage.


## Usage

When the app is opened two tables will be visible along with input fields and buttons.
The find input is where the user inserts their seach term and next to it the user selects a media type from the dropdown and click search to search.
When the list of search results is displayed a user can enter the number of the item they wish to add to favorites to the input box next to the add to favorites button and then click the button.
When the list of favorites is populated a user can enter the number of the item they wish to remove into the input box next to the remove button and then click the button to remove it


## Security

Helmet is being used as security in this app
Api keys are not being used as part of this app


## Application url

https://epic-ptolemy-ff5071.netlify.app/