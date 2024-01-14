import React, { FC, MouseEvent }  from 'react';

interface Props {
    className?: string,
    onClick?: (event: MouseEvent<HTMLImageElement>) => void,
    alt?: string,
    width?: string | number,
    path: string,
}

const Icon: FC<Props> = ({
    className,
    onClick,
    alt = "",
    width = 24,
    path,
    // ...rest
}) => 
    <img 
        className={className}
        width={Number(width)} 
        onClick={(e) => {onClick && onClick(e)}} 
        src={path} 
        alt={alt} 
    />
;

export default Icon;
