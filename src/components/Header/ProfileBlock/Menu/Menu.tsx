import React from 'react';

import styles from './Menu.module.scss';

const Menu = () => {
    return <div className = {styles.wrapper}>
        <ul className = {styles.list}>
            <li className = {styles.list_item}>Profile</li>
            <li className = {styles.list_item}>Log Out</li>
        </ul>
    </div> 
}

export default Menu;
