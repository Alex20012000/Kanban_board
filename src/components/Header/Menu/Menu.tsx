import React from 'react';

import Icon from '../../common/Icon/Icon';

import UserAvatarIcon from '../../../assets/icons/user-avatar.svg';
import ArrowIcon from '../../../assets/icons/arrow-down.svg';

import styles from './Menu.module.scss';

const Menu = () => {
    return <div className = {styles.wrapper}>
        <Icon width={40} onClick={() => {console.log('clickAvatar');}} path={UserAvatarIcon} />
        <Icon onClick={() => {console.log('clickAvatar');}} path={ArrowIcon} />
    </div> 
}

export default Menu;
