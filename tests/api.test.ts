import api from '../src/api';
import { store } from '../src/store';
import { testInvoicesList } from './data';
import { arrayToObject } from '../src/utils';
import { setInvoices } from '../src/store/invoiceSlice';
import { IInvoice, TObjectOf } from '../src/types';

jest.mock('axios', () => {
    const { testInvoicesList } = require('./data');
    return {
        create: jest.fn(() => ({
            interceptors: {
                request: { use: jest.fn(), eject: jest.fn() },
                response: { use: jest.fn(), eject: jest.fn() }
            },
            get: jest.fn(async url => {
                if (url === 'invoices') {
                    return { data: testInvoicesList };
                }
                return { data: null };
            }),
            post: jest.fn(async url => {
                if (url === 'invoices') {
                    return { data: testInvoicesList[0] };
                }
                return { data: null };
            })
        }))
    };
});

describe('api', () => {
    const getInvoices = (): TObjectOf<IInvoice> => store.getState().invoices.all;

    beforeEach(() => {
        store.dispatch(setInvoices([]));
    });

    test('getRequest', () => {
        expect(getInvoices()).toEqual({});
        api.getInvoices().then(() => {
            expect(getInvoices()).toEqual(arrayToObject(testInvoicesList));
        });
    });

    test('postRequest', () => {
        expect(getInvoices()).toEqual({});
        api.createInvoice(testInvoicesList[0]).then(() => {
            expect(getInvoices()).toEqual(arrayToObject(testInvoicesList.slice(0, 1)));
        });
    });
});
