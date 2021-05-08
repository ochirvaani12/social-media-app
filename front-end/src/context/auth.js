import { createContext, useState } from 'react'
import jwtDecode from 'jwt-decode'

export const loginData = (data, setUserData) => {
    if(data){
        localStorage.setItem('jwtToken', data.login.token);
        setUserData();
    }
}

export const signupData = (data, setUserData) => {
    if(data){
        localStorage.setItem('jwtToken', data.createUser.login.token);
        setUserData();
    }
}

let initialUser = {
    userId: null,
    firstName: null,
    lastName: null,
    username: null,
    email: null,
    sex: null,
}

if(localStorage.getItem('jwtToken')){
    const decodedToken = jwtDecode(localStorage.getItem('jwtToken'));
    initialUser = {
        userId: decodedToken.userId,
        firstName: decodedToken.firstName,
        lastName: decodedToken.lastName,
        username: decodedToken.username,
        email: decodedToken.email,
        sex: decodedToken.sex,
    }
}

export const UserContext = createContext();

export const UserProvider = ({children}) => {

    const [user, setUser] = useState(initialUser)

    const setUserData = () => {
        const decodedToken = jwtDecode(localStorage.getItem('jwtToken'));
        setUser({
            userId: decodedToken.userId,
            firstName: decodedToken.firstName,
            lastName: decodedToken.lastName,
            username: decodedToken.username,
            email: decodedToken.email,
            sex: decodedToken.sex,
        })
    }

    const logoutData = () => {
        localStorage.removeItem('jwtToken')
        setUser({
            userId: null,
            firstName: null,
            lastName: null,
            username: null,
            email: null,
            sex: null,
        })
        
    }

    
    return ( 
        <UserContext.Provider value={{user, setUserData, logoutData}}>
            {children}
        </UserContext.Provider>
    )
}