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

type Student{
    _id: ID!
    email: String!
    password: String!
    name: String!
    displayName: String!
    phone: Int!
    link: JSON 
    displayName: String!
    imageUrl : String
    usn: String
    branch: String
    batch: String   
}

type Faculty{
    _id: ID!
    email: String!
    password: String!
    name: String!
    displayName: String!
    phone: Int!
    link: JSON 
    displayName: String!
    imageUrl : String
    facultyId: String
    department: String
    role: String
}


type AuthData{
    token: String!
    userId : String!
}

type PostData{
    posts:[Post!]!
    postCount: Int!
}

type StudentInputData{
    email: String!
    name: String!
    password!
    branch: String!
    batch: String!
    usn: String!
    phone Int!
    displayName: String!

}

type FacultyInoutData{
    email: String!
    name: String!
    password!
    department: String!
    role: String!
    facultyId: String!
    phone:Int!
    displayName: String!
}

type PostInpuData{
    title: String!
    content: String!
    imageUrl: String
}

type RootQuery {
    login(email: String!, password: String!): AuthData!
    posts(page: Int): PostData!
    post(id: ID!): Post!
    user: User!
}

type RootMutation {
    createStudent(userInput: StudentInputData): User!
    createFaculty(userInput: FacultyInoutData): 
    createPost(postInput: PostInputData): Post!
    updatePost(id: ID!, postInput: PostInputData): Post!
    deletePost(id: ID!): Boolean
    updateProfile(id: ID!): User!
}
`
);

