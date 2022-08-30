class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
  }

  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operator = undefined
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  chooseOperation(operator) {
      if(this.currentOperand==='') return
      if(this.previousOperand!==''){  //if we want to cal. 55+25, this if condition helps to display "55+" in place of previous operand 
            this.compute();
      }
    this.operator = operator
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  compute() {
      let computation
      const prev = parseFloat(this.previousOperand) //converts string to number
      const curr = parseFloat(this.currentOperand)
      if(isNaN(prev) || isNaN(curr)) return  //if prev or current is empty, print empty
      switch(this.operator){
            case '+':
                  computation=prev+curr
                  break;
            case '-':
                  computation=prev-curr
                  break;
            case '*':
                  computation=prev*curr
                  break;
            case '/':
                  computation=prev/curr
                  break;
            default:
                  return
      }
      this.currentOperand = computation
      this.operator = undefined
      this.previousOperand = ''
    
  }

  

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.currentOperand;
    if(this.operator!=null){
      this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operator}`
    }
    
   
  }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operator]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})


deleteButton.addEventListener('click', () => {
      calculator.delete()
      calculator.updateDisplay()
})   

allClearButton.addEventListener('click', () => {
      calculator.clear();
      calculator.updateDisplay();
})

equalsButton.addEventListener('click', () =>{
      calculator.compute();
      calculator.updateDisplay();
})

