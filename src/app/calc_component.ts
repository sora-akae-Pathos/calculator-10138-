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
  // displayValue = '0';
  errorMessage: string = '';
  isResultDisplayed: boolean = false; 
  lastPressed: 'equal' | 'number' | 'operator' | null = null;
  lastOperator: string | null = null;
  lastInputNumber: string | null = null;
  lastOperand: string | null = null;
  percentFlag: boolean = false;
  lastCalleft: string | null = null;
  lastCalright: string | null = null;
  lastCalresult: string | null = null;
  decimalInputError: boolean = false;
  // NewWriteFlag: boolean = false;

  InputNumber(num: string) {
    try{
      if(this.decimalInputError){
        console.log('s1');
        return;
      }
      // if(this.lastPressed === 'equal'){
      //   this.NewWriteFlag = true;
      // }
    if(this.isResultDisplayed){
      if(this.currentValue === ''){
        console.log('s2');
        this.currentValue = '0';
      } else {
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
    // this.displayValue = this.currentValue;
    this.lastPressed = 'number';
    this.lastInputNumber = this.currentValue;
    // this.percentFlag = false;
    this.consoleLog();
  }catch(error: any){
    console.log(error);
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
      // if(this.NewWriteFlag){
      //   // this.NewWriteFlag = false;
      //   this.operator = op;
      //   this.lastOperator = this.operator;
      //   this.lastPressed = 'operator';
      //   this.isResultDisplayed = true;
      //   this.consoleLog();
      //   return;
      // }
    if(this.lastPressed !== 'number' || ((this.lastPressed !== 'number' && this.operator))){
      this.operator = op;
      this.lastOperator = this.operator;
      this.lastOperand = null;
      this.lastPressed = 'operator';
      console.log('a1');
      this.consoleLog();
      // this.calculateResult();
      return;
    }
    if(this.operator) {
      console.log('a2');
      this.calculateResult();
    }else if (!this.operator && op === '/'){
      console.log('a3');
      if(this.previousValue === ''){
       this.previousValue = '1';
      }else{
      this.previousValue = this.currentValue;
      }
    }else{
      console.log('a4');
      this.previousValue = this.currentValue;
    }
    this.operator = op;
    this.isResultDisplayed = true;
    this.lastPressed = 'operator';
    this.lastOperand = null;
    this.consoleLog();
    }catch(error: any){
      console.log(error);
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
        if(this.lastPressed === 'operator' && this.previousValue !== ''){
        // イコールの前が演算子だった場合
          if(this.operator === '+'){
            console.log('b0');
            const a = parseFloat(this.lastCalright || '0');
            const b = parseFloat(this.currentValue || '0');
            const r = this.calcCalc.calculate(a,b,this.operator || '')
            const formatted = this.calcCalc.formatResult(r);
            this.currentValue = formatted;
            this.lastCalleft = a.toString();
            this.lastCalright = b.toString();
            this.lastCalresult = r.toString();
          }else if(this.operator === '-'){
            console.log('b1');
            const a = parseFloat(this.lastCalright || '0');
            const b = parseFloat(this.currentValue || '0');
            const r = this.calcCalc.calculate(a,b,this.operator || '')
            const formatted = this.calcCalc.formatResult(r);
            this.currentValue = formatted;
            this.lastCalleft = a.toString();
            this.lastCalright = b.toString();
            this.lastCalresult = r.toString();
          }else if(this.operator === '*'){
            console.log('b2');
            const a = parseFloat(this.currentValue);
            const b = parseFloat(this.currentValue);
            const r = this.calcCalc.calculate(a,b,this.operator || '')
            const formatted = this.calcCalc.formatResult(r);
            this.currentValue = formatted;
            this.lastCalleft = a.toString();
            this.lastCalright = b.toString();
            this.lastCalresult = r.toString();
          }else if(this.operator === '/'){
            console.log('b3');
            const a = parseFloat(this.currentValue || '0');
            const b = parseFloat(this.previousValue || '0');
            const r = this.calcCalc.calculate(a,b,this.operator || '')
            const formatted = this.calcCalc.formatResult(r);
            this.currentValue = formatted;
            this.lastCalleft = a.toString();
            this.lastCalright = b.toString();
          }else{
            throw new Error('想定していません。');
            // if(this.operator === '/'){
            //   const a = parseFloat(this.currentValue || '0');
            //   const b = parseFloat(this.previousValue || '0');
            //   const r = this.calcCalc.calculate(a,b,this.operator || '')
            //   const formatted = this.calcCalc.formatResult(r);
            //   this.currentValue = formatted;
            //   this.lastCalleft = a.toString();
            //   this.lastCalright = b.toString();
            //   this.lastCalresult = r.toString();
            // }
            // throw new Error('想定していません。');
          }
          this.lastPressed = 'equal';
          this.lastOperator = this.operator;
          // this.operator = null;
          this.isResultDisplayed = true;
          this.errorMessage = '';
          this.percentFlag = false;
          this.consoleLog();
          return;
        }else if(this.percentFlag){
          if(this.operator === '+' || this.operator === '-'){
            console.log('b4');
            const a = parseFloat(this.currentValue);
            const b = parseFloat(this.previousValue);
            const r = this.calcCalc.calculate(a,b,this.operator || '')
            const formatted = this.calcCalc.formatResult(r);
            this.currentValue = formatted;
            this.consoleLog();
          }else if(this.operator === '*'){
            console.log('b5');
            const a = parseFloat(this.currentValue);
            const b = parseFloat(this.previousValue);
            const r = this.calcCalc.calculate(a,b,this.operator || '')
            const formatted = this.calcCalc.formatResult(r);
            this.currentValue = formatted;
            this.consoleLog();
          }else if(this.operator === '/'){
            console.log('b6');
            const a = parseFloat(this.currentValue);
            const b = parseFloat(this.lastInputNumber || '0');
            const r = this.calcCalc.calculate(a,b,this.operator || '')
            const formatted = this.calcCalc.formatResult(r);
            this.currentValue = formatted;
            this.consoleLog();
          }
          this.lastPressed = 'equal';
          this.lastOperator = this.operator;
          this.isResultDisplayed = true;
          this.errorMessage = '';
          this.percentFlag = false;
          this.consoleLog();
          return;
        // }else if(this.NewWriteFlag){
        //   if(this.operator === '+'){
        //     console.log('b5');
        //     // this.NewWriteFlag = false; 
        //     const a = parseFloat(this.currentValue);
        //     const b = parseFloat(this.lastOperand || '0');
        //     const r = this.calcCalc.calculate(a,b,this.operator || '')
        //     const formatted = this.calcCalc.formatResult(r);
        //     this.currentValue = formatted;
        //   }else if(this.operator === '-'){
        //     console.log('b6');
        //     const a = parseFloat(this.currentValue);
        //     const b = parseFloat(this.lastInputNumber || '0');
        //     const r = this.calcCalc.calculate(a,b,this.operator || '')
        //     const formatted = this.calcCalc.formatResult(r);
        //     this.currentValue = formatted;
        //   }else if(this.operator === '*'){
        //     console.log('b7');
        //     const a = parseFloat(this.currentValue);
        //     const b = parseFloat(this.lastInputNumber || '0');
        //     const r = this.calcCalc.calculate(a,b,this.operator || '')
        //     const formatted = this.calcCalc.formatResult(r);
        //     this.currentValue = formatted;
        //   }
        //   else if(this.operator === '/'){
        //     console.log('b8');
        //     const a = parseFloat(this.currentValue);
        //     const b = parseFloat(this.lastInputNumber || '0');
        //     const r = this.calcCalc.calculate(a,b,this.operator || '')
        //     const formatted = this.calcCalc.formatResult(r);
        //     this.currentValue = formatted;
        //   }
        //   this.consoleLog();
        //   return;

        }else if(this.lastPressed === 'equal'){
          // イコールの前がイコールだった場合
          this.EqualSequence();
          return;
        }
        if(this.operator==='*'){
          console.log('b11');
          const a = parseFloat(this.currentValue);
          const b = parseFloat(this.previousValue);
          const r = this.calcCalc.calculate(a,b,this.operator || '')
          const formatted = this.calcCalc.formatResult(r);
          this.currentValue = formatted;
          this.lastCalleft = a.toString();
          this.lastCalright = b.toString();
          this.lastCalresult = r.toString();
          this.previousValue = a.toString();
          this.consoleLog();
        }else{
          console.log('b12');
          const a = parseFloat(this.previousValue);
          const b = parseFloat(this.currentValue);
          const r = this.calcCalc.calculate(a,b,this.operator || '')
          const formatted = this.calcCalc.formatResult(r);
          this.currentValue = formatted;
          this.lastCalleft = a.toString();
          this.lastCalright = b.toString();
          this.lastCalresult = r.toString();
          this.consoleLog();
        }
        this.lastPressed = 'equal';
        this.lastOperator = this.operator;
        // this.operator = null;
        this.isResultDisplayed = true;
        this.errorMessage = '';
        this.percentFlag = false;
        this.consoleLog();
        return;
        }
        
        this.previousValue = this.currentValue;
        // this.currentValue = formatted;
        this.lastOperator = this.operator;
        this.operator = null;
        this.errorMessage = '';
        this.isResultDisplayed = true;
        this.lastPressed = 'equal';
        // this.lastCalleft = a.toString();
        // もしかしたら違うかも
        this.percentFlag = false;
        // this.displayValue = this.currentValue;
        this.consoleLog();
        return;
      }catch(error: any){
        if(error.message === '桁オーバーです。整数部分が10桁までの計算しかできません。' || error.message === '0で割ることはできません。ACボタンを押してください。' ||error.message === '小数点8位以下の表示はできません。'){
        this.errorMessage = error.message;
        }else{
        this.errorMessage = '予期せぬエラーが発生しました。';
        }  
      }
    }

  EqualSequence() {
    if(this.operator === '+'){
      console.log('b7');
      const a = parseFloat(this.lastCalright || '0')
      const b = parseFloat(this.currentValue);
      const r = this.calcCalc.calculate(a,b,this.operator || '')
      const formatted = this.calcCalc.formatResult(r);
      this.currentValue = formatted;
      this.lastCalleft = a.toString();
      this.lastCalright = b.toString();
      this.lastCalresult = r.toString();
     }else if(this.operator === '-'){
      console.log('b8');
      const a = parseFloat(this.currentValue || '0');
      const b = parseFloat(this.lastCalright || '0');
      const r = this.calcCalc.calculate(a,b,this.operator || '')
      const formatted = this.calcCalc.formatResult(r);
      this.currentValue = formatted;
      this.lastCalleft = a.toString();
      this.lastCalright = b.toString();
      this.lastCalresult = r.toString();
     }else if(this.operator === '*'){
      console.log('b9');
      const a = parseFloat(this.currentValue);
      const b = parseFloat(this.lastCalright || '0');
      const r = this.calcCalc.calculate(a,b,this.operator || '')
      const formatted = this.calcCalc.formatResult(r);
      this.currentValue = formatted;
      this.lastCalleft = a.toString();
      this.lastCalright = b.toString();
      this.lastCalresult = r.toString();
    }else if(this.operator === '/'){
      console.log('b10');
      const a = parseFloat(this.lastCalresult || '0');
      const b = parseFloat(this.lastCalright || '0');
      const r = this.calcCalc.calculate(a,b,this.operator || '')
      const formatted = this.calcCalc.formatResult(r);
      this.currentValue = formatted;
      this.lastCalleft = a.toString();
      this.lastCalright = b.toString();
      this.lastCalresult = r.toString();
    }else{
    this.lastPressed = 'equal';
    this.lastOperator = this.operator;
    this.isResultDisplayed = true;
    this.errorMessage = '';
    this.percentFlag = false;
    }
    return;
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
      this.errorMessage = '';
      this.isResultDisplayed = true;
      this.lastCalleft = a.toString();
      this.lastCalright = b.toString();
      // もしかしたら違うかも
      this.percentFlag = false;
      // this.displayValue = this.currentValue;
      this.consoleLog();
    }catch(error: any){
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
    this.consoleLog();
    }catch(error: any){
      console.log(error);
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
    this.percentFlag = false;
    this.lastCalleft = null;
    this.lastCalright = null;
    this.lastCalresult = null;
    this.lastOperator = null;
    this.lastInputNumber = null;
    this.lastOperand = null;
    // this.NewWriteFlag = false;
    this.consoleLog();
  }
  percent() {
    try{
      if(this.currentValue === '0'){
        return;
      }

      // if(this.NewWriteFlag){
      //   if(this.operator === '+'){
      //     console.log('c6');
      //     this.NewWriteFlag = false; 
      //     return;
      //   }else if(this.operator === '-'){
      //     console.log('c7');
      //     return;
      //   }else if(this.operator === '*'){
      //     console.log('c8');
      //     return;
      //   }else if(this.operator === '/'){
      //     console.log('c9');
      //     return;
      //   }
      //   this.consoleLog();
      //   return;

      // }
      
      if(this.lastPressed === 'operator'){
        if(this.operator === '+' || this.operator === '-'){
        console.log('c1');
        return;
        }else if(this.operator === '*'){
          console.log('c4');
          const a = parseFloat(this.previousValue);
          const b = parseFloat(this.currentValue);
          const r = this.calcCalc.calculate(a,b,'%')
          const formatted = this.calcCalc.formatResult(r);
          this.currentValue = formatted.toString();
          return;

        }else if(this.operator === '/'){
          console.log('c5');
          const a = parseFloat(this.previousValue);
          const b = parseFloat(this.currentValue);
          const r = this.calcCalc.calculate(a,b,'%')
          const formatted = this.calcCalc.formatResult(r);
          this.currentValue = formatted.toString();
          return;

        }

      }
      if(this.lastPressed === 'equal'){
      console.log('c2');
      const a = parseFloat(this.previousValue);
      const b = parseFloat(this.currentValue);
      const r = this.calcCalc.calculate(a,b,'%')
      const formatted = this.calcCalc.formatResult(r);
      // console.log('result',result);
      // console.log('currentValue',this.currentValue);
      // console.log('previousValue',this.previousValue);
      // this.previousValue = this.currentValue;
      this.currentValue = formatted;
      this.errorMessage = '';
      this.isResultDisplayed = true;
      this.percentFlag = true;
      // this.displayValue = this.currentValue;
      this.consoleLog();
      }else{
      console.log('c3');
          if(this.operator === '+' || this.operator === '-'){
          const a = parseFloat(this.previousValue);
          const b = parseFloat(this.currentValue);
          const r = this.calcCalc.calculate(a,b,'%')
          const formatted = this.calcCalc.formatResult(r);
          if(this.operator === '+'){
            this.currentValue = formatted.toString();
          // const formatted2 = Number(formatted) + Number(this.previousValue);
          // const formatted3 = this.calcCalc.formatResult(formatted2);
          //   this.currentValue = formatted3.toString();
          }else if(this.operator === '-'){
          const formatted2 = Number(formatted) - Number(this.previousValue);
          const formatted3 = this.calcCalc.formatResult(formatted2);
          this.currentValue = formatted3.toString();
          }
        }else if(this.operator === '*'){
          const a = parseFloat(this.previousValue);
          const b = parseFloat(this.currentValue);
          const r = this.calcCalc.calculate(a,b,'%')
          const formatted = this.calcCalc.formatResult(r);
          this.currentValue = formatted.toString();
          // const formatted2 = Number(formatted) * Number(this.previousValue);
          // const formatted3 = this.calcCalc.formatResult(formatted2);
          // this.currentValue = formatted3.toString();
        }else if(this.operator === '/'){
          const a = parseFloat(this.previousValue);
          const b = parseFloat(this.currentValue);
          const r = Number(b)/100
          this.currentValue = r.toString();
        }
      // console.log('result',result);
      // console.log('currentValue',this.currentValue);
      // console.log('previousValue',this.previousValue);
      // this.previousValue = this.currentValue;
      this.errorMessage = '';
      this.isResultDisplayed = true;
      this.percentFlag = true;

      }
    this.isResultDisplayed = true;
    
    }catch(error: any){
      console.log(error);
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
      if(this.lastPressed === 'equal'){
        const a = parseFloat(this.currentValue);
        const r =Math.sqrt(a);
        const formatted = this.calcCalc.formatResult(r);
        this.currentValue = formatted;
        this.lastCalresult = r.toString();
      }else{
      const a = parseFloat(this.currentValue);
      const r =Math.sqrt(a);
      const formatted = this.calcCalc.formatResult(r);
      this.currentValue = formatted;
      }
    // this.displayValue = this.currentValue;
    // console.log('squareRoot');
    // console.log('currentValue',this.currentValue);
    // console.log('previousValue',this.previousValue);
    }
    this.isResultDisplayed = true;
    this.consoleLog();
    }
    }catch(error: any){
      console.log(error);
      if(error.message === '桁オーバーです。整数部分が10桁までの計算しかできません。' || error.message === '負数の平方根は存在しません。'){
        this.errorMessage = error.message;
        }else{
        this.errorMessage = '予期せぬエラーが発生しました。';
        }
    }
  }

  plusMinus() {
    try{
    if(this.currentValue === ''){
      return;
    }else{
      this.currentValue = (-parseFloat(this.currentValue)).toString();
      this.lastInputNumber = this.currentValue;
    }
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
    const decimalPart: string | undefined = this.currentValue.split('.')[1];
    if(decimalPart && decimalPart.length >8){
      // console.log('z9');
      this.decimalInputError = true;
      throw new Error('小数点8位以下の表示はできません。');
    }else{
      // console.log('z10');
      return this.currentValue;
    }
  }

  errorReturnNumber(){
    this.currentValue = '0';
    this.previousValue = '0';
    this.result = '';
    this.operator = null;
    // this.errorMessage = '';
    this.isResultDisplayed = false;
    this.lastPressed = null;
    this.lastCalleft = null;
    this.lastOperator = null;
    this.lastInputNumber = null;
    // this.doubleequalFlag = false;
    return '0';
  }

  consoleLog(){
    console.log('--------------------------------');
    console.log('this.previousValue',this.previousValue);
    console.log('this.currentValue',this.currentValue);
    console.log('this.lastInputNumber',this.lastInputNumber);
    console.log('this.lastOperand',this.lastOperand);
    console.log('this.lastPressed',this.lastPressed);
    console.log('this.operator',this.operator);
    console.log('this.lastOperator',this.lastOperator);
    console.log('this.isResultDisplayed',this.isResultDisplayed);
    console.log('this.percentFlag',this.percentFlag);
    console.log('this.lastCalleft',this.lastCalleft);
    console.log('this.lastCalright',this.lastCalright);
    console.log('this.errorMessage',this.errorMessage);
    // console.log('this.NewWriteFlag',this.NewWriteFlag);
  }

}



