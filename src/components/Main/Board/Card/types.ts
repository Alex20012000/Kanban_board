import { STATUS_CARD } from '../types';

export interface ICard {
    id: string;
    title: string;
    description: string;
    status: STATUS_CARD;
};
