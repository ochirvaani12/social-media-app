import { gql } from "@apollo/client";

export const createUserMutation = gql`
    mutation createUser (
        $firstName: String!
        $lastName: String!
        $username: String!
        $email: String!
        $sex: String!
        $password: String!
    ){
        createUser( createUserInput: { 
            firstName: $firstName
            lastName: $lastName
            username: $username
            email: $email
            sex: $sex
            loginInput: {
                email: $email
                password: $password
            }
        }){
            userId
            firstName
            lastName
            username
            email
            sex
            login {
                token
            }
        }
    }
`

export const loginMutation = gql`
    mutation login (
        $email: String!
        $password: String!
    ){
        login( loginInput:{
            email: $email
            password: $password
        }){
            email
            token
        }
    }
`;

export const createPostMutation = gql`
    mutation createPostMutation (
        $userId: String!
        $description: String!
    ){
        createPost( createPostInput:{
            userId: $userId
            description: $description
        }){
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
`;

export const deletePostMutation = gql`
    mutation deletePostMutation (
        $postId: String!
    ){
        deletePost( postId: $postId ){
            postId
        }
    }
`

export const createLikeMutation = gql`
    mutation createLikeMutation (
        $userId: String!
        $postId: String!
    ){
        createLike( createLikeInput:{
            userId: $userId
            postId: $postId
        }){
            likeId
            userId
            postId
        }
    }
`;

export const deleteLikeMutation = gql`
    mutation deleteLikeMutation (
        $userId: String!
        $postId: String!
    ){
        deleteLike( deleteLikeInput:{
            userId: $userId
            postId: $postId
        }){
            likeId
            userId
            postId
        }
    }
`;


export const createCommentMutation = gql`
    mutation createCommentMutation (
        $comment: String!
        $userId: String!
        $postId: String!
    ){
        createComment( createCommentInput:{
            comment: $comment
            userId: $userId
            postId: $postId
        }){
            commentId
            comment
            userId
            postId
        }
    }
`