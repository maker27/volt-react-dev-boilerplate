import statusReducer, {
    addStatus,
    initialState,
    removeStatus,
    setLoadAction,
    TStatus
} from '../../src/store/statusSlice';
import { store } from '../../src/store';

describe('statusReducer', () => {
    let newStatus: TStatus;

    beforeEach(() => {
        newStatus = {
            id: Date.now(),
            type: 1,
            value: 'Any error'
        };
    });

    test('returns initial state', () => {
        const updatedState = statusReducer(undefined, { type: 'nothing' });
        expect(updatedState).toEqual(initialState);
    });

    test('returns new state for addStatus', () => {
        const updatedState = statusReducer(initialState, addStatus(newStatus));
        expect(updatedState).toEqual({
            ...initialState,
            list: [newStatus]
        });
    });

    test('returns new state for removeStatus', () => {
        const updatedState = statusReducer(
            { ...initialState, list: [newStatus] },
            removeStatus(newStatus.id)
        );
        expect(updatedState).toEqual(initialState);
    });

    test('returns new state for setLoadAction', () => {
        const updatedStateWithTrue = statusReducer(initialState, setLoadAction(true));
        expect(updatedStateWithTrue).toEqual({
            ...initialState,
            loading: true
        });
        const updatedStateWithFalse = statusReducer(initialState, setLoadAction(false));
        expect(updatedStateWithFalse).toEqual({
            ...initialState,
            loading: false
        });
    });

    test('check default values', () => {
        const state = store.getState().status;
        expect(state.list).toEqual([]);
        expect(state.loading).toBeFalsy();
    });
});
