import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Input from '../../../common/Input/Input';

import { ICard } from './types';

import styles from './Card.module.scss';

interface Props {
    card?: ICard;
    newCard?: ICard | null;
    prevStatusCards?: ICard[];
    selectCard?: (cardId: string) => void;
    setNewCard?: (card: ICard) => void;
}

const Card: FC<Props> = ({
    card, 
    newCard, 
    setNewCard, 
    prevStatusCards,
    selectCard,
}) => {
    const [newCardVal, setNewCardVal] = useState('');

    useEffect(() => {
        if (newCardVal) {
            const _newCard = {...newCard} as ICard;
            _newCard.title = newCardVal;
            setNewCard && setNewCard(_newCard);
        }
    }, [newCardVal]);

    if (prevStatusCards && prevStatusCards.length) {
        return <select className = {styles.input} onChange = {(e) => {
            selectCard && selectCard(e.target.value);
        }}>
            <option key = {'default'} value = {0}>Выберете карточку...</option>
            {prevStatusCards.map((card) => <option key = {card.id} value = {card.id}>{card.title}</option>)}
        </select>
    } 

    if (newCard && !card) return <Input name = 'NewCardInput' onChange = {setNewCardVal} value = {newCardVal}/>;

    return <Link to = {`card/${card?.id}`}>
        <div className = {styles.wrapper}>
            {card?.title}
        </div>
    </Link>
}

export default Card;
