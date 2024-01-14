import React, { FC } from 'react';

import styles from './Footer.module.scss'

interface Props {
}

const Footer: FC<Props> = () => {
    return <footer className = {styles.wrapper}>
        Footer
    </footer>
}

export default Footer;
