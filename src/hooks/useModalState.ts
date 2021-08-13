import { Dispatch, useEffect, useState } from 'react';

export enum modalModes {
    'create',
    'edit',
    'delete'
}

const modes = [{ mode: 'create', okText: 'Add' }, { mode: 'edit', okText: 'Save' }, { mode: 'delete' }];

export default function useModalState(
    mode: modalModes
): [{ mode: string; okText?: string }, Dispatch<modalModes>] {
    const [currentMode, setCurrentMode] = useState<modalModes>(0);
    useEffect(() => {
        setCurrentMode(mode);
    }, [mode]);
    return [modes[currentMode], setCurrentMode];
}
