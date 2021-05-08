import { gql } from "@apollo/client";

export const getUserQuery = gql`
    query getUser (
        $userId: String!
    ){
        getUser( userId: $userId ) {
            firstName
            lastName
            username
            email
            sex
            posts{
                postId
                description
                userId
            }
        }
        
    }
`

export const getPostsByUserIdQuery = gql`
    query getPostsByUserId (
        $userId: String!
    ){
        getPostsByUserId( userId: $userId ) {
            postId
            userId
            description
            likes{
                likeId
                userId
            }
            comments{
                commentId
                userId
                comment
            }
        }
    }
`

export const getPostsQuery = gql`
    query getPosts {
        getPosts{
            postId
            userId
            description
            likes{
                likeId
                userId
            }
            comments{
                commentId
                userId
                comment
            }
        }
    }
`