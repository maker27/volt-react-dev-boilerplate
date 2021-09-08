import { addCustomer, deleteCustomer, emptyCustomer } from '../../src/store/customerSlice';
import { store } from '../../src/store';
import { ICustomer } from '../../src/types';
import { testCustomersList } from '../data';

describe('customersReducer', () => {
    let newCustomer: ICustomer;

    beforeEach(() => {
        newCustomer = {
            ...testCustomersList[0]
        };
    });

    test('check initial state', () => {
        const state = store.getState().customers;
        expect(state.all).toEqual({});
        expect(state.current).toEqual(emptyCustomer);
    });

    test('add new customer', () => {
        store.dispatch(addCustomer(newCustomer));
        const state = store.getState().customers;
        const addedCustomer = state.all[newCustomer.id];
        expect(addedCustomer).toEqual(newCustomer);
    });

    test('edit customer', () => {
        store.dispatch(addCustomer(newCustomer));
        let state = store.getState().customers;
        const addedCustomer = state.all[newCustomer.id];
        expect(addedCustomer).toEqual(newCustomer);

        store.dispatch(addCustomer({ ...newCustomer, phone: '' }));
        state = store.getState().customers;
        const editedCustomer = state.all[newCustomer.id];
        expect(editedCustomer).toEqual({ ...newCustomer, phone: '' });
    });

    test('delete customer', () => {
        store.dispatch(addCustomer(newCustomer));

        store.dispatch(deleteCustomer(newCustomer));
        const state = store.getState().customers;
        const deletedCustomer = state.all[newCustomer.id];
        expect(deletedCustomer).toBeUndefined();
    });
});
