import { gql } from "@apollo/client";

const getAuthorQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;
const getBooksQuery = gql`
  {
    books {
      name
      genre
      id
    }
  }
`;
const getBookQuery = gql`
  query($id : ID!){
    book(id : $id){
        id
        name
        genre
        author{
            id
            name 
            age
            books{
                name 
                id
            }
        }
    }
  }
`
const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;
const ADD_AUTHOR = gql`
  mutation($name: String!, $age: Int!) {
    addAuthor(name: $name, age: $age) {
      id
      name
      age
    }
  }
`;
const DELETE_BOOK = gql`
  mutation($id : ID!){
    deleteBook(id : $id){
      id
      name
      genre
      author{
        name
      }
    }
  }
`

export {getAuthorQuery , getBooksQuery , addBookMutation , getBookQuery ,ADD_AUTHOR , DELETE_BOOK}