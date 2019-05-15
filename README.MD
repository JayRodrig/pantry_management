# Pantry Management BE

> Backend Server for the Pantry Management App. 
>
> [_in development_]

### Stack Used:

> * ExpressJS
> * Pg Promise
> * Body Parser

### To Install: 

1. Download app
2. NPM install in ./backend_server
3. Use `npm run start:local` to run server on port #11235

### Working Routes:

> * `localhost:11235/user/id/:id` 
>   *  Returns data of specified user
> * `localhost:11235/user/email/:email` 
>   * Returns data of specified user
> * `localhost:11235/recipe/:id`
>   * Returns data of specified recipe and ingredients that belong w recipe.