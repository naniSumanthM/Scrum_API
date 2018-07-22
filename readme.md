CodeCards Base endpoint
https://secure-thicket-86307.herokuapp.com/

POST - Create account
https://secure-thicket-86307.herokuapp.com/users

headers

1.  email
2.  password

POST - login
https://secure-thicket-86307.herokuapp.com/users/login

headers

1.  JWT
2.  email
3.  password

DELETE - logout
https://secure-thicket-86307.herokuapp.com/users/me/token

headers

1.  JWT

POST - Create new userstory
https://secure-thicket-86307.herokuapp.com/userstories

headers

1.  JWT
2.  Title
3.  Description
4.  Status

GET - returns a list of userstories
https://secure-thicket-86307.herokuapp.com/userstories

headers

1.  JWT

GET - returns a list of userstories with a specified id
https://secure-thicket-86307.herokuapp.com/userstories/id

headers

1.  JWT
2.  ID

DELETE - deletes userstories from Mongo instance
https://secure-thicket-86307.herokuapp.com/userstories/id

headers

1.  JWT
2.  ID

PATCH/UPDATE - returns a list of userstories with a specified id
https://secure-thicket-86307.herokuapp.com/userstories/id

headers

1.  JWT
2.  title
3.  description
4.  Status
