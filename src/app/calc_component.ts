import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalcCalc } from './calc_calc';


@Component({
  selector: 'calc-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calc_component.html',
  styleUrl: './calc_component.css'
})



export class CalcComponent {

  constructor(private calcCalc: CalcCalc) {}

  currentValue: string = '0';
  previousValue: string = '';
  operator: string | null = null;
  result: string = '';
  errorMessage: string = '';
  isResultDisplayed: boolean = false; 
  lastPressed: 'equal' | 'number' | 'operator' | null = null;
  lastOperator: string | null = null;
  decimalPart: string | undefined
  percentFlag: boolean = false;
  RootFlag: boolean = false;
  // lastCalleft: string | null = null;
  // lastCalright: string | null = null;
  // lastCalresult: string | null = null;
  // decimalInputError: boolean = false;
  NewWriteFlag: boolean = false;
  displaylock: boolean = false;

  InputNumber(num: string) {
    try{
      // if(this.decimalInputError){
      //   console.log('s1');
      //   return;
      // }
      if(this.lastPressed === 'equal'){
        this.NewWriteFlag = true;
      }
    if(this.isResultDisplayed){
      if(this.currentValue === ''){
        console.log('s2');
        this.currentValue = '0';
      } else if(this.percentFlag || this.RootFlag || this.lastPressed === 'equal'){
        if(num === '.'){
          console.log('s3');
          this.currentValue = '0.';
        }else{
          console.log('s4');
          this.currentValue = num;
        }
        this.NewWriteFlag = true;
      }else{
        this.previousValue = this.currentValue;
        if(num === '.'){
          console.log('s3');
          this.currentValue = '0.';
        }else{
          console.log('s4');
          this.currentValue = num;
        }
      }
      this.isResultDisplayed = false;

    } else if(this.currentValue === '0') {
      console.log('s5');
      this.currentValue = num;
      if(num === '.'){
        this.currentValue = '0.';
      }
    } else if(num === '.') {
      if(this.currentValue.includes('.')) {
        console.log('s6');
        return;
      }else{
        console.log('s7');
        this.currentValue += num;
      }
    }else{
        console.log('s8');
        this.currentValue += num;
      }
    this.formatDisplayValue();
    this.lastPressed = 'number';
    this.consoleLog();
  }catch(error: any){
    console.log(error);
    this.displaylock = true;
    if(error.message === '桁オーバーです。整数部分が10桁までの計算しかできません。' || error.message === '0で割ることはできません。ACボタンを押してください。'){
      this.errorMessage = error.message;
    }else{
      this.errorMessage = '予期せぬエラーが発生しました。';
    }
  }
  }

  setOperator(op: string) {
    try{
      // イコールの後に数字を打って上書きした場合
    if(this.NewWriteFlag){
      this.operator = op;
      this.lastOperator = this.operator;
      this.lastPressed = 'operator';
      this.isResultDisplayed = true;
      this.NewWriteFlag = false;
      this.consoleLog();
      return;
    }
    if(this.lastPressed !== 'number' || ((this.lastPressed !== 'number' && this.operator))){
      this.operator = op;
      this.lastOperator = this.operator;
      this.lastPressed = 'operator';
      console.log('a1');
      this.consoleLog();
      // this.calculateResult();
      return;
    }
    if(this.operator) {
      console.log('a2');
      this.calculateResult();
    }else{
      console.log('a4');
      // this.previousValue = this.currentValue;
    }
    this.operator = op;
    this.isResultDisplayed = true;
    this.lastPressed = 'operator';
    this.consoleLog();
    }catch(error: any){
      console.log(error);
      this.displaylock = true;
      if(error.message === '桁オーバーです。整数部分が10桁までの計算しかできません。' || error.message === '0で割ることはできません。ACボタンを押してください。'){
        this.errorMessage = error.message;
      }else{
        this.errorMessage = '予期せぬエラーが発生しました。';
      }
    }
  }

