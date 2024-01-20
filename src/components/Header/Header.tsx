import React, { FC } from 'react';

import Profile from './ProfileBlock/ProfileBlock';

import styles from './Header.module.scss';

const Header: FC = () => {
    return <header className = {styles.wrapper}>
        <span className = {styles.title}>Awesome Kanban Board</span>
        <Profile />
    </header>
}

export default Header;
