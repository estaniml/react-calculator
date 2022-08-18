import {ACTIONS} from "./actions";
import {evaluate} from "./App";

const initialState = {
    currOp: 0,
    prevOp: 0,
    operation: 0
}

function reducer(state = initialState, action) {
    switch (action.type) {

        case ACTIONS.ADD_DIGIT: 

            if( state.overwrite ) {
                return {
                    ...state,
                    currOp: action.payload.digit,
                    overwrite: false
                }
            }

            if( action.payload.digit === "0" && state.currOp === "0") return state

            if( action.payload.digit === "." && state.currOp.includes(".") ) return state

            return {
                ...state,
                currOp: `${state.currOp || '' }${action.payload.digit}`
            };
        
        case ACTIONS.CLEAR_DIGIT: 
            if ( state.overwrite) {
                return {
                    ...state,
                    overwrite: false,
                    currOp: null
                } 
            }
            if( state.currOp == null ) return state
            if( state.currOp.length === 1 ) {
                return { ...state, currOp: null }
            }   

            return {
                ...state,
                currOp: state.currOp.slice(0, -1)
            }
        case ACTIONS.CHOOSE_OPERATION:
            if( state.currOp == null && state.prevOp == null ) {return state}
            if( state.prevOp == null ) {
                return {
                    ...state,
                    operation: action.payload.operation,
                    prevOp: state.currOp,
                    currOp: null,
                }
            }
            if(state.currOp == null) {
                return {
                    ...state,
                    operation: action.payload.operation,
                }
            }

            return {
                ...state,
                prevOp: evaluate(state),
                operation: action.payload.operation,
                currOp: null,
            }
        case ACTIONS.CLEAR_ALL:
            return {};
        case ACTIONS.EVALUATE:
            if(state.operation == null || state.prevOp == null || state.currOp == null) {
                return state;
            }
            return {
                ...state,
                prevOp: null,
                operation: null,
                currOp: evaluate(state),
                overwrite: true
            }
    }
}

export default reducer;