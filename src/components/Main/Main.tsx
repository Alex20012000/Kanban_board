import React, { FC } from 'react';

import Board from './Board/Board';

import styles from './Main.module.scss';

const Main: FC = () => {
    return <main className = {styles.wrapper}>
        <Board />
    </main>
}

export default Main;
