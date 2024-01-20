import React, { FC, useMemo } from 'react';

import { useLocalStorage } from '../../hooks';
import { ICard } from '../Main/Board/Card/types';
import { STATUS_CARD } from '../Main/Board/types';

import styles from './Footer.module.scss';

const Footer: FC = () => {
    const [cardsLS] = useLocalStorage<ICard[]> ('cards', []);
    const [active, finished] = useMemo(() => {
        return cardsLS?.reduce((acc, currCard) => {
            let [backlog, finished] = acc;
            currCard.status === STATUS_CARD.BACKLOG && backlog++;
            currCard.status === STATUS_CARD.FINISHED && finished++;
            return [backlog, finished];
        }, [0, 0]) || [0, 0];
    }, [cardsLS]);

    return <footer className = {styles.wrapper}>
        <div className = {styles.numberTasks}>
            <span className = {styles.title}>Active tasks: {active}</span>
            <span className = {styles.title}>Finished tasks: {finished}</span>
        </div>
        <span className = {styles.board}>Kanban board by Aleksey, 2024</span>
    </footer>
}

export default Footer;
