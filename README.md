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
import restClientRouter from 'aor-rest-client-router';

import { jsonServerRestClient, Admin, Resource } from 'admin-on-rest';

import { PostList } from './posts';
import { CommentList } from './comments';

const restRouter = restClientRouter({
    'posts': jsonServerRestClient('http://posts-server.com'),
    'posts/\\d+/comments': jsonServerRestClient('http://comments-server.com')
});

const App = () => (
    <Admin restClient={restRouter}>
        <Resource name="posts" list={PostList} />
        <Resource name="comments" list={CommentList} />
    </Admin>
);

export default App;
```