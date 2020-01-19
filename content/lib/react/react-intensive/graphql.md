---
title: graphql
seoDescription: graphql | React.
seoKeywords: graphql, React
date: 2020-01-19 06:00:00
---
# graphql

## введение

*Qraphql* это язык запрос, который возник из желания структурировать разросшийся *REST API*. *Graphql* решает проблему, когда для получения нужных данных требуется выполнить множество запросов, либо когда запрос возвращает больше данных, чем требуется в конкретном случае.

Graphql позволяет получить нужную информацию одним запросом.

Протестировать graphql запросы можно на <a href="https://graphql.org/swapi-graphql/?query=query%20%7B%0A%20%20film(filmID%3A%201)%20%7B%0A%20%20%20%20title%0A%20%20%20%20%0A%20%20%20%20producers%0A%20%20%20%20%0A%20%20%20%20starshipConnection%20%7B%0A%20%20%20%20%20%20pageInfo%20%7B%0A%20%20%20%20%20%20%20%20hasNextPage%0A%20%20%20%20%20%20%20%20hasPreviousPage%0A%20%20%20%20%20%20%20%20startCursor%0A%20%20%20%20%20%20%20%20endCursor%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%0A%20%20%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20%20%20model%0A%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%20%20%0A%20%20%20%20starshipConnection%20%7B%0A%20%20%20%20%20%20pageInfo%20%7B%0A%20%20%20%20%20%20%20%20hasNextPage%0A%20%20%20%20%20%20%20%20hasPreviousPage%0A%20%20%20%20%20%20%20%20startCursor%0A%20%20%20%20%20%20%20%20endCursor%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%0A%20%20%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%20%20length%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D">swapi-graphql</a>

Пример qraphql запроса:

```
query {
  film(filmID: 1) {
    title
    
    producers
    
    starshipConnection {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      
      edges {
        node {
          model
          name
        }
      }
    }
    
    starshipConnection {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      
      edges {
        node {
          name
          length
        }
      }
    }
  }
}
```

Альтернатива qraphgl &ndash; <a href="https://netflix.github.io/falcor/">falcor</a>.

В курсе рассматривается *Appolo* c пакетами:

+ <a href="https://www.npmjs.com/package/graphql">graphql</a>
+ <a href="https://www.npmjs.com/package/apollo-boost">apollo-boost</a>
+ <a href="https://www.npmjs.com/package/apollo-client">apollo-client</a>
+ <a href="https://www.npmjs.com/package/react-apollo">react-apollo</a>
+ <a href="https://www.npmjs.com/package/@apollo/react-hooks">@apollo/react-hooks</a>


## server

```graphql/package.json```:

```json
{
  "name": "graphql-api",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "apollo-server-express": "^2.4.8",
    "express": "^4.16.4",
    "firebase": "^5.9.2",
    "graphql": "^14.2.1"
  }
}
```

Appolo работает с *AST деревом*, по этому запрос нужно передавать предварительно в ```gql``` для конвертации.

```graphql/index.js```:

```js
const express = require("express");
const fs = require("fs");
const { promisify } = require("util");
const { ApolloServer, gql } = require("apollo-server-express");
const readFile = promisify(fs.readFile);

const resolvers = require("./resolvers");
const app = express();

(async () => {
  const gqlSchema = await readFile(__dirname + "/schema/root.graphql", "utf8");

  const typeDefs = gql`
    ${gqlSchema}
  `;

  const PORT = process.env.GRAPHQL_PORT || 5000;

  const server = new ApolloServer({ typeDefs, resolvers });

  server.applyMiddleware({ app, path: "/" });

  app.listen({ port: PORT }, () =>
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    )
  );
})();

module.exports = app;
```

### mocks

```graphql/mocks/people.js```:

```js
module.exports = [
  {
    _id: "123",
    firstName: "Test",
    lastName: "User",
    email: "test@example.com"
  },
  {
    _id: "124",
    firstName: "Hohoho",
    lastName: "Example",
    email: "example@example.com"
  },
  {
    _id: "125",
    firstName: "Blalala",
    lastName: "YAYAYA",
    email: "here@example.com"
  }
];
```

```graphql/mocks/events.js```:

```js
module.exports = {
  "25yW1tqFogDRCAcPtLQA": {
    id: "25yW1tqFogDRCAcPtLQA",
    month: "January",
    submissionDeadline: "",
    title: "VOXXED Days Berlin 2016",
    url: "https://voxxeddays.com/berlin16/",
    when: "January 28–29, 2016",
    where: "Berlin, Germany",
    peopleIds: ["123", "124"]
  },
  "2HkKg2fFObWkzqBCqy4Y": {
    id: "2HkKg2fFObWkzqBCqy4Y",
    month: "January",
    submissionDeadline: "",
    title: "Agile Content Conf",
    url: "https://2017.agilecontentconf.com/",
    when: "January 30-31, 2017",
    where: "London, UK",
    peopleIds: ["124"]
  },
  "2IDyLteFlWGZwmbFD1GF": {
    id: "2IDyLteFlWGZwmbFD1GF",
    month: "May",
    submissionDeadline: "",
    title: "React Europe",
    url: "https://www.react-europe.org/",
    when: "May 18-19, 2017",
    where: "Paris, France",
    peopleIds: []
  },
  // ...
}
```

### resolvers

Описывают как доставать данные.

```graphql/resolvers/index.js```:

