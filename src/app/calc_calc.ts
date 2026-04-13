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
      }else{
      return a / b;
      }
    }else if(operator === '%'){
      return a * b / 100;
    }else{
      return 0;
    }
  }
  //整数部分10桁制限＋小数点8位まで表示
  formatResult(result: number): string {
    // const decimalPart = result.toString().split('.')[1];
    // const integerPart = result.toString().split('.')[0];
    // console.log('decimalPart',decimalPart);
    // if(integerPart && integerPart.length > 10 && !decimalPart){
    //   throw new Error('桁オーバーです。整数部分が10桁までの計算しかできません。');
    // }else if(integerPart && decimalPart && decimalPart.length >8 ){
    //   const decimalPartLimit = decimalPart.slice(0, 8);
    //   const formatted = `${integerPart.slice(0, 10)}.${decimalPart.slice(0, 8)}`;
    //   return formatted;
    // }else{
    //   return result.toString();
    // }
    if (Number.isInteger(result)) {
      const formatted = result.toString();
      if(formatted.length > 10){
        throw new Error('桁オーバーです。整数部分が10桁までの計算しかできません。');
      }
      return formatted;
    }else{
      const str = result.toFixed(9).replace(/0+$/, '');
      const decimalPart = str.split('.')[1];
      const decimalPartLimit = decimalPart.slice(0, 8);
      const integerPart = str.split('.')[0];
      const formatted = `${integerPart.slice(0, 10)}.${decimalPartLimit}`;
      if(integerPart.length > 10){
        throw new Error('桁オーバーです。整数部分が10桁までの計算しかできません。');
      }
      return formatted;
    }
  }
}