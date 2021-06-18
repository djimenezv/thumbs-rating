export interface Action {
    payload: any;
    type: string;
}


export const LOAD = (data: any) => ({
    payload: data,
    type: 'LOAD'
});

export const SET_VOTE = (itemId: number, vote:string | null) => ({
    payload: {
        id: itemId,
        vote: vote
    },
    type: 'SET_VOTE'
});

export const VOTE = (itemId: number) => ({
    payload: {
        id: itemId
    },
    type: 'VOTE'
});

