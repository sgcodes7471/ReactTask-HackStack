In the project directory:


How To RUN???
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
if something else is running on this port then it will automatically ask you if you want it to run on some other port.

The page will reload when you make changes.\
You may also see any lint errors in the console.


### About the Project

The task project uses API's from Accuweather. You can replace the Api Keys in the App.js line 84 and 101 with your own api key.
The fetching of api is made asynchronous by async-await

useContext, useState , useEffect are the hooks majorly used

I have also used several svg files, put in the assests folder


### What's in it?

The webpage has a simple UI with the ability to switch between dark and light mode. This has been done using state variable 'dark'.
Further dark variable has been utilized in inline css for colour schemes
You can alter between the modes manually by small icon on the left of search bar
Also note that based on the time of your system, the default mode is adjusted to be dark from 6pm to 6am.

In the api fetch, I store some specific information in the state varible and the main icon chnages based on the weather condition.
also the temperature icon chnages based on the how high the temperature is!

In the last portion of the webpage, there are sometimes small suggestions based on the weather conditions. To know in more detail refer to /Components/detailsSection.js

React-toastify has been used to somecases error messages and proccessing messages.

A proper error handling has been done in try catch block, Users cannot search with a  empty seacrh bar and also not wrong cities.


### what's the catch?
The Accuweather api presumably allows only 50 fetches at max in the span of 24hours for their current conditions api

