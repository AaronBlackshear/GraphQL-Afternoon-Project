require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const graphqlHTTP = require("express-graphql");
const massive = require("massive");
const { graphqlExpress } = require("apollo-server-express");

const { schema, root } = require(`${__dirname}/graphql/schema`);

const app = express();

app.use(json());
app.use(cors());

massive(process.env.CONNCETION_STRING)
  .then(db => {
    app.set("db", db);
  })
  .catch(err => console.log(err));

app.use("/graphql", graphqlHTTP({ schema, rootValue: root, graphiql: true }));
// app.use(
//   req => (
//     "/graphql",
//     graphqlHTTP({
//       schema,
//       rootValue: root,
//       graphiql: true,
//       context: { req: req.app }
//     })
//   )
// );
app.use(
  "/graphql",
  graphqlExpress(req => ({
    schema,
    context: { value: req.app }
  }))
);
// app.post("/graphql", graphqlHTTP({ schema, rootValue: root, graphiql: false, context: app }));

const port = 3001;

app.listen(port, () => console.log(`Listening on port ${port}`));
