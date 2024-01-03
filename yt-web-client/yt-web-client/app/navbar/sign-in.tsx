'use client';
import React, { Fragment, useEffect, useState } from 'react';
import styles from "./sign-in.module.css";
import { signinWithGoogle, signOut } from '../firebase/firebase';
import { onAuthStateChangedHelper } from '../firebase/firebase';
import { User } from 'firebase/auth';
interface SignInProps {
    user: User | null;
}

export function SignIn({ user }: SignInProps) {

    return (
        <Fragment>
            {
                user ?
                (
                    <button className={styles.signin} onClick={signOut}>
                        Sign Out
                    </button>
                ) : (
                    <button className={styles.signin} onClick= {signinWithGoogle}>
                        Sign In
                    </button>
                )
            }
            
            
        </Fragment>
    )
}

export default SignIn