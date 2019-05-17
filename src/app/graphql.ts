import { Link } from './types';
import gql from 'graphql-tag';

export const CREATE_USER_MUTATION = gql`
mutation createUser(
  $username:String!
  $email:String!
  $password:String!
) {
  createUser(
    username:$username,
    email:$email,
    password:$password){
    user{
      id
      username
      email
    }
  }
}
`

export const LOGIN_USER_MUTATION = gql`
mutation LoginUser($username:String! $password:String!) {
  loginUser(username:$username, password:$password){
    token
    user {
      id
      username
      email
    }
  }
}
`


export const ALL_LINKS_QUERY = gql`
query {
  links {
    id
    description
    url
  }
}
`

export const CREATE_LINK_MUTATION = gql`
mutation createLinkMutation(
  $description:String!
  $url:String!
){
  createLink(
    description:$description,
    url:$url
  ){
    id
    description
    url
  }
}
`

export const DELETE_LINK_MUTATION = gql`
mutation deleteLink($linkId:Int!){
  deleteLink(linkId:$linkId){
    deleted
  }
}
`

export interface allLinkQueryResponse {
  allLinks:Link[];
  loading:boolean;
}

export interface CreateLinkMutationResponse{
  createLink:Link;
  loading:boolean;
}
