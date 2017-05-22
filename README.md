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

```jsx
import React from 'react';
import jsonRestClient from 'aor-json-rest-client';
import restClientRouter from 'aor-rest-client-router';

import { Admin, Resource } from 'admin-on-rest';

import { PostList } from './posts';
import { UserList } from './users';
import { CommentList } from './comments';
import { ProfileList } from './profile_list';

const restRouter = restClientRouter({
    rules: [
        ['posts',                 'service1'],
        ['users',                 'service2'],
        ['*',                     'service4']
    ],
    services: {
        service1: jsonRestClient('posts-server.dev'),
        service2: jsonRestClient('users-server.dev'),
        service3: jsonRestClient('comments-server.dev'),
        service4: jsonRestClient('profiles-server.dev'),
    }
});

const App = () => (
    <Admin restClient={restRouter}>
        <Resource name="posts" list={PostList} />        <!-- Will route to service1 -->
        <Resource name="users" list={UserList} />        <!-- Will route to service2 -->
        <Resource name="service3://comments"  
                            list={CommentList} />        <!-- Will route to service3 (explicit route) -->
        <Resource name="profiles" list={ProfileList} />  <!-- Will route to service4 (via wildcard '*') -->
    </Admin>
);

export default App;
```

## Options

You can route via the following ways

* using a specific rule via the `rules` array like `posts`
* using a wild card rule via the `rules` array like `posts/*` 
* using a default wild card rule via adding a `*` as the last rule (like the example above)
* prefixing the resource name with service name like `service1://resource`