import React from "react";
import Image from "next/image";
import styles from "./navbar.module.css";
import Link from "next/link";

export function Navbar(){
    return (
        <nav className={styles.nav}>
            <Link href="/">
                <Image width={90} height={20} 
                    src="/YouTube-Logo.wine.svg" alt="Logo"/>
           </Link>
        </nav>
    )
}

export default Navbar;