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
  previousValue: string = '0';
  operator: string | null = null;
  result: string = '';
  // displayValue = '0';
  errorMessage: string = '';
  isResultDisplayed: boolean = false; 
  lastPressed: 'equal' | 'number' | 'operator' | null = null;
  lastOperator: string | null = null;
  lastInputNumber: string | null = null;
  percentFlag: boolean = false;
  lastCalleft: string | null = null;

  InputNumber(num: string) {
    try{
    if(this.isResultDisplayed){
      if(this.currentValue === ''){
        this.currentValue = '0';
      } else {
        this.previousValue = this.currentValue;
        if(num === '.'){
          this.currentValue = '0.';
        }else{
          this.currentValue = num;
        }
      }
      this.isResultDisplayed = false;

    } else if(this.currentValue === '0') {
      this.currentValue = num;
      if(num === '.'){
        this.currentValue = '0.';
      }
    } else if(num === '.') {
      if(this.currentValue.includes('.')) {
        return;
      }else{
        this.currentValue += num;
      }
    }else{
      this.currentValue += num;
    }
    // this.displayValue = this.currentValue;
    this.lastPressed = 'number';
    this.lastInputNumber = this.currentValue;
    // this.percentFlag = false;
    this.cosoleLog();
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
    if(this.lastPressed === 'operator'){
      console.log('a');
      return;
    }
    if(this.operator) {
      console.log('b');
      this.calculateResult();
    }else{
      console.log('c');
      // this.previousValue = this.currentValue;
    }
    this.operator = op;
    this.isResultDisplayed = true;
    this.lastPressed = 'operator';
    this.cosoleLog();
    }catch(error: any){
      console.log(error);
      if(error.message === '桁オーバーです。整数部分が10桁までの計算しかできません。' || error.message === '0で割ることはできません。ACボタンを押してください。'){
        this.errorMessage = error.message;
      }else{
        this.errorMessage = '予期せぬエラーが発生しました。';
      }
    }
  }

  calculateResult() {
    try{
    if(this.lastPressed === 'equal'){
      if(this.percentFlag){
        const a = parseFloat(this.lastCalleft || '0');
        const b = parseFloat(this.currentValue);
        const r = this.calcCalc.calculate(a,b,this.lastOperator || '')
        const result = this.calcCalc.formatResult(r);
        this.currentValue = result;
        this.lastCalleft = a.toString();
        this.percentFlag = false;
        this.isResultDisplayed = true;
        this.lastPressed = 'equal';
        this.cosoleLog();
        return;
      }else{
      console.log('d');
      this.previousValue = this.currentValue;
      const a = parseFloat(this.previousValue);
      const b = parseFloat(this.lastInputNumber || '0');
      const r = this.calcCalc.calculate(a,b,this.lastOperator || '');
      const formatted = this.calcCalc.formatResult(r);
      this.previousValue = this.currentValue;
      this.currentValue = formatted;

      // this.displayValue = this.currentValue;
      // if (this.lastOperator === '+'){
      //   const r = a + b;
      //   const formatted = this.calcCalc.formatResult(r);
      // this.previousValue = this.currentValue
      // this.currentValue = formatted.toString();
      // }else if(this.lastOperator === '-'){
      //   const r = a - b;
      //   const formatted = this.calcCalc.formatResult(r);
      // this.previousValue = this.currentValue
      // this.currentValue = formatted.toString();
      // }else if(this.lastOperator === '*'){
      //   const r = a * b;
      //   const formatted = this.calcCalc.formatResult(r);
      // this.previousValue = this.currentValue
      // this.currentValue = formatted.toString();
      // }else if(this.lastOperator === '/'){
      //   const r = a / b;
      //   const formatted = this.calcCalc.formatResult(r);
      // this.previousValue = this.currentValue
      // this.currentValue = formatted.toString();
      // }
      this.cosoleLog();
      return;
      }
    }else if(!this.operator || this.previousValue === '0'){
      console.log('e');
      this.previousValue = this.currentValue;
    }else{
      console.log('f');
      const a = parseFloat(this.previousValue);
      const b = parseFloat(this.currentValue);
      const r = this.calcCalc.calculate(a,b,this.operator)
      const formatted = this.calcCalc.formatResult(r);
      
      this.previousValue = this.currentValue;
      this.currentValue = formatted;
      this.lastOperator = this.operator;
      this.operator = null;
      this.errorMessage = '';
      this.isResultDisplayed = true;
      this.lastPressed = 'equal';
      this.lastCalleft = a.toString();
      // this.displayValue = this.currentValue;
    }
    this.cosoleLog();
    }catch(error: any){
      if(error.message === '桁オーバーです。整数部分が10桁までの計算しかできません。' || error.message === '0で割ることはできません。ACボタンを押してください。'){
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
    this.cosoleLog();
    }catch(error: any){
      console.log(error);
        this.errorMessage = '予期せぬエラーが発生しました。';
      }
    }

  clearAll() {
    this.currentValue = '0';
    this.previousValue = '0';
    this.result = '';
    this.operator = null;
    this.errorMessage = '';
    this.isResultDisplayed = false;
    // this.displayValue = '0';
    this.lastPressed = null;
    this.percentFlag = false;
    this.lastCalleft = null;
    this.lastOperator = null;
    this.lastInputNumber = null;
    this.cosoleLog();
  }
  percent() {
    try{
    if(this.currentValue === ''){
      console.log('q1');
      return;
    }else if (this.percentFlag || this.lastPressed === 'equal'){
      const a = parseFloat(this.lastCalleft || '0');
      const b = parseFloat(this.currentValue);
      const r = this.calcCalc.calculate(a,b,'%')
      const formatted = this.calcCalc.formatResult(r);
      // console.log('result',result);
      // console.log('currentValue',this.currentValue);
      // console.log('previousValue',this.previousValue);
      this.currentValue = formatted;
      this.lastCalleft = a.toString();
      this.percentFlag = true;
      console.log('q2');
      this.cosoleLog();

    }else if(this.previousValue === '0'){
      console.log('q3');
      this.cosoleLog();
      return;
    }else{
      console.log('q4');
      const a = parseFloat(this.previousValue);
      const b = parseFloat(this.currentValue);
      const r = this.calcCalc.calculate(a,b,'%')
      const formatted = this.calcCalc.formatResult(r);
      // console.log('result',result);
      // console.log('currentValue',this.currentValue);
      // console.log('previousValue',this.previousValue);
      this.lastCalleft = a.toString();
      // this.previousValue = this.currentValue;
      this.currentValue = formatted;
      this.errorMessage = '';
      this.isResultDisplayed = true;
      this.percentFlag = true;
      // this.displayValue = this.currentValue;
      this.cosoleLog();

    }
    this.isResultDisplayed = true;
    console.log('percent');
    }catch(error: any){
      console.log(error);
      if(error.message === '桁オーバーです。整数部分が10桁までの計算しかできません。' || error.message === '0で割ることはできません。ACボタンを押してください。'){
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
    if(this.currentValue === ''){
      return;
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
    this.cosoleLog();
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
    }
    this.cosoleLog();
  }catch(error: any){
    console.log(error);
    if(error.message === '桁オーバーです。整数部分が10桁までの計算しかできません。'){
      this.errorMessage = error.message;
    }else{
      this.errorMessage = '予期せぬエラーが発生しました。';
    }
  }
  }

  cosoleLog(){
    console.log('--------------------------------');
    console.log('this.previousValue',this.previousValue);
    console.log('this.currentValue',this.currentValue);
    console.log('this.lastInputNumber',this.lastInputNumber);
    console.log('this.lastPressed',this.lastPressed);
    console.log('this.operator',this.operator);
    console.log('this.isResultDisplayed',this.isResultDisplayed);
    console.log('this.percentFlag',this.percentFlag);
    console.log('this.lastCalleft',this.lastCalleft);
    console.log('this.errorMessage',this.errorMessage);
  }

}
