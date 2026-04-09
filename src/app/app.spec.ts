import { TestBed } from '@angular/core/testing';
import { CalcComponent } from './calc_component';
import { CalcCalc } from './calc_calc';

describe('CalcComponent sequence test', () => {
  let component: CalcComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CalcComponent],
      providers: [CalcCalc]
    });

    const fixture = TestBed.createComponent(CalcComponent);
    component = fixture.componentInstance;
  });

  it('6 + 3 = + 1 = → 10 になる', () => {
    component.InputNumber('6');
    component.setOperator('+');
    component.InputNumber('3');
    component.Equal(); // =
    component.setOperator('+');
    component.InputNumber('1');
    component.Equal(); // =

    expect(component.currentValue).toBe('10');
  });

  it('9 * 5 = + = → 54 になる', () => {
    component.InputNumber('9');
    component.setOperator('*');
    component.InputNumber('5');
    component.Equal(); // =
    component.setOperator('+');
    component.Equal(); // =

    expect(component.currentValue).toBe('54');
  });

  it('6 + = = → 12 になる', () => {
    component.InputNumber('6');
    component.setOperator('+');
    component.Equal(); // =
    component.Equal(); // =

    expect(component.currentValue).toBe('12');
  });

  it('6 - = = → -12 になる', () => {
    component.InputNumber('6');
    component.setOperator('-');
    component.Equal(); // =
    component.Equal(); // =

    expect(component.currentValue).toBe('-12');
  });

  it('6 * = = → 216 になる', () => {
    component.InputNumber('6');
    component.setOperator('*');
    component.Equal(); // =
    component.Equal(); // =

    expect(component.currentValue).toBe('216');
  });

  it('5 / = = → 0.04 になる', () => {
    component.InputNumber('5');
    component.setOperator('/');
    component.Equal(); // =
    component.Equal(); // =

    expect(component.currentValue).toBe('0.04');
  });

  it('5 + 1 = = → 7 になる', () => {
    component.InputNumber('5');
    component.setOperator('+');
    component.InputNumber('1');
    component.Equal(); // =
    component.Equal(); // =

    expect(component.currentValue).toBe('7');
  });

  it('5 * 3 = = → 75 になる', () => {
    component.InputNumber('5');
    component.setOperator('*');
    component.InputNumber('3');
    component.Equal(); // =
    component.Equal(); // =

    expect(component.currentValue).toBe('75');
  });

  it('2 * 3 = * 2 = → 12 になる', () => {
    component.InputNumber('2');
    component.setOperator('*');
    component.InputNumber('3');
    component.Equal(); // =
    component.setOperator('*');
    component.InputNumber('2');
    component.Equal(); // =

    expect(component.currentValue).toBe('12');
  });

  it('2 * 3 = * 2 = = → 72 になる', () => {
    component.InputNumber('2');
    component.setOperator('*');
    component.InputNumber('3');
    component.Equal(); // =
    component.setOperator('*');
    component.InputNumber('2');
    component.Equal(); // =
    component.Equal(); // =

    expect(component.currentValue).toBe('72');
  });



  it('80 + 10 % = → 88 になる', () => {
    component.InputNumber('80');
    component.setOperator('+');
    component.InputNumber('10');
    component.percent(); // %
    component.Equal(); // =

    expect(component.currentValue).toBe('88');
  });

  it('9 * 5 =  * 2 % = → 40.5 になる', () => {
    component.InputNumber('9');
    component.setOperator('*');
    component.InputNumber('5');
    component.Equal(); // =

    component.setOperator('*');
    component.InputNumber('2');
    component.percent();         // %
    component.Equal(); // =

    expect(component.currentValue).toBe('40.5');
  });

  it('9 * 5 =  * 2 % = = → 1822.5 になる', () => {
    component.InputNumber('9');
    component.setOperator('*');
    component.InputNumber('5');
    component.Equal(); // =

    component.setOperator('*');
    component.InputNumber('2');
    component.percent();         // %
    component.Equal(); // =
    component.Equal(); // =

    expect(component.currentValue).toBe('1822.5');
  });

  it('9 * 9 = √ % + = → 9.81 になる', () => {
    component.InputNumber('9');
    component.setOperator('*');
    component.InputNumber('9');
    component.Equal(); // =

    component.squareRoot();      // √
    component.percent();         // %
    component.setOperator('+');  // +
    component.Equal(); // =

    expect(component.currentValue).toBe('9.81');
  });

  it('9 * 5 = + 6 % → 47.7 になる', () => {
    component.InputNumber('9');
    component.setOperator('*');
    component.InputNumber('5');
    component.Equal(); // =

    component.setOperator('+');  // +
    component.InputNumber('6');
    component.percent();         // %

    expect(component.currentValue).toBe('47.7');
  });

  it('9 * 5 = + 6 % = → 92.7 になる', () => {
    component.InputNumber('9');
    component.setOperator('*');
    component.InputNumber('5');
    component.Equal(); // =

    component.setOperator('+');  // +
    component.InputNumber('6');
    component.percent();         // %
    component.Equal(); // =

    expect(component.currentValue).toBe('92.7');
  });

  it('9 * 5 = + 6 % = = → 137.7 になる', () => {
    component.InputNumber('9');
    component.setOperator('*');
    component.InputNumber('5');
    component.Equal(); // =

    component.setOperator('+');  // +
    component.InputNumber('6');
    component.percent();         // %
    component.Equal(); // =
    component.Equal(); // =

    expect(component.currentValue).toBe('137.7');
  });

  it('9 + 2 = = → 13 になる', () => {
    component.InputNumber('9');
    component.setOperator('+');
    component.InputNumber('2');
    component.Equal(); // =
    component.Equal(); // =

    expect(component.currentValue).toBe('13');
  });

  it('9 + 2 = = 9 → 9 になる', () => {
    component.InputNumber('9');
    component.setOperator('+');
    component.InputNumber('2');
    component.Equal(); // =
    component.Equal(); // =

    component.InputNumber('9');

    expect(component.currentValue).toBe('9');
  });

  it('9 + 2 = = 9 + = = → 20 になる', () => {
    component.InputNumber('9');
    component.setOperator('+');
    component.InputNumber('2');
    component.Equal(); // =
    component.Equal(); // =

    component.InputNumber('9');
    component.setOperator('+');
    component.Equal(); // =
    component.Equal(); // =

    expect(component.currentValue).toBe('20');
  });

  it('9 * 2 = = 8 * = → 64 になる', () => {
    component.InputNumber('9');
    component.setOperator('*');
    component.InputNumber('2');
    component.Equal(); // =
    component.Equal(); // =

    component.InputNumber('8');
    component.setOperator('*');  // *
    component.Equal(); // =

    expect(component.currentValue).toBe('64');
  });

  it('9 * 2 = = = 5 / = → 0.2 になる', () => {
    component.InputNumber('9');
    component.setOperator('*');
    component.InputNumber('2');
    component.Equal(); // =
    component.Equal(); // =
    component.Equal(); // =

    component.InputNumber('5');
    component.setOperator('/');  // /
    component.Equal(); // =

    expect(component.currentValue).toBe('0.2');
  });

  it('9 - % → 9 になる', () => {
    component.InputNumber('9');
    component.setOperator('-');
    component.percent();         // %

    expect(component.currentValue).toBe('9');
  });

  it('9 + % → 9 になる', () => {
    component.InputNumber('9');
    component.setOperator('+');
    component.percent();         // %

    expect(component.currentValue).toBe('9');
  });

  it('9 * % → 0.81 になる', () => {
    component.InputNumber('9');
    component.setOperator('*');
    component.percent();         // %

    expect(component.currentValue).toBe('0.81');
  });

  it('1 / % → 100 になる', () => {
    component.InputNumber('1');
    component.setOperator('/');
    component.percent();         // %

    expect(component.currentValue).toBe('100');
  });

  it('100 / 4 % = = → 625 になる', () => {
    component.InputNumber('100');
    component.setOperator('/');
    component.InputNumber('4');
    component.percent();         // %
    component.Equal(); // =
    component.Equal(); // =

    expect(component.currentValue).toBe('625');
  });

});