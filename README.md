# personal_finance_manager
Private Finance Tracker for people to set up on their servers and start tracking their finances without worrying about privacy issues.

### To Run
1. create a `config.js` in the root folder of the project with:
```
module.exports = {
	url: "http://localhost:3400/",
	username: "username",
	password: "password",
	secret: "some_secret_string",
	db : {
		url:"url of ur postgres db",
		db_name: "name of db",
		db_username: "db username (make it diff from username pls)",
		db_password: "db password (make it diff from password pls)"
n}
```
Where the values of these can be whatever you want them to be. If you need help with Postgres adding users and databases, look below for info.

2. npm install -g webpack
3. npm install
4. npm run start:prod
5. go to whatever your `url` in `config.js` is set to and voila

### Creating DB and users in postgres
```
psql
CREATE DATABASE db_name
CREATE USER db_username WITH PASSWORD 'db_password';
template1=# GRANT ALL PRIVILEGES ON DATABASE "db_name" to db_username;
template1=# \q
```

## Task List
MVP 1.0:
- ~~Auth~~
- ~~Models~~
- ~~Routes~~
- Front End
- Import CSV -> add

### TODOs
Higher Priority Tasks
- Use MobX/Redux
- Get rid of this bootstrappy look

Lower Priority Tasks
- More Account Types
- More Currency Types
- Better auth with sessions?

## Models
Record
- [UUID] id
- [tags] tagId
	- default personal
- [account] accountID
- [varchar(256)] name
- [double] amount
- [date] transaction date
	- default today
- [varchar(256)] notes
- [int] split with
	- default 0 

Tags
- [UUID] id
- [UUID] parentTag
- [varchar(256)] name

Account
- [UUID] id
- [varchar(256)] name
- [ENUM] type 
	- DEBIT
	- CREDIT
	- OTHER
- [ENUM] currencyType
	- USD
	- CAD

### Routes
- Record -> CRUD
- /record/:id/<from>/<to>

- Tag -> CRUD
	- DELETE need to move current records over to another tag!
- /tag/:id/<from>/<to>

- Account -> CRUD
