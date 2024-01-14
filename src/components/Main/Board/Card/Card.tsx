import React, { FC, useEffect, useState } from 'react';

import Input from '../../../common/Input/Input';

import { ICard } from './types';

import styles from './Card.module.scss';

interface Props {
    card?: ICard;
    newCard?: ICard | null;
    setNewCard?: (card: ICard) => void;
}

const Card: FC<Props> = ({card, newCard, setNewCard}) => {
    const [newCardVal, setNewCardVal] = useState('');

    useEffect(() => {
        const _newCard = {...newCard} as ICard;
        _newCard.title = newCardVal;
        console.log('_newCard', _newCard);
        
        setNewCard && setNewCard(_newCard);
    }, [newCardVal])

    if (newCard && !card) return <Input name = 'NewCardInput' onChange = {setNewCardVal} value = {newCardVal}/>;

    return <div className = {styles.wrapper}>
        {card?.title}
    </div>
}

export default Card;
