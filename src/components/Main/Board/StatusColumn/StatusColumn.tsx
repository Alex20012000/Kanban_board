import React, { FC, useCallback, useState } from 'react';
import { v4 } from 'uuid';

import Card from '../Card/Card';
import Button from '../../../common/Button/Button';

import { STATUS_CARD } from '../types';
import { ICard } from '../Card/types';

import Icon from '../../../common/Icon/Icon';
import AddIcon from '../../../../assets/icons/add-card.svg';

import styles from './StatusColumn.module.scss';
import cn from 'classnames';

//todo типизировать title как Enun
interface Props {
    title: string;
    data: ICard[];
    prevStatusData?: ICard[];
    status: STATUS_CARD;
    applyChange: (card: ICard | null) => void;
}

const StatusColumn: FC<Props> = ({
    title, 
    data, 
    applyChange, 
    prevStatusData, 
    status,
}) => {
    const [newCard, setNewCard] = useState<ICard | null>(null);
    const [showSelectorCard, setShowSelectorCard] = useState<boolean>(false);
    const isBacklog = status === STATUS_CARD.BACKLOG;

    const addCardEmpty = useCallback(() => {
        isBacklog
            ? setNewCard({
                id: v4(),
                title: '', 
                description: '',
                status: STATUS_CARD.BACKLOG
            }) 
            : !!prevStatusData?.length && setShowSelectorCard(true)
    }, [prevStatusData]);

    const onSelect = useCallback((cardId: string) => {
        const selectedCard = prevStatusData?.find(({id}) => id === cardId);
        
        if (selectedCard) {
            const _selectedCard = {...selectedCard};
            _selectedCard.status = status;
            applyChange(_selectedCard);
            console.log('_selectedCard', _selectedCard);
        }
        
        setShowSelectorCard(false);

    }, [applyChange, newCard]);

    const onSubmit = useCallback(() => {
        if (newCard?.title) {
            applyChange(newCard);
            setNewCard(null);
        }  
    }, [applyChange, newCard]);

    return <div className = {styles.wrapper}>
        <h2 className = {styles.title}>{title}</h2>

        <div className = {styles.cards}>
            {data?.map((card) => <Card key={card.id} card = {card} />)}
        </div>

        {newCard && isBacklog && <div className = {styles.newCard}><Card newCard = {newCard} setNewCard = {setNewCard} /></div>}
        {showSelectorCard && !isBacklog && 
            <div className = {styles.selectCard}>
                <Card 
                    selectCard = {onSelect} 
                    prevStatusCards = {prevStatusData} 
                    setNewCard = {setNewCard} 
                />
            </div>
        }
        
        {!newCard 
            ? !showSelectorCard && <div 
            className = {cn(styles.addCard, {
                [styles.addCard_disabled]: !isBacklog && !prevStatusData?.length
            })}
            onClick = {addCardEmpty}>
                <Icon width = {16} path = {AddIcon} alt='Add card' />
                <span className = {styles.addCardText}>Add card</span>
            </div>
            : isBacklog && <Button disabled = {!newCard.title} onClick = {onSubmit}>Submit</Button>
        }
    </div>
};

export default StatusColumn;
