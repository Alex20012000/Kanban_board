import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import Board from './Board/Board';
import EditCard from './EditCard/EditCard';

import styles from './Main.module.scss';

const Main: FC = () => {
    return <main className = {styles.wrapper}>
        <Routes>
            <Route path = '/' element = {<Board />} />
            <Route path = 'card/:id' element = { <EditCard /> } />
        </Routes>
    </main>
}

export default Main;
