import React, { FC } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { appName, routes } from '../assets/constants';
import { Link } from 'react-router-dom';

const menuList = [
    [routes.invoices.url, 'Invoices'],
    [routes.products.url, 'Products'],
    [routes.customers.url, 'Customers']
];

type TNavBarLinkProps = {
    text: string;
    url: string;
};

const NavBarLink: FC<TNavBarLinkProps> = ({ text, url }) => {
    return (
        <Nav.Link as={Link} to={url}>
            {text}
        </Nav.Link>
    );
};

export default function NavBar(): JSX.Element {
    return (
        <Navbar bg="light" variant="light">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    {appName}
                </Navbar.Brand>
                <Nav className="me-auto">
                    {menuList.map(([url, text]) => (
                        <NavBarLink key={url} text={text} url={url} />
                    ))}
                </Nav>
            </Container>
        </Navbar>
    );
}
