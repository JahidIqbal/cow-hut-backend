# cow-hut-backend-project
<p>This is a fully backend project built with Node.js. You can test the API using Postman.</p>

# live link
https://cow-hut-backend-project.vercel.app/

# Features

- Admin routes for creating admins and login functionality.
- JWT authentication with Bcrypt for secure user login and token refresh.
- Role-based access control middleware for route protection.
- Routes for managing users, cows, and orders with appropriate permissions.

# API Endpoint 

## Auth (User)
<li>Route: https://cow-hut-backend-project.vercel.app/api/v1/auth/login (POST) </li>
<li>Route: https://cow-hut-backend-project.vercel.app/api/v1/auth/signup (POST)</li>
<li>Route: https://cow-hut-backend-project.vercel.app/api/v1/auth/refresh-token (POST)</li>

# Auth (Admin)
<li>Route: https://cow-hut-backend-project.vercel.app/api/v1/admins/create-admin (POST)</li>
<li>Route: https://cow-hut-backend-project.vercel.app/api/v1/admins/login (POST)</li>

# User
<li>Route: https://cow-hut-backend-project.vercel.app/api/v1/users (GET) Include an id that is saved in your database</li>
<li>Route: https://cow-hut-backend-project.vercel.app/api/v1/users/6177a5b87d32123f08d2f5d4 (Single GET) Include an id that is saved in your database</li>
<li>Route: https://cow-hut-backend-project.vercel.app/api/v1/users/6177a5b87d32123f08d2f5d4 (PATCH) Include an id that is saved in your database</li>
<li>Route: https://cow-hut-backend-project.vercel.app/api/v1/users/6177a5b87d32123f08d2f5d4 (DELETE) Include an id that is saved in your database</li>

# Cows
<li>Route: https://cow-hut-backend-project.vercel.app/api/v1/cows (POST)
<li>Route: https://cow-hut-backend-project.vercel.app/api/v1/cows (GET)
<li>Route: https://cow-hut-backend-project.vercel.app/api/v1/cows/6177a5b87d32123f08d2f5d4 (Single GET) Include an id that is saved in your database</li>
<li>Route: https://cow-hut-backend-project.vercel.app/api/v1/cows/6177a5b87d32123f08d2f5d4 (PATCH) Include an id that is saved in your database</li>
<li>Route: https://cow-hut-backend-project.vercel.app/api/v1/cows/6177a5b87d32123f08d2f5d4 (DELETE) Include an id that is saved in your database</li>

# Orders
<li>Route: https://cow-hut-backend-project.vercel.app/api/v1/orders (POST)</li>
<li>Route: https://cow-hut-backend-project.vercel.app/api/v1/orders (GET)</li>

## Admin
<li>-Route: https://cow-hut-backend-project.vercel.app/api/v1/admins/create-admin (POST)</li>

# My Profile
<li>Route: https://cow-hut-backend-project.vercel.app/api/v1/users/my-profile (GET)</li>
<li>Route: https://cow-hut-backend-project.vercel.app/api/v1/users/my-profile (PATCH)</li>

# Order:
<li>Route: https://cow-hut-backend-project.vercel.app/api/v1/orders/6177a5b87d32123f08d2f5d4 (GET)</li>


# Request Body and Responses and some important Instructions

#### Admin Routes :

Route: /api/v1/admins/create-admin (POST)

Request body: 
 ```json
 {
  "password":"amiadminbujheshunekothakoiyo",
  "role": "admin",
   "name":{
      "firstName": "Mr. Admin"
      "lastName": "Bhai"
    },
  "phoneNumber":"01711111111",
  "address": "Uganda",
}
```
Response: The newly created admin object. ( Do not send the password in response )
Response Sample Pattern:

```json
{
    "success": true, 
    "statusCode":200,
    "message": "Admin created successfully",
    "data":  {
        "_id":"ObjectId(“6473c6a50c56d0d40b9bb6a3)",  
        "role": "admin",
        "name":{
           "firstName": "Mr. Admin"
           "lastName": "Bhai"
         },
          "phoneNumber":"01711111111",
          "address": "Uganda",
         }
     }

```


Route: /api/v1/admins/login (POST)

Request body: 
 ```json
 {
   "phoneNumber":"01711111111",
   "password": "amiadmin",
}
```
Response: The created access token for the admin.
 
 Response Sample Pattern:
```json

{
    "success": true, 
    "statusCode":200,
    "message": "User logged in successfully",
    "data": {
       "accessToken":  "eyJhbGciOiJIUzI1NiICJ9.eyJ1c2V4NzIzMTcxNCwiZXhwIjoxNjg3MzE4MTE0fQ.Q7j8vtY9r1JeDK_zR6bYInlY", 
       }
  }
```

