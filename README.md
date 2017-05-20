# aor-rest-client-router

A restClient that enables routing to many restClients based on resource name in [Admin-on-rest](https://github.com/marmelab/admin-on-rest/).

## Installation

Install with:

```sh
npm install --save aor-rest-client-router
```

or

```sh
yarn add aor-rest-client-router
```

## Usage

In your `App.js` or wherever you want to call `<Admin>` component define the `restClientRouter` like this

```js
import React from 'react';
import jsonRestClient from 'aor-json-rest-client';
import restClientRouter from 'aor-rest-client-router';

import { Admin, Resource } from 'admin-on-rest';

import { PostList } from './posts';
import { UserList } from './users';

const api1 = jsonRestClient({
  posts: [
    { id: 1, title: "Hi", body: "hello world!" }
  ]
})

const api2 = jsonRestClient({
  users: [
    { id: 1, title: "SomeUser", bio: "web developer"}
  ]
})

const restRouter = restClientRouter({
    'posts': api1,
    'users': api2
});

const App = () => (
    <Admin restClient={restRouter}>
        <Resource name="posts" list={PostList} />
        <Resource name="users" list={UserList} />
    </Admin>
);

export default App;
```