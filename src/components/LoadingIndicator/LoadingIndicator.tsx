import React from 'react';
import { Spinner } from 'react-bootstrap';
import './LoadingIndicator.scss';

export default function LoadingIndicator(): JSX.Element {
    return (
        <div className="loading-indicator">
            <Spinner animation="border" variant="danger" />
        </div>
    );
}