// type CalcPhase = 'input' | 'operator' | 'result';

// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { CalcCalc } from './calc_calc';

// @Component({
//   selector: 'calc-component',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './calc_component.html',
//   styleUrl: './calc_component.css'
// })
// export class CalcComponent {

//   state: CalcPhase = 'input';
//   currentValue: string = '0';
//   previousValue: string = '';
//   operator: string | null = null;
//   lastOperand: string | null = null; // イコール連打用
//   errorMessage: string = '';

//   constructor(private calcCalc: CalcCalc) {}

//   InputNumber(num: string) {
//     try {
//       if (this.state === 'result') {
//         this.currentValue = num;
//         this.previousValue = '';
//         this.operator = null;
//         this.lastOperand = null;
//         this.state = 'input';
//       } else if (num === '.' && this.currentValue.includes('.')) {
//         return;
//       } else {
//         this.currentValue = this.currentValue === '0' && num !== '.' ? num : this.currentValue + num;
//       }
//       this.formatDisplayValue();
//     } catch (error: any) {
//       this.errorMessage = error.message || '予期せぬエラーが発生しました。';
//     }
//   }

//   setOperator(op: string) {
//     try {
//       if (this.operator && this.state === 'input') {
//         this.calculateResult();
//       }
//       this.operator = op;
//       this.previousValue = this.currentValue;
//       this.state = 'operator';
//       this.lastOperand = null; // 演算子変更で連続イコールリセット
//     } catch (error: any) {
//       this.errorMessage = error.message || '予期せぬエラーが発生しました。';
//     }
//   }

