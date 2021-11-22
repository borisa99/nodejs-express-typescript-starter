# Features

|   Name         | Description |
| -------------- | ----------- | 
| Authentication | Creating new users and verifying their identity |
| Authorisation  | Roke based access managment on each route and resource |
| Mailing client | Ready to use mailing client that uses fully customisable                    embedded                            javascript templates |
| Request validation | Setting up request rules for each route that will be loaded                                  automatically from file that follows naming convention |
| Authentication with socials | TO DO |
| File upload | TO DO |


# Folder Structue 
1. **~** - root
     - **/ custom** -- custom storage rules ( to do ) and email templates
       - Second nested list item
     - **/ src**
       - **/ controllers** -- Class based controllers whos methods get called from router 
         - all controllers get loaded from index.ts one
         - naming convention - **/{route name directory-lowercase}/{ Route Name }Controller** - camel case 
         - ex. **/auth/AuthController**
       - **/ database** - Database driver configuration file, migrations and seeds
         - enviroment variables required - **DATABASE_CLIENT**, **DATABASE_URL** - connection string
         - commands
           - **npm run knex migrate:latest** - apply migrations
           - **npm run knex migrate:rollback** - revert latest migration
           - **npm run knex migrate:make migration_name** - create new migration
           - **npm run knex seed:run** - run all seeds from /seeds directory
           - **npm run knex seed:run --specific=seed-filename.ts** - Runs a specific seed file
          - knex cheatsheet - https://devhints.io/knex
       - **/ middleware** - gloabl and route level middleware
         - auth.ts - global authentication middleware that validates user and his access permission
         - requestValidator.ts - global middleware that automatically loads **{route name}.router.rules.ts**  file and validates incoming request based on its rules
       - **/ models** - For each database table there should be corresponding **ts** file.
       - **/ routes** - API routes defintions
         - naming convention - **/{route name directory}/** - lowercase
           - **{route name}.router.ts** - place where you define all routes for router ( ex. auth.router.ts ) - lowercase
           - **{route name}.router.rules.ts** - rules for the router routes (ex. auth.router.rules.ts )
             - exports object whos keys are route definitions which have value of validation rules as array
             - object key naming convention - **{ method }_{ route name }** (ex. auth_register):[] 
           -  all **router.ts** files should be imported into **routes/index.ts** file
       - **/ services** - Microservices for each db model of separate feature
         - naming convention - /**{ service name directory }** - lowercase  (ex. auth)
           - **{service name}Service.ts** (ex. AuthService)
           - **I{service name}Service.ts** - interface that service above implements (ex. IAuthService)
       - **/ shared** - plugins, types, db instance, helper function - all things that need to be globally available 
         - **types** - directory with all global types 
         - **db.ts** - database instance using which we make all queries
         - **email.ts** - mailing client 
         - **jwt.ts** - JWT helper functions
         - **lodash.ts** - export lodash instance
         - **serviceResponseHandler.ts**  - handler for response call in controller which will return api response from its call
       - **/ tests** - to be written
# Database query

This application is using [knex](https://knexjs.org/#Builder-knex) as driver for database. You can use knex directly
from `shared/db.ts` file or you can create model and use it as instance.

### DB Model based

When using it over model. Class in question needs to extend base class, lest say we have class named user class will
look like:

```
import Model from '@shared/Model'
class User extends Model{
    constructor() {
        super()
    }
}
```

From example above we need to follow rules:

| Table name     | Writing query                 |
| -------------- | ----------------------------- |
| users (plural) | new User().db.<knex_function> |

in case of multiple words in class name example:

```
class UsersInRole extends Model {
    constructor() {
        super()
    }
}
```

| Table name             | Writing query                         |
| ---------------------- | ------------------------------------- |
| user_in_roles (plural) | new UsersInRoles().db.<knex_function> |

# Tests

This project for testing is using [Jest](https://jestjs.io/docs/getting-started)
for examples about jest and node express
use [this link](https://www.albertgao.xyz/2017/05/24/how-to-test-expressjs-with-jest-and-supertest/) <br />
**Tests should not cover 100% of code**, just API calls or functionalities like
db connection.<br />
Running tests: `npm t`
