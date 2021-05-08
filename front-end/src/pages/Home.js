import { useMutation, useQuery } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react'
import Post from '../components/Post'
import { UserContext } from '../context/auth';
import { getPostsQuery } from '../graphql/Queries';
import { Button, Divider, Input, Segment} from 'semantic-ui-react';
import { createPostMutation } from '../graphql/Mutations';
import "./Home.css"



function Home(props) {
    
    const { user } = useContext(UserContext) 
    const { data } = useQuery(getPostsQuery);
    const [ createPostMethod ] = useMutation(createPostMutation)

    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState('');

    useEffect(() => {
        if(user.firstName === null){
            props.history.push('/login');
        }
        if(data){
            setPosts(data.getPosts);
        }
        
    }, [data])

    const createPost = async (e) => {
        e.preventDefault();
        await createPostMethod({
            variables: {
                userId: user.userId,
                description: newPost
            },
            refetchQueries: [
                {
                    query: getPostsQuery,
                }
            ]
        })
        setNewPost('');
    }


    return (
        <div>
            <Segment basic textAlign='center'>
                <Input
                    icon='search'
                    iconPosition='left'
                    placeholder='post...'
                    onChange = { (e) => setNewPost(e.target.value)} 
                    value={newPost}
                />
                <Divider horizontal>X</Divider>
                <Button
                    color='teal'
                    content='Post'
                    icon='add'
                    labelPosition='left'
                    onClick={createPost}
                />
            </Segment>
            <div className="posts">
                {posts.map((post) => 
                    (<Post key={post.postId} post={post}/>)
                )}
            </div>
        </div>
    )
}

export default Home