//   Equal() {
//     try {
//       if (!this.operator) return;

//       const a = parseFloat(this.previousValue);
//       let b: number;

//       if (this.state === 'result' && this.lastOperand !== null) {
//         // 連続イコール押下時
//         b = parseFloat(this.lastOperand);
//       } else {
//         b = parseFloat(this.currentValue);
//         this.lastOperand = this.currentValue; // 次の連打用に保存
//       }

//       const r = this.calcCalc.calculate(a, b, this.operator);
//       this.currentValue = this.calcCalc.formatResult(r);
//       this.previousValue = this.currentValue;
//       this.state = 'result';
//     } catch (error: any) {
//       this.errorMessage = error.message || '予期せぬエラーが発生しました。';
//     }
//   }

//   calculateResult() {
//     if (!this.operator) return;
//     const a = parseFloat(this.previousValue);
//     const b = parseFloat(this.currentValue);
//     const r = this.calcCalc.calculate(a, b, this.operator);
//     this.currentValue = this.calcCalc.formatResult(r);
//     this.previousValue = this.currentValue;
//     this.state = 'result';
//     this.operator = null;
//     this.lastOperand = b.toString();
//   }

//   clear() {
//     this.currentValue = '0';
//   }

//   clearAll() {
//     this.currentValue = '0';
//     this.previousValue = '';
//     this.operator = null;
//     this.lastOperand = null;
//     this.state = 'input';
//     this.errorMessage = '';
//   }

//   percent() {
//     if (!this.operator) return;
//     const a = parseFloat(this.previousValue);
//     const b = parseFloat(this.currentValue);
//     const r = this.calcCalc.calculate(a, b, '%');
//     this.currentValue = this.calcCalc.formatResult(r);
//     this.state = 'result';
//     this.lastOperand = this.currentValue; // イコール連打対応
//   }

//   squareRoot() {
//     const a = parseFloat(this.currentValue);
//     if (a < 0) {
//       this.errorMessage = '負数の平方根は存在しません。';
//       return;
//     }
//     const r = Math.sqrt(a);
//     this.currentValue = this.calcCalc.formatResult(r);
//     this.state = 'result';
//   }

//   plusMinus() {
//     this.currentValue = (-parseFloat(this.currentValue)).toString();
//   }

//   formatDisplayValue() {
//     const decimalPart = this.currentValue.split('.')[1];
//     if (decimalPart && decimalPart.length > 8) {
//       throw new Error('小数点8位以下の表示はできません。');
//     }
//   }
// }