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
         - All controllers get loaded from index.ts one
         - Naming convention - **/{route name directory-lowercase}/{ Route Name }Controller** - camel case 
         - ex. **/auth/AuthController**
       - **/ database** - 
       - **/ middleware**
       - **/ models**
       - **/ routes**
       - **/ services** 
       - **/ shared**
       - **/ tests**


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
