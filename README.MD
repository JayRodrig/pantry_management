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
3. `cat seed.sql | psql` to create SQL database and insert data
4. Use `npm run start:local` to run server on port #11235

### Working Routes:

> * `localhost:11235/user/id/:id` 
>   *  Returns specified user's data
> * `localhost:11235/user/email/:email` 
>   * Returns specified user's data
> * `localhost:11235/recipe/:id`
>   * Returns specified recipe's data joint w its respective ingredients