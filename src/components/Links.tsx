import React, { MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';

type TLinkProps = {
    onClick?: MouseEventHandler;
    to?: string;
};

type TPseudoLinkProps = {
    text: string;
    className?: string;
} & TLinkProps;

export function PseudoLink({ text, className, onClick, to }: TPseudoLinkProps): JSX.Element {
    return to ? (
        <Link to={to}>{text}</Link>
    ) : (
        <a
            href="#"
            className={className}
            onClick={
                onClick &&
                (e => {
                    e.preventDefault();
                    onClick(e);
                })
            }>
            {text}
        </a>
    );
}

export function EditLink(props: TLinkProps): JSX.Element {
    return <PseudoLink text="edit" {...props} />;
}

export function RemoveLink(props: TLinkProps): JSX.Element {
    return <PseudoLink text="delete" className="text-danger" {...props} />;
}
