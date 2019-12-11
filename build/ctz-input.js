(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.ctzInput = {}));
}(this, (function (exports) { 'use strict';

  class CtzInput {
      constructor(id, cls) {
          /* determine parent-element */
          const parent = document.getElementById(id);
          /* id - set once using private method */
          this._id = `${id}-container`;
          /* container */
          this._container = document.createElement('div');
          this._container.setAttribute('id', this.id);
          this._container.setAttribute('class', `${cls} ctz-input`);
          /* label */
          this._label = document.createElement('label');
          this._label.setAttribute('for', this.id);
          /* form */
          this._form = document.createElement('form');
          /* description */
          this._description = document.createElement('div');
          this._description.setAttribute('class', 'description');
          /* assemble */
          this._container.appendChild(this._label);
          this._container.appendChild(this._form);
          this._container.appendChild(this._description);
          if (parent !== null) {
              /* add container to parent */
              parent.appendChild(this._container);
          }
      }
      get id() {
          return this._id;
      }
      set id(id) {
          console.log("Warning: CtzInput cannot set id");
      }
      get label_text() {
          return this._label.innerText;
      }
      set label_text(label) {
          this._label.innerText = label;
      }
      get description_text() {
          return this._description.innerText;
      }
      set description_text(description) {
          this._description.innerText = description;
      }
      get value() {
          return this._value;
      }
      considerSubmit(submit, verb) {
          if (submit) {
              /* if we have a submit:
               *   add button
               *   supress the input event for at the "top" level
               */
              const label = typeof submit === 'string' ? submit : 'Submit';
              // create, populate submit-button
              const btnSubmit = document.createElement('input');
              btnSubmit.setAttribute('type', 'submit');
              btnSubmit.setAttribute('value', label);
              // append button to form
              this._form.appendChild(btnSubmit);
              // prevent the default action (page reload)
              this._form.onsubmit = (event) => {
                  event.preventDefault();
              };
              // stop propogation of "previous" action
              this._container.addEventListener(verb, (event) => {
                  event.stopPropagation();
              });
          }
          // define the event we want to monitor
          const action = submit ? 'submit' : verb;
          // when monitored event occurs, and if the value has changed, dispatch `ctz-value` 
          this._container.addEventListener(action, (event) => {
              // console.log(`${this._value} ${this._inputValue}`)
              if (this._value !== this._inputValue) {
                  this._value = this._inputValue;
                  this._container.dispatchEvent(new CustomEvent('ctz-value', { bubbles: true }));
              }
          });
      }
  }

  class CtzRadio extends CtzInput {
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
          // initialize: invoke input 
          this._form.dispatchEvent(new CustomEvent('input', { bubbles: true }));
          // invoke submit, if applicable
          if (submit) {
              this._form.dispatchEvent(new CustomEvent('submit', { bubbles: true }));
          }
      }
  }

  class CtzSlider extends CtzInput {
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

  exports.CtzInput = CtzInput;
  exports.CtzRadio = CtzRadio;
  exports.CtzSlider = CtzSlider;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ctz-input.js.map
