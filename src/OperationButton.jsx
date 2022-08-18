import {ACTIONS} from "./actions";
import './App.scss'

const OperationButton = ({dispatch, operation, color}) => {
  return (
    <button 
        className={`${color}`}
        onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation }})}
    >{operation}</button>
  )
}

export default OperationButton