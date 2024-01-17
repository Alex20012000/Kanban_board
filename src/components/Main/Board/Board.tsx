import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';

import StatusColumn from './StatusColumn/StatusColumn';

import { useLocalStorage } from '../../../hooks';

import { STATUS_CARD } from './types';
import { ICard } from './Card/types';

import styles from './Board.module.scss';

type FilteredCards = Array<ICard[]>

const Board: FC = () => {
    const [allCards, setAllCards] = useState<Array<ICard>>([]);
    const [backlog, ready, inProgress, finished] = useMemo(() => allCards.reduce((acc, currCard) => {
        const [backlog, ready, inProgress, finished] = acc;

        const _backlog = [...backlog];
        const _ready = [...ready];
        const _inProgress = [...inProgress];
        const _finished = [...finished];

        switch(currCard.status) {
            case STATUS_CARD.BACKLOG:
                _backlog.push(currCard);
                break;

            case STATUS_CARD.READY:
                _ready.push(currCard);
                break;

            case STATUS_CARD.IN_PROGRESS:
                _inProgress.push(currCard);
                break;

            case STATUS_CARD.FINISHED:
                _finished.push(currCard);
                break;
                
            default:
                break;
            } 
            return [_backlog, _ready, _inProgress, _finished];
    }, [[],[],[],[]] as FilteredCards ), [allCards]);

    const [cardsLS, setCardsLS] = useLocalStorage<ICard[]> ('cards', []);

    const onClickSubmit = useCallback((card: ICard | null) => {
        if (card) {
            const _allCards = [...allCards, card];
            setCardsLS(_allCards);
        }
    }, [allCards]);

    const toMoveCard = useCallback((card: ICard | null) => {
        if (!card) return;

        const newAllCards = [...allCards.filter(({id}) => card.id !== id), card];
        setAllCards(newAllCards);
        setCardsLS(newAllCards);
    }, [allCards]);

    useEffect(() => {
        cardsLS && setAllCards(cardsLS);
    }, [cardsLS]);

    return <div className = {styles.wrapper}>
        <StatusColumn 
            status = {STATUS_CARD.BACKLOG} 
            title = 'Backlog' 
            data = {backlog} 
            applyChange = {onClickSubmit}
        />
        <StatusColumn 
            status = {STATUS_CARD.READY} 
            prevStatusData = {backlog} 
            title = 'Ready' 
            data = {ready} 
            applyChange = {toMoveCard}
        />
        <StatusColumn 
            status = {STATUS_CARD.IN_PROGRESS} 
            prevStatusData = {ready} 
            title = 'In Progress' 
            data = {inProgress} 
            applyChange = {toMoveCard}
        />
        <StatusColumn 
            status = {STATUS_CARD.FINISHED} 
            prevStatusData = {inProgress} 
            title = 'Finished' 
            data = {finished} 
            applyChange = {toMoveCard}
        />
    </div>
};

export default Board;
