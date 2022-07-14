# CESMP (Cooperative Emergency Supply Management and Planning)

### Description
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An emergency management hub. Where we do research, data distribution, and planning in three core areas: law, policy, and strategy.

### Why you should use CESMP?
* Ensuring secure E2E
* Simple & Intuitive UI
* Realtime Cooperative Document Editing
* Library to store relevant documentation


### Technologies used
* ReactJS
* JavaScript
* Express

<br>

## Getting Started
___
### What you will need
* A running instance of a DB (Postgres, SQLlite, MYSQL)
* A server to host the package

### Setup
1. Clone repo
2. npm install (inside both /webite and /server)
3. create .env file if one does not already exist
4. .env file inside /server should contain the following: <br>
`PORT = 3001`<br>
`SOCKET = 3002`<br>
`DATABASE_URI = mongodb://url:port/db name`<br>
`ACCESS_TOKEN_SECRET = SUPER SECRET`<br>
`ACCESS_TOKEN_AGE = 2min`<br>
`REFRESH_TOKEN_SECRET = SUPER SECRET`<br>
`REFRESH_TOKEN_AGE = 1d`
5. Run dev server from /server: <br>
`npm run dev`
6. Run dev website from /website <br>
5. Run dev server: <br>
`npm run start`

<br>

## Screenshots
___
<p>https://url.com</p>
<img src='./imgs/Home Page.png'/>
<hr/>
<p>https://url.com/libary</p>
<img src='./imgs/Library Default Page.png'/>
<hr/>
<p>https://url.com/libary (view with some filters)</p>
<img src='./imgs/Library Filter Page.png'/>
<hr/>
<p>https://url.com/library (view of the create publication button)</p>
<img src='./imgs/Create Article Page.png'/>
<hr/>
<p>https://url.com/libary/publication (view of a published article)</p>
<img src='./imgs/Article Page.png'/>
<hr/>
<p>https://url.com/folder (view of all the documents editable by a user)</p>
<img src='./imgs/Folder Page.png'/>
<hr/>
<p>https://url.com/doc (view of what a user can see when editing a publication)</p>
<img src='./imgs/Edit Article Page.png'/>
<hr/>

<br>

## TODO
___
- [ ] pagination: Limit number of publications to 25 per page
- [ ] register: Have a system to allow users to register with website
- [ ] publication: Allow user to add publication information
- [ ] research: Create a list of on-going projects
- [ ] plan: create a way for users to supply information and return a list of equipment needed in case of an emergency
- [ ] libary: make the search bar functional
