import { CtzInput } from './CtzInput';
import './css/CtzSlider.css';
export class CtzSlider extends CtzInput {
    constructor(id) {
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
            const value = this._fnPrecision(this._fnTransform(Number(this._slider.value)));
            this._display.innerText = String(value);
            this._inputValue = value;
        };
    }
    _fnTransform(arg0) {
        throw new Error("Method not implemented.");
    }
    _fnPrecision(arg0) {
        throw new Error("Method not implemented.");
    }
    init(min, max, value, step, fnTransform, precision, maxWidth, submit) {
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
        super.considerSubmit(submit, 'input');
        // initialize: invoke input
        this._slider.dispatchEvent(new CustomEvent('input', { bubbles: true }));
        // invoke submit, if applicable
        if (submit) {
            this._form.dispatchEvent(new CustomEvent('submit', { bubbles: true }));
        }
    }
}
//# sourceMappingURL=CtzSlider.js.map