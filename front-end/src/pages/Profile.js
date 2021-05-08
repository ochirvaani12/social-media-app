import { useQuery } from '@apollo/client'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/auth'
import { getUserQuery } from '../graphql/Queries'
import male from '../photos/male.jpg'
import female from '../photos/female.jpg'
import './Profile.css'

function Profile() {

    const { user } = useContext(UserContext)

    const { data } = useQuery(getUserQuery, {
        variables: {
            userId: user.userId,
        }
    })

    const [userData, setUserData] = useState({
        firstName: null,
        lastName: null,
        username: null,
        email: null,
        sex: null,
        posts: null,
    });

    useEffect(() => {
        if (data) {
            setUserData({
                firstName: data.getUser.firstName,
                lastName: data.getUser.lastName,
                username: data.getUser.username,
                email: data.getUser.email,
                sex: data.getUser.sex,
                posts: data.getUser.posts.length,
            })
        }
    }, [data])

    return (
        <>
        {data ?
        <div className="profile-container">
            <div className="profile-header">
                <div className="profile-picture-names">
                    <div className="profile-img"><img src={userData.sex === 'male' ? male : female} /></div>
                    <div className="profile-informations">
                        <h2>Username: {userData.username}</h2>
                        <h2>Firstname: {userData.firstName}</h2>
                        <h2>Lastname: {userData.lastName}</h2>
                        <h2>Sex: {userData.sex}</h2>
                        <h2>Number of posts:{userData.posts}</h2>
                    </div>
                </div>
            </div>
        </div>
        : <div>Loading</div>
        }
        </>
    )
}

export default Profile
