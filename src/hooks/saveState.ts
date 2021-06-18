import { LOCAL_STORAGE_KEY } from '../constants/localStorage';
import { getStoredValue, setValueInStorage } from '../helpers/storageHelper';



export const useSaveState = (storageKey:string) => {
    const state = getStoredValue(storageKey);
    const saveState = (newState:any) => setValueInStorage(LOCAL_STORAGE_KEY, JSON.stringify(newState));
    return [saveState];
}

export default useSaveState;