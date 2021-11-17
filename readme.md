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

|Table name|Writing query|
|----------|-------------|
|users (plural)| new User().db.<knoks_function> |

in case of multiple words in class name example:

```
class UsersInRole extends Model {
    constructor() {
        super() 
    }
}
```

|Table name|Writing query|
|----------|-------------|
|user_in_roles (plural)| new UsersInRoles().db.<knoks_function> |

# Tests

This project for testing is using [Jest](https://jestjs.io/docs/getting-started)
for examples about jest and node express
use [this link](https://www.albertgao.xyz/2017/05/24/how-to-test-expressjs-with-jest-and-supertest/) <br />
**Tests should not cover 100% of code**, just API calls or functionalities like
db connection.<br />
Running tests: `npm t` 