```js
const events = require("../mocks/events");
const people = require("../mocks/people");

module.exports = {
  Query: {
    allEvents: () =>
      new Promise(resolve =>
        setTimeout(() => resolve(Object.values(events)), 500)
      ),
    event: (_, { id }, context) =>
      new Promise(resolve => setTimeout(() => resolve(events[id]), 500))
  },
  Mutation: {
    renameEvent: (_, { id, title }) => {
      const event = events[id];
      event.title = title;
      return event;
    }
  },
  Person: {
    id: ({ _id }) => _id
  },
  Event: {
    people: ({ peopleIds }) =>
      peopleIds && peopleIds.map(id => people.find(person => person._id === id))
  }
};
```

```Event.people``` описывает как требуется получить данные, так как объект ```events``` в поле ```people``` хранит только ```id```, а сами данные находятся с объекте ```people```. Поддерживаются асинхронные функции.

### schema

Qraphgl это строго типизированный язык, структура данных описывается в схеме.

```graphql/schema/root.graphql```:

```
type Event {
  id: ID
  title: String
  url: String
  people: [Person]
}

type Person {
  id: ID
  firstName: String
  lastName: String
  email: String
}

type Query {
  allEvents: [Event]
  event(id: ID!): Event
}

type Mutation {
  renameEvent(id: ID!, title: String!): Event
}
```

## client

В package.json указан proxy для сервера *Appolo*.

```apollo-client/package.json```:

```json
{
  "name": "apollo-client",
  "version": "0.1.0",
  "private": true,
  "proxy": "http://localhost:5000",
  "dependencies": {
    "@apollo/react-hooks": "^3.1.3",
    "@testing-library/jest-dom": "^4.2.4",
    "@testing-library/react": "^9.3.2",
    "@testing-library/user-event": "^7.1.2",
    "apollo-boost": "^0.4.7",
    "graphql": "^14.5.8",
    "react": "^16.12.0",
    "react-apollo": "^3.1.3",
    "react-dom": "^16.12.0",
    "react-scripts": "3.3.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": "react-app"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

### src

```apollo-client/src/App.js```:


```js
import React from "react";
import EventList from "./components/event-list";

function App(props) {
  return (
    <div>
      <EventList />
    </div>
  );
}

App.propTypes = {};

export default App;
```

```apollo-client/src/index.js```:

```js
import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import App from "./App";
import apolloClient from "./apollo/client";

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
```

```apollo-client/src/apollo/client.js```:

В целях быстрого ознакомления, клиент был добавлен прямо в объект ```window```.

```js
import ApolloClient, { gql } from "apollo-boost";

const client = new ApolloClient({});

window.apollo = client;
window.gql = gql;

export default client;
```

```apollo-client/src/components/event-body.js```:

```js
import React from "react";
import { useQuery } from "@apollo/react-hooks";
import eventQuery from "../graphql/event";
import EventTitleForm from "./event-title-form";

function EventBody({ event }) {
  const { loading, data } = useQuery(eventQuery, {
    variables: { id: event.id }
  });

  if (loading) return <h2>Loading...</h2>;

  return (
    <div>
      <EventTitleForm event={event} />
      <h3>{data.event.url}</h3>

      {data.event.people.map(person => person.email).join(", ")}
    </div>
  );
}

EventBody.propTypes = {};

export default EventBody;
```

```apollo-client/src/components/event-list.js```:

```js
import React from "react";
import { useQuery } from "@apollo/react-hooks";
import allEventsQuery from "../graphql/all-events";
import Event from "./event";

function EventList(props) {
  const { data, loading } = useQuery(allEventsQuery);
  if (loading) return <h1>Loader...</h1>;
  return (
    <ul>
      {data.allEvents.map(event => (
        <li key={event.id}>
          <Event event={event} />
        </li>
      ))}
    </ul>
  );
}

EventList.propTypes = {};

export default EventList;
```

```apollo-client/src/components/event-title-form.js```:

```js
import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import renameEventMutation from "../graphql/event-rename-mutation";

function EventTitleForm({ event }) {
  const [title, setTitle] = useState(event.title);
  const [rename, { loading }] = useMutation(renameEventMutation, {
    variables: { id: event.id, title }
  });

  const handleSubmit = async ev => {
    ev.preventDefault();
    return rename();
  };

  if (loading) return <h2>Renaming...</h2>;

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={ev => setTitle(ev.target.value)} />
      <button type="submit">rename</button>
    </form>
  );
}

EventTitleForm.propTypes = {};

export default EventTitleForm;
```

```apollo-client/src/components/event.js```:

```js
import React, { useState } from "react";
import EventBody from "./event-body";

function Event({ event }) {
  const [isOpen, setOpen] = useState(false);

  return (
    <div>
      {event.title}
      {isOpen && <EventBody event={event} />}
      <button onClick={() => setOpen(!isOpen)}>
        {isOpen ? "close" : "open"}
      </button>
    </div>
  );
}

Event.propTypes = {};

export default Event;
```

### graphql

```apollo-client/src/graphql/all-events.js```

```js
import { gql } from "apollo-boost";

export default gql`
  query AllEvents {
    allEvents {
      id
      title
    }
  }
`;
```

```apollo-client/src/graphql/event-rename-mutation.js```:

```js
import { gql } from "apollo-boost";

export default gql`
  mutation RenameEvent($id: ID!, $title: String!) {
    renameEvent(id: $id, title: $title) {
      id
      title
    }
  }
`;
```

```apollo-client/src/graphql/event.js```:

```js
import { gql } from "apollo-boost";

export default gql`
  query Event($id: ID!) {
    event(id: $id) {
      id
      title
      url
      people {
        id
        email
        firstName
      }
    }
  }
`;
```
