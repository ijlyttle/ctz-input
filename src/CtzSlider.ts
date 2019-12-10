import {CtzInput} from './CtzInput';
import './css/CtzSlider.css'

export class CtzSlider extends CtzInput {
  _fnTransform(arg0: number): any {
    throw new Error("Method not implemented.");
  }
  _fnPrecision(arg0: any) {
    throw new Error("Method not implemented.");
  }
  _slider: HTMLInputElement;
  _display: HTMLOutputElement;

  constructor(id: string) {

    super(id, 'ctz-slider');

    /* slider */
    this._slider = document.createElement('input');
    this._slider.setAttribute('type', 'range');

    /* display */
    this._display = document.createElement('output');

    /* populate form */
    this._form.appendChild(this._slider);
    this._form.appendChild(this._display);

    /* listnener */
    this._slider.oninput = event => {

      console.log(this._fnTransform);

      const value =
        this._fnPrecision(
          this._fnTransform(
            Number(this._slider.value)
          )
        );

      this._display.innerText = String(value);
      this._value = value;
    };
  }

  init(min: number, max: number, value: number, step: number, 
       fnTransform: (x: number) => number, precision: number, maxWidth: number) {

    this._slider.setAttribute('min', String(min));
    this._slider.setAttribute('max', String(max));
    this._slider.setAttribute('step', String(step));
    // set the value after min/max/step
    this._slider.setAttribute('value', String(value));
    this._slider.setAttribute('style', `width: 100%; max-width:${maxWidth}`);

    this._fnTransform = fnTransform;
    this._fnPrecision =
      precision ?
       x => {
         const byTen = Math.pow(10, precision);
         return Math.round(x * byTen) / byTen;
       } :
       x => x;

    // invoke input
    this._slider.dispatchEvent(new CustomEvent('input'));
  }

}