  Equal() {  
    try{
      if(this.operator){
        if(this.percentFlag){
          if(this.operator === '+' || this.operator === '-'){
            console.log('b4');
            const a = parseFloat(this.currentValue);
            const b = parseFloat(this.previousValue);
            const r = this.calcCalc.calculate(a,b,this.operator || '')
            const formatted = this.calcCalc.formatResult(r);
            this.currentValue = formatted;
            this.previousValue = b.toString();
            this.consoleLog();
          }else if(this.operator === '*'){
            console.log('b5');
            const a = parseFloat(this.currentValue);
            const b = parseFloat(this.previousValue);
            const r = this.calcCalc.calculate(a,b,this.operator || '')
            const formatted = this.calcCalc.formatResult(r);
            this.currentValue = formatted;
            this.previousValue = b.toString();
            this.consoleLog();
          }else if(this.operator === '/'){
            console.log('b6');
            const a = parseFloat(this.currentValue);
            const b = parseFloat(this.previousValue || '0');
            const r = this.calcCalc.calculate(a,b,this.operator || '')
            const formatted = this.calcCalc.formatResult(r);
            this.currentValue = formatted;
            this.previousValue = b.toString();
            this.consoleLog();
          }
          this.lastPressed = 'equal';
          this.lastOperator = this.operator;
          this.isResultDisplayed = true;
          this.errorMessage = '';
          this.percentFlag = false;
          this.RootFlag = false;
          this.consoleLog();
          return;
        }else if(this.lastPressed === 'operator'){
        // イコールの前が演算子だった場合
          if(this.previousValue === ''){
            if(this.operator === '+' || this.operator === '-'){
              this.previousValue = '0';
            }else if(this.operator === '*'){
              this.previousValue = this.currentValue;
            }else if(this.operator === '/'){
              this.previousValue = '1';
            }
          }
          if(this.operator === '+'){
            console.log('b0');
            const a = parseFloat(this.previousValue || '0');
            const b = parseFloat(this.currentValue || '0');
            const r = this.calcCalc.calculate(a,b,this.operator || '')
            const formatted = this.calcCalc.formatResult(r);
            this.currentValue = formatted;
            this.previousValue = b.toString();
          }else if(this.operator === '-'){
            console.log('b1');
            const a = parseFloat(this.previousValue || '0');
            const b = parseFloat(this.currentValue || '0');
            const r = this.calcCalc.calculate(a,b,this.operator || '')
            const formatted = this.calcCalc.formatResult(r);
            this.currentValue = formatted;
            this.previousValue = b.toString();
          }else if(this.operator === '*'){
            console.log('b2');
            const a = parseFloat(this.currentValue);
            const b = parseFloat(this.currentValue);
            const r = this.calcCalc.calculate(a,b,this.operator || '')
            const formatted = this.calcCalc.formatResult(r);
            this.currentValue = formatted;
            this.previousValue = b.toString();
          }else if(this.operator === '/'){
            this.previousValue = '1';
            console.log('b3');
            const a = parseFloat(this.previousValue || '0');
            const b = parseFloat(this.currentValue || '0');
            const r = this.calcCalc.calculate(a,b,this.operator || '')
            const formatted = this.calcCalc.formatResult(r);
            this.currentValue = formatted;
            this.previousValue = b.toString();
          }else{
            throw new Error('想定していません。');
          }
          this.lastPressed = 'equal';
          this.lastOperator = this.operator;
          // this.operator = null;
          this.isResultDisplayed = true;
          this.errorMessage = '';
          this.percentFlag = false;
          this.RootFlag = false;
          // this.NewWriteFlag = false;
          this.consoleLog();
          return;
        }else if(this.lastPressed === 'equal'){
          // イコールの前がイコールだった場合
          this.EqualSequence();
          return;
        }else if(this.lastPressed === 'number'){
          if(this.operator==='*'){
            console.log('b12');
            const a = parseFloat(this.previousValue);
            const b = parseFloat(this.currentValue);
            const r = this.calcCalc.calculate(a,b,this.operator || '')
            const formatted = this.calcCalc.formatResult(r);
            this.currentValue = formatted;
            this.previousValue = a.toString();
          }else{
            console.log('b13');
            const a = parseFloat(this.previousValue);
            const b = parseFloat(this.currentValue);
            const r = this.calcCalc.calculate(a,b,this.operator || '')
            const formatted = this.calcCalc.formatResult(r);
            this.currentValue = formatted;
            this.previousValue = b.toString();
          }
          this.lastPressed = 'equal';
          this.lastOperator = this.operator;
          // this.operator = null;
          this.isResultDisplayed = true;
          this.errorMessage = '';
          this.percentFlag = false;
          this.RootFlag = false;
          this.consoleLog();
          return;
          
          }
      }
          
          this.previousValue = this.currentValue;
          this.lastOperator = this.operator;
          this.operator = null;
          this.errorMessage = '';
          this.isResultDisplayed = true;
          this.lastPressed = 'equal';
          // もしかしたら違うかも
          this.percentFlag = false;
          this.RootFlag = false;
          // this.displayValue = this.currentValue;
          this.consoleLog();
          return;
      }catch(error: any){
        this.displaylock = true;
        if(error.message === '桁オーバーです。整数部分が10桁までの計算しかできません。' || error.message === '0で割ることはできません。ACボタンを押してください。' ||error.message === '小数点8位以下の表示はできません。'){
        this.errorMessage = error.message;
        }else{
        this.errorMessage = '予期せぬエラーが発生しました。';
        }  
      }
    }

