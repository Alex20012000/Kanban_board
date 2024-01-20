import React, { FC, useCallback, useMemo, useState } from 'react';

import { ICard } from '../Board/Card/types';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocalStorage } from '../../../hooks';

import Icon from '../../common/Icon/Icon';
import CloseIcon from '../../../assets/icons/add-card.svg';

import styles from './EditCard.module.scss';

const EditCard: FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [cardsLS, setCardsLS] = useLocalStorage<ICard[]> ('cards', []);

    const [cardIndex, setCardIndex] = useState<null | number>(null);
    const selectedCard: ICard | undefined = useMemo(() => cardsLS?.find((card, idx) => {
        const resultCompare = card.id === id;
        resultCompare && setCardIndex(idx);
        return resultCompare;
    }), [id]);

    const [title, setTitle] = useState(selectedCard?.title);
    const [description, setDescription] = useState(selectedCard?.description);

    const onChange = useCallback((name: 'title' | 'description') => (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        name === 'title' && setTitle(e.target.value);
        name === 'description' && setDescription(e.target.value);
    }, [selectedCard]);

    const onSaveAndClose = useCallback(() => {
        if (cardsLS && typeof cardIndex === 'number') {
            const newCardsLS = [...cardsLS];
            newCardsLS[cardIndex] = {...selectedCard, title, description} as ICard;
            setCardsLS(newCardsLS);
            setTimeout(() => {navigate('/')}, 0);
        }
    }, [cardsLS, cardIndex, title, description]);

    return (
        <div className = {styles.wrapper}> 
            <Icon 
                onClick = {onSaveAndClose} 
                className = {styles.close} 
                width = {24} 
                path = {CloseIcon} 
                alt='Close Icon'
            /> 
            <input 
                className = {styles.title} 
                value = {title} 
                onChange = {onChange('title')} 
            />
            <textarea 
                className = {styles.description} 
                value = {description ? description : 'This task has no description'} 
                onChange = {onChange('description')} 
            />
        </div>
    )
}

export default EditCard;
