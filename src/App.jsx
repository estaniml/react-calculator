import { useReducer } from 'react'
import { ACTIONS } from './actions'
import './App.scss'
import DigitButton from './DigitButton'
import OperationButton from './OperationButton'
import reducer from './reducer'

export const evaluate = ({currOp, prevOp, operation}) => {
  const prev = parseFloat(prevOp)
  const curr = parseFloat(currOp)
  if (isNaN(prev) || isNaN(curr)) return ""
  let computation = ""
  switch (operation) {
    case "+":
      computation = prev + curr
      break
    case "-":
      computation = prev - curr
      break
    case "*":
      computation = prev * curr
      break
    case "/":
      computation = prev / curr
      break
  }
  return computation.toString()
}

const INTEGER_FORMATER = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 0,
})

const formatOperand = (operand) => {
  if(operand == null) return
  const [integer, decimal] = operand.split(".")
  if(decimal == null) return INTEGER_FORMATER.format(integer)
  return `${INTEGER_FORMATER.format(integer)}.${decimal}`
}

function App() {

  const [ state , dispatch] = useReducer(reducer, {})

  return (
    <div className='container'>
      <div className='calculator'>
        <div className='output' >
          <p className='prev'>{formatOperand(state.prevOp)}{state.operation}</p>
          <p className='curr'>{formatOperand(state.currOp)}</p>
        </div>
        <button className='ac operators-h' onClick={() => dispatch({type: ACTIONS.CLEAR_ALL})}>AC</button>
        <button className='operators-h' onClick={() => dispatch({type: ACTIONS.CLEAR_DIGIT})}>DEL</button>
        <OperationButton operation='/' dispatch={dispatch} color="operators-v" />
        <DigitButton digit='7' dispatch={dispatch} />
        <DigitButton digit='8' dispatch={dispatch} />
        <DigitButton digit='9' dispatch={dispatch} />
        <OperationButton operation='*' dispatch={dispatch} color="operators-v" />
        <DigitButton digit='4' dispatch={dispatch} />
        <DigitButton digit='5' dispatch={dispatch} />
        <DigitButton digit='6' dispatch={dispatch} />
        <OperationButton operation='-' dispatch={dispatch} color="operators-v" />
        <DigitButton digit='1' dispatch={dispatch} />
        <DigitButton digit='2' dispatch={dispatch} />
        <DigitButton digit='3' dispatch={dispatch} />
        <OperationButton operation='+' dispatch={dispatch} color="operators-v" />
        <DigitButton digit='.' dispatch={dispatch} />
        <DigitButton digit='0' dispatch={dispatch} />
        <button className='equal' onClick={() => dispatch({type: ACTIONS.EVALUATE})}>=</button>
      </div>
    </div>
  )
}

export default App
