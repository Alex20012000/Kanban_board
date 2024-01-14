import React, { FC, MouseEvent, ReactNode } from 'react';

import styles from './Button.module.scss';

interface Props {
    onClick: (e: MouseEvent<HTMLButtonElement>) => void,
    children?: string | string[] | ReactNode,
    disabled?: boolean,
};

const Button: FC<Props> = ({
    onClick,
    children,
    disabled,
}) => {
    return (
        <button  
            disabled={disabled} 
            className={styles.button} 
            onClick={(e) => {onClick(e)}}
        >
            {children}
        </button>
    );
};

export default Button;
