import {Injectable} from '@angular/core';

@Injectable(
  {providedIn: 'root'
  }
)

export class CalcCalc {
  //計算まとめ
  calculate(a: number, b: number, operator: string): number {
    if(operator === '+'){
      return a + b;
    }else if(operator === '-'){
      return a - b;
    }else if(operator === '*'){
      return a * b;
    }else if(operator === '/'){
      if(b === 0){
        throw new Error('0で割ることはできません。ACボタンを押してください。');
      }
      return a / b;
    }else if(operator === '%'){
      return a * b / 100;
    }else{
      return 0;
    }
  }
  //整数部分10桁制限＋小数点8位まで表示
  formatResult(result: number): string {
    if (Number.isInteger(result)) {
      const formatted = result.toString();
      if(formatted.length > 10){
        throw new Error('桁オーバーです。整数部分が10桁までの計算しかできません。');
      }
      return formatted;
    }else{
      const formatted = result.toFixed(8).replace(/0+$/, '');
      const integerPart = formatted.split('.')[0];
      if(integerPart.length > 10){
        throw new Error('桁オーバーです。整数部分が10桁までの計算しかできません。');
      }
      return formatted;
    }

    // const formatted = Number.isInteger(result) ? result.toString() : result.toFixed(8).replace(/0+$/, '');
    // if(formatted.length > 10){
    //   throw new Error('桁オーバーです');
    // }
    // return formatted;
  }
}