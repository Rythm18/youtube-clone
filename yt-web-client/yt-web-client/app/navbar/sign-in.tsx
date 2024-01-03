import React, { Fragment } from 'react'
import styles from "./sign-in.module.css";

export function SignIn() {
    return (
        <Fragment>
            <button className={styles.signin}>
                Sign Out
            </button>
            <button className={styles.signin}>
                Sign In
            </button>
        </Fragment>
    )
}

export default SignIn