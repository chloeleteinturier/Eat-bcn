# eat.bcn

## Description

Search for restaurant in Barcelona and add them in a favorite list.

## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage and filter by type of restaurant, log in and sign up. 
- **sign up** - As a user I want to sign up on the webpage so that I can add favorite restaurants to my list.
- **login** - As a user I want to be able to log in on the webpage so that I can get back to my account
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- **favorite list** - As a user I want to see the list of my favorite and delete them.
- **edit user** - As a user I want to be able to edit my profile.
- **result** - As a user I want to see the list of restaurant filter by my preferences.
- **restaurant listing** - As a user I want to see more details of the restaurant, be able to call them and visit their website and save it as favorites.


## Routes:

| Method | Route | Description|
|------|-------|------------|

| GET  | /     | Main page route. Render home view.

| GET  | /login | Login route. Renders login formulary view.
| POST | /login | Login route. Sends login formulary info to the server.

| GET | /signup | Signup route. Renders signup formulary view.
| POST | /signup | Signup route. Sends signup info to server and creates user in DB.

| GET | /private/edit-profile | Private route. Renders edit-profile form view.
| POST | /private/edit-profile | Private route. Sends edit-profile info to server and updates user in DB.

| GET | /private/favorites | Private route. Render the favorites view.
| POST | /private/favorites | Private route. Delete favorite from the DB and redirect to favorites view.


| GET | /restaurants | Restaurants route. Renders restaurant-list view.

| GET | /restaurants/details | Restaurants route. Render restaurant-details view.
| POST | /restaurants/details | Restaurants route. Add and Delete favorite from the DB and redirect to restaurant-details view.


## Models

User model

```javascript
{
  name: String,
  email: String,
  password: String,
  favorites: [FavoriteID],
}

```

Favorites model

```javascript
{
  placeId: String,
}

```


## Backlog

See the Trello board.

## Links

### Git

The url to your repository and to your deployed project

[Repository Link](https://github.com/chloeleteinturier/Eat-bcn/tree/dev)

[Deploy Link](https://eat-bcn.herokuapp.com/)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)