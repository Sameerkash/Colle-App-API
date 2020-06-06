const { buildSchema } = require('graphql');

export default buildSchema(`

type Post {
    _id: ID!
    title: String!
    content: String!
    imageUrl: String!
    uid: User!
    createdAt: String!
}

type User{
    _id: ID!
    email: String!
    password: String!
    name: String!
    displayName: String!
    phone: Int!
    link: JSON 
}


`
);

