import {CtzInput} from './CtzInput';
import './css/CtzRadio.css'

export class CtzRadio extends CtzInput {

  constructor(id: string) {

    super(id, 'ctz-radio');

    /* handler for form-inputs */
    this._form.oninput = event => {
      // we use arrow notation to preserve the meaning of `this`
      const data = new FormData(this._form);
      const value = data.get(this.id);

      this._inputValue = value;
    };

  }

  init(choices: (string | object)[], value: string, submit: string | boolean | undefined) {

    interface Choice {
      value: string;
      label: string;
    }

    // coerce each choice to an object
    // inspired by https://observablehq.com/@jashkenas/inputs#radioDemo
    const choiceSet = choices.map((c: string | object) : Choice  =>
      typeof c === "string" ? {value: c, label: c} : c as Choice
    );

    // remove existing elements from form
    while (this._form.firstChild) {
      this._form.firstChild.remove();
    }

     // set choices
     choiceSet.map((c: Choice) : void => {
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

    // initialize: invoke input 
    this._form.dispatchEvent(new CustomEvent('input', {bubbles: true}));

    // invoke submit, if applicable
    if (submit) {
      this._form.dispatchEvent(new CustomEvent('submit', {bubbles: true}));
    }
    
  }

}
