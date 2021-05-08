import { useMutation, useQuery } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react'
import { Card, Button, Input } from 'semantic-ui-react'
import { UserContext } from '../context/auth';
import { createCommentMutation, createLikeMutation, deletePostMutation, deleteLikeMutation } from '../graphql/Mutations';
import { getPostsQuery, getUserQuery } from '../graphql/Queries';

function Post({ post }) {

    const { user } = useContext(UserContext)
    const [isLiked, setIsLiked] = useState(post.likes.some(like => like.userId === user.userId)? false: true);
    const [userName, setuserName] = useState('');
    const [commentState, setCommentState] = useState(false)
    const [newComment, setNewComment] = useState('');
    

    const [createLikeMethod] = useMutation(createLikeMutation)
    const [deleteLikeMethod] = useMutation(deleteLikeMutation)

    const [deletePostMethod] = useMutation(deletePostMutation)
    const [createCommentMethod] = useMutation(createCommentMutation)
    const { data } = useQuery(getUserQuery, {
        variables: {
            userId: post.userId,
        }
    });
    
    useEffect(() => {
        if(data){
            setuserName(data.getUser.username)
        }
    }, [data])

    const createLike = (e) => {
        e.preventDefault();
        if(isLiked) {
            createLikeMethod({
                variables: {
                    userId: user.userId,
                    postId: post.postId
                },
                refetchQueries: [
                    {
                        query: getPostsQuery,
                    }
                ]
            })
            setIsLiked(!isLiked);
        }
        else {
            deleteLikeMethod({
                variables: {
                    userId: user.userId,
                    postId: post.postId
                },
                refetchQueries: [
                    {
                        query: getPostsQuery,
                    }
                ]
            })
            setIsLiked(!isLiked);
        }
    }

    const deletePost = (e) => {
        e.preventDefault();
        deletePostMethod({
            variables: {
                postId: post.postId,
            },
            refetchQueries: [
                {
                    query: getPostsQuery,
                }
            ]
        })
    }

    const showComments = (e) => {
        e.preventDefault();
        setCommentState(!commentState);
    }

    const createComment = (e) => {
        e.preventDefault();
        createCommentMethod({
            variables: {
                comment: newComment,
                userId: user.userId,
                postId: post.postId,
            },
            refetchQueries: [
                {
                    query: getPostsQuery,
                }
            ]
        })
    }

    return (
        <div className="post">
            <Card>
                <Card.Content header={post.description} />
                <Card.Content description={"posted by " + userName} />
                <div>
                    <Card.Content description={"Likes: "+ post.likes.length} />
                    <Card.Content description={"Comments: "+post.comments.length} onClick= {showComments}/>
                    {commentState ?
                        post.comments.map(comment => 
                            (<Card.Content description={comment.comment} key={comment.commentId} />)
                        ):
                        <></>
                    }
                    {commentState ?
                        <>
                            <Input 
                                placeholder='comment...' 
                                onChange = { (e) => setNewComment(e.target.value)} 
                                value={newComment}
                            />
                            <Button primary onClick={createComment}>comment</Button>
                        </>:
                        <></>
                    }
                </div>
                <Button toggle active={isLiked} onClick={createLike}>
                    {isLiked ? 'Like' : 'Unlike'}
                </Button>
                {user.userId === post.userId ? <Button color="red" onClick={deletePost}>deletePost</Button>: ""} 
            </Card>
        </div>
    )
}

export default Post
