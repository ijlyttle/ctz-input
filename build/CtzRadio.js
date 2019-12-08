import { CtzInput } from './CtzInput';
export class CtzRadio extends CtzInput {
    constructor(id) {
        super(id, 'ctz-radio');
        /* handler for form-inputs */
        this._form.oninput = event => {
            // we use arrow notation to preserve the meaning of `this`
            const data = new FormData(this._form);
            const value = data.get(this.id);
            console.log(value);
            this._inputValue = value;
        };
    }
    init(choices, value, submit) {
        // coerce each choice to an object
        // inspired by https://observablehq.com/@jashkenas/inputs#radioDemo
        const choiceSet = choices.map((c) => typeof c === "string" ? { value: c, label: c } : c);
        // remove existing elements from form
        while (this._form.firstChild) {
            this._form.firstChild.remove();
        }
        // set choices
        choiceSet.map((c) => {
            const label = document.createElement('label');
            const input = document.createElement('input');
            input.setAttribute('type', 'radio');
            input.setAttribute('name', this.id);
            input.setAttribute('value', c.value);
            // set value
            input.value === value ?
                input.setAttribute('checked', '') :
                input.removeAttribute('checked');
            label.appendChild(input);
            label.appendChild(document.createTextNode(c.label));
            this._form.appendChild(label);
        });
        super.considerSubmit(submit, 'input');
        // invoke input to set _inputValue
        this._form.dispatchEvent(new CustomEvent('input', { bubbles: true }));
        if (submit) {
            this._form.dispatchEvent(new CustomEvent('submit', { bubbles: true }));
        }
    }
}
//# sourceMappingURL=CtzRadio.js.map