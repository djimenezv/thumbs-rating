export const getStoredValue = (storageKey:string) => {
    const currentValue = localStorage.getItem(storageKey);
    return currentValue;
}

export const setValueInStorage = (storageKey:string, data:any) => {
    localStorage.setItem(storageKey, data); 
}