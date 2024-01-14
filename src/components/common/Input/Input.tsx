import React, { FC } from 'react';

import styles from './Input.module.scss';

interface Props {
    value: string,
    onChange: (value: string) => void,
    placeholder?: string,
    name: string,
    type?: string,
};

const Input: FC<Props> = ({
    value,
    onChange,
    placeholder,
    name,
    type = "text"
}) => {
    return (
        <input 
            className={styles.input} 
            type={type} 
            name={name} 
            placeholder={placeholder} 
            onChange={(e) => {onChange(e.currentTarget.value)}} 
            value={value}
        />
    );
};

export default Input;
