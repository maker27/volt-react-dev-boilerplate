import React, { useEffect, useState } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import './App.scss';
import { Container } from 'react-bootstrap';
import NavBar from '../NavBar';
import InvoicesList from '../InvoicesList';
import ProductsList from '../ProductsList';
import CustomersList from '../CustomersList';
import { appName, routes } from '../../assets/constants';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import InfoPanel from '../InfoPanel';
import api from '../../api';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import InvoiceEdit from '../InvoiceEdit';
import InvoiceCreate from '../InvoiceCreate';

function App(): JSX.Element {
    const location = useLocation();
    const [initialization, setInitialization] = useState(true);
    const loading = useSelector((state: RootState) => state.status.loading);

    useEffect(() => {
        api.getAllData().then(() => {
            setInitialization(false);
        });
    }, []);

    useEffect(() => {
        const currentPage = Object.values(routes).find(({ url }) => url === location.pathname);
        document.title = currentPage?.title ?? appName;
    }, [location]);

    if (initialization) return <LoadingIndicator />;

    return (
        <Container>
            <NavBar />
            <InfoPanel />
            <Switch>
                <Route exact path={routes.invoices.url} component={InvoicesList} />
                <Route path={routes.products.url} component={ProductsList} />
                <Route path={routes.customers.url} component={CustomersList} />
                <Route path={routes.invoices_create.url} component={InvoiceCreate} />
                <Route path={routes.invoices_edit.url} component={InvoiceEdit} />
            </Switch>
            {loading && <LoadingIndicator />}
        </Container>
    );
}

export default App;
