export interface State {
    items : Array<any>
}

export const initialState : State = {
    items : []    
};

export const reducer = (state :State, action: any) => {
  switch (action.type) {
    case 'LOAD':
      return {
        items: [...action.payload]
    };
    case 'VOTE': {
        return {
            items: state.items.map(i => {
                return i.id === action.payload.id
                    ? { 
                        ...i, 
                        votes: {
                            positive : i.vote === 'UP' ? i.votes.positive + 1 :i.votes.positive,
                            negative : i.vote === 'DOWN' ? i.votes.negative + 1 :i.votes.negative                             
                        },
                        vote: 'DONE'
                    }   
                    : { ...i }            
            })
        };
    };
    case 'SET_VOTE': {
        return {
            items: state.items.map(i => {
                        return i.id === action.payload.id
                            ? { ...i, vote: action.payload.vote }
                            : { ...i }            
            })
            
        }
    }
    default:
      throw new Error();
  }
};

