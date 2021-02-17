
## Public Art in Texas

A full-stack Laravel React CRUD application with PHP backend and PostgreSQL database. 

Delpoyed online with Heroku: https://arcane-sands-92919.herokuapp.com/  
Developed with GitHub: https://github.com/Tinagrissom/public-art/

On load the user will view the name Public Art in Texas, with main functionality options below the title. An option to narrow the search of public art by selecting a city from a drop down menu. Each choice selected will load only the public art of that city. This was created with the manipulation of states in React, if the users input matches the state.location - the data will be displayed on the page. If this does not match, it will not load.  A "back to all art" button is visible and when clicked will esentially refresh the page view to include all art in Texas once again. 

Styled with flexbox, this app is scaleable for various sized screens.

## /admin - to access CRUD routes
A secret admin route will reveal the CRUD capabilities of the app. Type '/admin' at the end of the url to be taken to a visually similar but fully editable replication of the app. 

The top left corner features a button "Add Works" that when clicked will open a moadl. A form section will allow admin to add new public art to the page, with inputs for Artist, Title, Location, and Image.

Once the entry is entered it will load at the bottom after the entries made before it.

Admin can edit and delete all entries using the "Remove" button, and by clicking the "Edit" drop-down.


## Wins/Struggles and if I had more time
- Tackling a new language for the backend - PHP but there's still more to learn!
- I struggled getting a certain feature to work. I wanted to make the photos clickable so the user could view full-screen - but could not get this working.
- Finguring out how to add the secret admin route and functionality was a big win.

- If I had more time, AND POWER!, I would have added a link to each art list that would take the user to a separate google page with directions to the site of the art.
- I would have finished my mobile styling.




<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400"></a></p>






