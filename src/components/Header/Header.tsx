import React, { FC } from 'react';

import Menu from './Menu/Menu';

import styles from './Header.module.scss';

interface Props {
}

const Header: FC<Props> = () => {
    return <header className = {styles.wrapper}>
        <span className = {styles.title}>Awesome Kanban Board</span>
        <Menu />
    </header>
}

export default Header;
