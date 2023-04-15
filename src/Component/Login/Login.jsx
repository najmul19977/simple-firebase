import React, { useState } from 'react';
import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import app from '../../firebase/firebase.init';

const Login = () => {
    const [user, setUser] = useState(null);
    const auth = getAuth(app);
    console.log(app);
    const googleprovider = new GoogleAuthProvider();
    const githubprovider = new GithubAuthProvider();

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleprovider)
            .then((result) => {
                const loggedInuser = result.user;
                setUser(loggedInuser);
            })
            .catch(error => {
                console.log('error', error.message);
            })
    }
    const handleGithubSignIn = () =>{
        signInWithPopup(auth,githubprovider)
        .then(result =>{
            const loggedInuser = result.user;
            console.log(loggedInuser);
            setUser(loggedInuser);
        })
        .catch(error =>{
            console.log(error);
        })
    }
    const handleSignOut = () => {
        signOut(auth)
            .then(result => {
                console.log(result)
                setUser(null);

            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <div>
            {/* user ? logout:sign in */}
           { user ?
           <button onClick={handleSignOut}>Sign Out</button> :
            <div>
                <button onClick={handleGoogleSignIn}>Google Login</button>
                <button onClick={handleGithubSignIn}>Github Login</button>
            </div>
            }
            {user &&
                <div>
                    User:{user.displayName}
                    <p>Email:{user.email}</p>
                </div>
            }
        </div>
    );
};

export default Login;