  EqualSequence() {
    try{
    if(this.operator === '+'){
      console.log('b7');
      const a = parseFloat(this.currentValue)
      const b = parseFloat(this.previousValue);
      const r = this.calcCalc.calculate(a,b,this.operator || '')
      const formatted = this.calcCalc.formatResult(r);
      this.currentValue = formatted;
      this.previousValue = b.toString();
     }else if(this.operator === '-'){
      console.log('b8');
      const a = parseFloat(this.currentValue);
      const b = parseFloat(this.previousValue);
      const r = this.calcCalc.calculate(a,b,this.operator || '')
      const formatted = this.calcCalc.formatResult(r);
      this.currentValue = formatted;
      this.previousValue = b.toString();
     }else if(this.operator === '*'){
      console.log('b9');
      const a = parseFloat(this.currentValue);
      const b = parseFloat(this.previousValue);
      const r = this.calcCalc.calculate(a,b,this.operator || '')
      const formatted = this.calcCalc.formatResult(r);
      this.currentValue = formatted;
      this.previousValue = b.toString();
    }else if(this.operator === '/'){
      console.log('b10');
      const a = parseFloat(this.currentValue || '0');
      const b = parseFloat(this.previousValue || '0');
      const r = this.calcCalc.calculate(a,b,this.operator || '')
      const formatted = this.calcCalc.formatResult(r);
      this.currentValue = formatted;
      this.previousValue = b.toString();
    }else{
    this.lastPressed = 'equal';
    this.lastOperator = this.operator;
    this.errorMessage = '';
    }
    this.consoleLog();
    this.RootFlag = false;
    this.percentFlag = false;
    this.isResultDisplayed = true;
    return;
  }catch(error: any){
    this.displaylock = true;
    if(error.message === '桁オーバーです。整数部分が10桁までの計算しかできません。' || error.message === '0で割ることはできません。ACボタンを押してください。' ||error.message === '小数点8位以下の表示はできません。'){
    this.errorMessage = error.message;
    }else{
    this.errorMessage = '予期せぬエラーが発生しました。';
    }
  }
  }

  calculateResult() {
    try{
      console.log('d');
      console.log(this.previousValue);
      console.log(this.currentValue);
      const a = parseFloat(this.previousValue);
      const b = parseFloat(this.currentValue);
      const r = this.calcCalc.calculate(a,b,this.operator || '')
      const formatted = this.calcCalc.formatResult(r);
      
      this.previousValue = this.currentValue;
      this.currentValue = formatted;
      this.lastOperator = this.operator;
      this.operator = null;
      this.isResultDisplayed = true;
      // もしかしたら違うかも
      this.percentFlag = false;
      this.RootFlag = false;
      this.consoleLog();
    }catch(error: any){
      this.displaylock = true;
      if(error.message === '桁オーバーです。整数部分が10桁までの計算しかできません。' || error.message === '0で割ることはできません。ACボタンを押してください。' ||error.message === '小数点8位以下の表示はできません。'){
      this.errorMessage = error.message;
      }else{
      this.errorMessage = '予期せぬエラーが発生しました。';
      }

    }
  }

  clear() {
    try{
    this.currentValue = this.currentValue.slice(0,-this.currentValue.length);
    if(this.currentValue === ''){
      this.currentValue = '0';
    }
    this.NewWriteFlag = false;
    this.consoleLog();
    }catch(error: any){
        this.displaylock = true;
        this.errorMessage = '予期せぬエラーが発生しました。';
      }
    }

