import React, { FC } from 'react';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

import styles from './Layout.module.scss';

interface Props {
}

const Layout: FC<Props> = () => {
    return <div className = {styles.wrapper}>
        <Header />
        <Main />
        <Footer />
    </div>
}

export default Layout;
