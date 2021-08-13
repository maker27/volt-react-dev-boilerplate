import React, { FC } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

type THeaderButtonProps = {
    buttonText: string;
};

type THeaderSimpleButtonProps = {
    onButtonClick?: () => void;
};

type THeaderRouterButtonProps = {
    to: string;
};

const HeaderSimpleButton: FC<THeaderSimpleButtonProps & THeaderButtonProps> = ({
    buttonText,
    onButtonClick
}) => {
    return (
        <Button variant="outline-dark" onClick={onButtonClick}>
            {buttonText}
        </Button>
    );
};

const HeaderRouterButton: FC<THeaderRouterButtonProps & THeaderButtonProps> = ({ buttonText, to }) => {
    return (
        <Button variant="outline-dark" as={Link} to={to}>
            {buttonText}
        </Button>
    );
};

type TListHeaderProps = {
    title: string;
} & THeaderButtonProps &
    THeaderSimpleButtonProps &
    Partial<THeaderRouterButtonProps>;

const ListHeader: FC<TListHeaderProps> = ({ title, buttonText, to, onButtonClick }) => {
    return (
        <h2 className="header">
            {title}
            {to ? (
                <HeaderRouterButton to={to} buttonText={buttonText} />
            ) : (
                <HeaderSimpleButton onButtonClick={onButtonClick} buttonText={buttonText} />
            )}
        </h2>
    );
};

export default ListHeader;