  clearAll() {
    this.currentValue = '0';
    this.previousValue = '';
    this.result = '';
    this.operator = null;
    this.errorMessage = '';
    this.isResultDisplayed = false;
    this.lastPressed = null;
    this.lastOperator = null;
    // this.decimalInputError = false;
    this.NewWriteFlag = false;
    this.RootFlag = false;
    this.percentFlag = false;
    this.displaylock = false;
    this.consoleLog();
  }
  percent() {
    try{
      if(this.operator === null && this.lastPressed === 'number'){
        this.currentValue = '0';
        return;
      }
      if(this.percentFlag){
        if(this.operator === '+' || this.operator === '-'){
          return;
        }else if(this.operator === '*'){
          const a = parseFloat(this.previousValue);
          const b = parseFloat(this.currentValue);
          const r = this.calcCalc.calculate(a,b,'%')
          const formatted = this.calcCalc.formatResult(r);
          this.currentValue = formatted.toString();
          this.RootFlag = false;
          return;
        }else if(this.operator === '/'){
          const a = parseFloat(this.currentValue);
          const b = parseFloat(this.previousValue)
          const r = a / b * 100
          if(b === 0){
            throw new Error('0で割ることはできません。ACボタンを押してください。');
          }
          const formatted = this.calcCalc.formatResult(r);
          this.currentValue = formatted.toString();
          this.previousValue = b.toString();
          this.RootFlag = false;
          return;
        }
      }
      if(this.currentValue === '0'){
        this.NewWriteFlag = false;
        return;
      }else if(this.lastPressed === 'number'){
        if(this.operator === '+' || this.operator === '-'){
          console.log('c1');
          const a = parseFloat(this.previousValue);
          const b = this.calcCalc.calculate(a,parseFloat(this.currentValue),'%')
          const r = this.calcCalc.calculate(a,b,this.operator || '')
          const formatted = this.calcCalc.formatResult(r);
          this.currentValue = formatted.toString();
        }else if(this.operator === '*'){
          console.log('c2');
          const a = parseFloat(this.previousValue);
          const b = parseFloat(this.currentValue);
          const r = this.calcCalc.calculate(a,b,'%')
          const formatted = this.calcCalc.formatResult(r);
          this.currentValue = formatted.toString();
        }else if(this.operator === '/'){
          console.log('c3');
          if(this.NewWriteFlag){
          const a = parseFloat(this.currentValue);
          const b = parseFloat(this.previousValue)
          if(b === 0){
            throw new Error('0で割ることはできません。ACボタンを押してください。');
          }
          const r = a / b * 100
          const formatted = this.calcCalc.formatResult(r);
          this.currentValue = formatted.toString();
          this.previousValue = b.toString();
          
          }else{
          const a = parseFloat(this.previousValue);
          const b = parseFloat(this.currentValue)
          const r = a / b * 100
          if(b === 0){
            throw new Error('0で割ることはできません。ACボタンを押してください。');
          }
          const formatted = this.calcCalc.formatResult(r);
          this.currentValue = formatted.toString();
          this.previousValue = b.toString();
          }
        }
      }else if(this.lastPressed === 'equal'){
        if(this.operator === '+' || this.operator === '-'){
          // %の前がイコールで演算子が+,-の場合は何もしない
          console.log('c4');
          return;
        }else if(this.operator === '*'){
          console.log('c5');
          const a = parseFloat(this.previousValue);
          const b = parseFloat(this.currentValue);
          const r = this.calcCalc.calculate(a,b,'%')
          const formatted = this.calcCalc.formatResult(r);
          this.currentValue = formatted.toString();
        }else if(this.operator === '/'){
          console.log('c6');
          const a = parseFloat(this.currentValue);
          const b = parseFloat(this.previousValue) / a / 100
          const r = this.calcCalc.calculate(a,b,this.operator || '')
          const formatted = this.calcCalc.formatResult(r);
          this.currentValue = formatted.toString();
          this.previousValue = b.toString();
        }
      }else if(this.lastPressed === 'operator'){
        if(this.operator === '+' || this.operator === '-'){
          console.log('c7');
          // %の前の演算子が+,-の場合は何もしない
          return;
        }else if(this.operator === '*'){
          console.log('c8');
          const a = parseFloat(this.currentValue);
          const b = parseFloat(this.currentValue);
          const r = this.calcCalc.calculate(a,b,'%')
          const formatted = this.calcCalc.formatResult(r);
          this.currentValue = formatted.toString();
        }else if(this.operator === '/'){
          console.log('c9');
          this.previousValue = '1'
          const a = parseFloat(this.previousValue);
          const b = parseFloat(this.currentValue)
          if(b === 0){
            throw new Error('0で割ることはできません。ACボタンを押してください。');
          }
          const r = a / b * 100
          const formatted = this.calcCalc.formatResult(r);
          this.currentValue = formatted.toString();
          this.previousValue = b.toString();
        }
      }
    this.NewWriteFlag = false;
    this.consoleLog();
    this.isResultDisplayed = true;
    this.percentFlag = true;
    this.RootFlag = false;
    
    }catch(error: any){
      this.displaylock = true;
      if(error.message === '桁オーバーです。整数部分が10桁までの計算しかできません。' || error.message === '0で割ることはできません。ACボタンを押してください。' ||error.message === '小数点8位以下の表示はできません。'){
        this.errorMessage = error.message;
      }else{
        this.errorMessage = '予期せぬエラーが発生しました。';
      }
    }
  }

