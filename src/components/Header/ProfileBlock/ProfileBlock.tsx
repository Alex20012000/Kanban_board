import React, { useState } from 'react';
import cn from 'classnames';

import Menu from './Menu/Menu';

import Icon from '../../common/Icon/Icon';
import UserAvatarIcon from '../../../assets/icons/user-avatar.svg';
import ArrowIcon from '../../../assets/icons/arrow-down.svg';

import styles from './ProfileBlock.module.scss';

const ProfileBlock = () => {
    const [showMenu, setShowMenu] = useState<boolean | number>(false);
    return <div className = {styles.wrapper}>
        <div className = {styles.block} onClick = {() => {setShowMenu((prev) => !prev)}}>
            <Icon width={40} path={UserAvatarIcon} />
            <Icon className = {cn({[styles.arrowRevers]: showMenu})} path={ArrowIcon} />
        </div>     
        {showMenu && <Menu  />}
    </div>
}

export default ProfileBlock;
