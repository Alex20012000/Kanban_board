import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';

import StatusColumn from './StatusColumn/StatusColumn';

import { useLocalStorage } from '../../../hooks';

import { STATUS_CARD } from './types';
import { ICard } from './Card/types';

import styles from './Board.module.scss';

type FilteredCards = Array<ICard[]>

const Board: FC = () => {
    const [allCards, setAllCards] = useState<Array<ICard>>([]);
    const [backlog] = useMemo(() => allCards.reduce((acc, currCard) => {
        const [backlog] = acc;

        const _backlog = [...backlog];

        switch(currCard.status) {
            case STATUS_CARD.BACKLOG:
                _backlog.push(currCard);
                break;
            default:
                break;
            } 
            return [_backlog];
    }, [[]] as FilteredCards ), [allCards]);

    const [cardsLS, setCardsLS] = useLocalStorage<ICard[]> ('cards', []);

    const onClickSubmit = useCallback((card: ICard | null) => {
        if (card) {
            const _allCards = [...allCards, card];
            setCardsLS(_allCards);
        }
    }, [allCards])

    useEffect(() => {
        cardsLS && setAllCards(cardsLS);
    }, [cardsLS]);

    return <div className = {styles.wrapper}>
        <StatusColumn title = 'Backlog' data = {backlog} addCard = {onClickSubmit}/>
    </div>
};

export default Board;