## Implement Custom Authentication using bcrypt and JWT

Route:  /api/v1/auth/login (POST)
Request body:
 ```json
 {
  "phoneNumber":"01711111111",
  "password":"amiuserasbuyerasseller",
}
```
 
 Response: The created access token for the user.
 
 Response Sample Pattern:
```json

{
    "success": true, 
    "statusCode":200,
    "message": "User logged in successfully",
    "data": {
       "accessToken":  "eyJhbGciOiJIUzI1NiICJ9.eyJ1c2V4NzIzMTcxNCwiZXhwIjoxNjg3MzE4MTE0fQ.Q7j8vtY9r1JeDK_zR6bYInlY", 
       }
  }
```

###  Get Refresh Token

Route:  /api/v1/auth/refresh-token (POST)

Response: The created access token for the user.
 
 Response Sample Pattern:
```json

{
    "success": true, 
    "statusCode":200,
    "message": "New access token generated successfully !",
    "data": {
       "accessToken":  "eyJhbGciOiJIUzI1NiICJ9.eyJ1c2V4NzIzMTcxNCwiZXhwIjoxNjg3MzE4MTE0fQ.Q7j8vtY9r1JeDK_zR6bYInlY", 
       }
  }
```

### You need to implement an authentication middleware to verify the user's token and role before granting access to the following routes.

#### User
  
   - api/v1/users (GET) → Can only be accessed by admin
   - api/v1/users/:id (Single GET) → Can only be accessed by admin
   - api/v1/users/:id (PATCH) → Can only be accessed by admin
   - api/v1/users/:id (DELETE) → Can only be accessed  by admin
     
   #### Cows
   
   - api/v1/cows (POST) → Can only be accessed by seller
   - api/v1/cows (GET) → Can only be accessed by buyer,seller & admin
   - api/v1/cows/:id (Single GET) → Can only be accessed by buyer,seller & admin


   - api/v1/cows/:id (PATCH) → Can only be accessed by the seller of the cow
   - api/v1/cows/:id (DELETE) → Can only be accessed by the seller of the cow


### Create Profile 

Route:  /api/v1/users/my-profile (GET)

Request Headers: "authorization": "Your access token"

Response: The specified user's profile information
Response Sample Pattern:

```json
  {
    "success": true, 
    "statusCode":200,
    "message": "User's information retrieved successfully",
    "data": {
      "name": {
         "firstName": "Mr. Admin"
         "lastName": "Bhai"
      },
     "phoneNumber":"01711111111",
     "address": "Uganda",
    }, 
  }
```

#### Update Profile Information (Must be dynamic update)

Route:  /api/v1/users/my-profile (PATCH)

Request Headers: authorization: "Your access token"
Request body:
 ```json
 {
  "password":"mydreamwife",
   "name":{
      "firstName": "Mr. Update Password"
      "lastName": "Bhai"
    },
  "phoneNumber":"01711111111",
  "address": "Namibia",
}
```

Response: The specified user's updated profile information
Response Sample Pattern:

```json
  {
    "success": true, 
    "statusCode":200,
    "message": "User's information retrieved successfully",
    "data": {
      "name": {
         "firstName": "Mr. Admin"
         "lastName": "Bhai"
      },
     "phoneNumber":"01711111111",
     "address": "Uganda",
    }, 
  }
```

## Get a Specific Order Route
 
Route:   api/v1/orders/:id (GET)
Request Param: order's _id

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Order information retrieved successfully",
  "data": {
    "cow": {
      "_id": "60cd9f2e1e1d8e001f165d23",
      "id": "60cd9f2e1e1d8e001f165d23",
      "name": "Bella",
      "age": 4,
      "price": 5000,
      "location": "Dhaka",
      "breed": "Brahman",
      "weight": 400,
      "label": "for sale",
      "category": "Beef",
           "seller": {
           "_id": "60cd9f2e1e1d8e001f165d21",
           "id": "60cd9f2e1e1d8e001f165d21",
           "role": "buyer",
           "name": {
          "firstName": "Kopa",
          "lastName": "Samsu"
           },
         "phoneNumber": "01711111111",
         "address": "Chattogram",
         "budget": 30000,
         "income": 0
       }
   }
    },
    "buyer": {
      "_id": "60cd9f2e1e1d8e001f165d24",
      "id": "60cd9f2e1e1d8e001f165d24",
      "role": "buyer",
      "name": {
        "firstName": "Kopa",
        "lastName": "Samsu"
      },
      "phoneNumber": "01711111111",
      "address": "Chattogram",
      "budget": 30000,
      "income": 0
    },
}
 ``` 