  squareRoot() {
    try{
    if(parseFloat(this.currentValue) < 0){
      throw new Error('負数の平方根は存在しません。');
    }else{
    if(this.currentValue === '' || this.currentValue === '0' || this.currentValue === '0.'){
      return;
    }else{
      if(this.lastPressed === 'operator'){
        const a = parseFloat(this.currentValue);
        const r =Math.sqrt(a);
        const formatted = this.calcCalc.formatResult(r);
        this.currentValue = formatted;
        this.previousValue = a.toString();
      }else{
      const a = parseFloat(this.currentValue);
      const r =Math.sqrt(a);
      const formatted = this.calcCalc.formatResult(r);
      this.currentValue = formatted;
      // this.previousValue = a.toString();
      }
    }
    this.isResultDisplayed = true;
    this.RootFlag = true;
    this.NewWriteFlag = false;
    this.consoleLog();
    }
    }catch(error: any){
      this.displaylock = true;
      if(error.message === '桁オーバーです。整数部分が10桁までの計算しかできません。' || error.message === '負数の平方根は存在しません。'){
        this.errorMessage = error.message;
        }else{
        this.errorMessage = '予期せぬエラーが発生しました。';
        }
    }
  }

  plusMinus() {
    try{

    if(this.currentValue.startsWith('-')){
      this.currentValue = this.currentValue.slice(1);
    }else if(this.currentValue !== '0'){
      this.currentValue = '-' + this.currentValue;
    }

    // if(this.currentValue === ''){
    //   return;
    // }else{
    //   this.currentValue = (-parseFloat(this.currentValue)).toString();

    // }
    this.consoleLog();
  }catch(error: any){
    console.log(error);
    if(error.message === '桁オーバーです。整数部分が10桁までの計算しかできません。'){
      this.errorMessage = error.message;
    }else{
      this.errorMessage = '予期せぬエラーが発生しました。';
    }
  }
  }

  formatDisplayValue(){
  try{
    const decimalPart: string | undefined = this.currentValue.split('.')[1];
    const integerPart: string | undefined = this.currentValue.split('.')[0];
    if(integerPart && integerPart.length > 10 && !decimalPart){
      this.currentValue = integerPart.slice(0, 10);
    }else if(integerPart && decimalPart && decimalPart.length >8 ){
      this.currentValue = `${integerPart.slice(0, 10)}.${decimalPart.slice(0, 8)}`;
        // this.decimalInputError = true;
        // throw new Error('小数点8位以下の表示はできません。');
    }else{
      return this.currentValue;
    }
      return this.currentValue;
  }catch(error: any){
    // this.handleError(error);
    this.displaylock = true;
    if(error.message === '小数点8位以下の表示はできません。'){
      this.errorMessage = error.message;
    }else{
      this.errorMessage = '予期せぬエラーが発生しました。';
    }
    return this.currentValue;
  }
  }

  // calculatehandle(){
  //   try{
  //     const a = parseFloat(this.previousValue);
  //     const b = parseFloat(this.currentValue);
  //     const r = this.calcCalc.calculate(a,b,this.operator || '')
  //     const formatted = this.calcCalc.formatResult(r);
  //     this.currentValue = formatted;
  //     this.previousValue = b.toString();
  //   }catch(error: any){
  //     this.handleError(error);
  //   }
  // }

  // handleError(error: any){
  //   this.displaylock = true;
  //   if(error.message === '桁オーバーです。整数部分が10桁までの計算しかできません。ACボタンを押してください。' || error.message === '0で割ることはできません。ACボタンを押してください。' ||error.message === '小数点8位以下の表示はできません。'){
  //   this.errorMessage = error.message;
  //   }else{
  //   this.errorMessage = '予期せぬエラーが発生しました。ACボタンを押してください。';
  //   }
  //   return this.errorMessage;
  // }

  consoleLog(){
    console.log('--------------------------------');
    console.log('this.previousValue',this.previousValue);
    console.log('this.currentValue',this.currentValue);
    console.log('this.lastPressed',this.lastPressed);
    console.log('this.operator',this.operator);
    console.log('this.lastOperator',this.lastOperator);
    console.log('this.isResultDisplayed',this.isResultDisplayed);
    console.log('this.percentFlag',this.percentFlag);
    console.log('this.RootFlag',this.RootFlag);
    console.log('this.errorMessage',this.errorMessage);
    console.log('this.NewWriteFlag',this.NewWriteFlag);
  }

}