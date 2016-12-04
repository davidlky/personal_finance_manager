# personal_finance_manager
Private Finance Tracker for people to set up on their servers and start tracking their finances without worrying about privacy issues.


## Task List
MVP 1.0:
- ~~Auth~~
- Models
- Routes
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
