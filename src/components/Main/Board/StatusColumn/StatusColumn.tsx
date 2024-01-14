import React, { FC, useCallback, useState } from 'react';
import { v4 } from 'uuid';

import Card from '../Card/Card';
import Button from '../../../common/Button/Button';

import { STATUS_CARD } from '../types';
import { ICard } from '../Card/types';

import Icon from '../../../common/Icon/Icon';
import AddIcon from '../../../../assets/icons/add-card.svg';

import styles from './StatusColumn.module.scss';

//todo типизировать title как Enun
interface Props {
    title: string;
    data: ICard[];
    addCard: (card: ICard | null) => void;
}

const StatusColumn: FC<Props> = ({title, data, addCard}) => {
    const [newCard, setNewCard] = useState<ICard | null>(null);

    const addCardEmpty = useCallback(() => {
        setNewCard({
            id: v4(),
            title: '', 
            description: '',
            status: STATUS_CARD.BACKLOG
        })
    }, []);

    const onSubmit = useCallback(() => {
        addCard(newCard);
        setNewCard(null);
    }, [addCard, newCard]);

    return <div className = {styles.wrapper}>
        <h2 className = {styles.title}>{title}</h2>
        <div className = {styles.cards}>
            {data?.map((card) => <Card key={card.id} card = {card} />)}
        </div>
        {newCard && <div className = {styles.newCard}><Card newCard = {newCard} setNewCard = {setNewCard} /></div>}
        {!newCard ? <div className = {styles.addCard} onClick = {addCardEmpty}>
            <Icon width = {16} path = {AddIcon} alt='Add card' />
            <span className = {styles.addCardText}>Add card</span>
        </div> :
        <Button onClick = {onSubmit}>Submit</Button>}
    </div>
};

export default StatusColumn;
