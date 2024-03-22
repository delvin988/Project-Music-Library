# Music library Documentation

&nbsp;

## Models :

_User_
```
- username: string, required
- email: string, required, unique
- password: string, required
- role: string, required, default "Member"
```

_Favourite_
```
- artistName: string, required
- genres: string, required
- imgUrl: text, required
- album: string, required
- title: string, required
- preview: string, required
- lyric: text
- UserId: integer, required
```

_Order_
```
- amount: string
- status: string
- paiDate: date
- UserrId: integer, required
- orderId: integer
```

&nbsp;

## Endpoints :

List of available endpoints :

- `POST /register`
- `POST /login`
- `POST /google-login`

And routes below need authentication :

- `PATCH /users/me/upgrade`
- `GET /payment/midtrans/initiate`

Routes below need authentication & authorization :

- `GET /favourite`
- `POST /favourite`
- `DELETE /favourite/:id`

&nbsp;

## 1. POST /login

Request:

- body:
```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "Success Login",
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "error invalid username or email or password"
}
```

&nbsp;

## 2. POST /register

Request:

- body:
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_
```json
{
    "data": {
        "username": "string",
        "email": "string",
        "role": "string"
    }
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"  
}
OR
{
  "message": "password is required"
}
OR
{
  "message": "Email already exists"
}
OR
{
  "message": "Password must be at least 5 characters long"
}
OR
{
  "message": "role is required"
}
```

&nbsp;

## 3. GET /favourite

- Description:
    - Get all favourite music thats already added
    - Authorization : Premium role

Request:
- headers: 
```json
{
  "authorization": "Bearer <token>"
}
```

_Response (200 - OK)_
```json
[
    {
        "id": "integer",
        "artistName": "string",
        "genres": "string",
        "imgUrl": "text",
        "album": "string",
        "title": "string",
        "preview": "string",
        "lyric": "text",
        "UserId": "integer",
        "createdAt": "date",
        "updatedAt": "date"
    }
    ...,
]
```

## 4. POST /favourite

Description:
- Create favourite 
- Authorization : Premium role

Request:

- headers: 
```json
{
  "authorization": "Bearer <token>"
}
```
- body:
```json
{
    "artistName": "string",
    "genres": "string",
    "imgUrl": "text",
    "album": "string",
    "title": "string",
    "preview": "string",
    "lyric": "text",
}
```

_Response (200 - OK)_
```json
  {
    "artistName": "string",
    "genres": "string",
    "imgUrl": "text",
    "album": "string",
    "title": "string",
    "preview": "string",
    "lyric": "text",
    "UserId": "integer"
  }
```

_Response (409 - Conflict)_
```json
{
  "message": "This song is already in favorites"
}
```
_Response (403 - Forbidden)_
```json
{
  "message": "Only premium member can add to favourite"
}
```

&nbsp;


## 5. DELETE /favourite/:id

Description: 
- Delete favourite by id
- Authorization : Premium role

Request:

- headers: 
```json
{
  "authorization": "Bearer <token>"
}
```

- params:
```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_
```json
{
  "message": "success to delete"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "error not found"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Only premium member can add to favourite"
}
```

&nbsp;




&nbsp;



## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
