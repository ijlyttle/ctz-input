export class CtzInput {
  _id: string;
  _container: HTMLElement;
  _label: HTMLLabelElement;
  _form: HTMLFormElement;
  _description: HTMLElement;
  _value: any;
  _inputValue: any;

  constructor(id: string, cls: string) {

    /* determine parent-element */
    const parent: HTMLElement | null = document.getElementById(id);

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

  set label_text(label: string) {
    this._label.innerText = label;
  }

  get description_text() {
    return this._description.innerText;
  }

  set description_text(description: string) {
    this._description.innerText = description;
  }

  get value() {
    return this._value;
  }

  considerSubmit(submit: string | boolean | undefined, verb: string) {

    if (submit) {

      /* if we have a submit:
       *   add button
       *   supress the input event for at the "top" level
       */
      const label: string = typeof submit === 'string' ? submit : 'Submit';

      // create, populate submit-button
      const btnSubmit: HTMLInputElement = document.createElement('input');
      btnSubmit.setAttribute('type', 'submit');
      btnSubmit.setAttribute('value', label);

      // append button to form
      this._form.appendChild(btnSubmit);

      // prevent the default action (page reload)
      this._form.onsubmit = (event: Event) => {
        event.preventDefault();
      };

      // stop propogation of "previous" action
      this._container.addEventListener(verb, (event: Event) => {
        event.stopPropagation();
      });

    }

    // define the event we want to monitor
    const action = submit ? 'submit' : verb;

     // when monitored event occurs, and if the value has changed, dispatch `ctz-value` 
    this._container.addEventListener(action, (event: Event) => {
      // console.log(`${this._value} ${this._inputValue}`)
      if (this._value !== this._inputValue) {
        this._value = this._inputValue;
        this._container.dispatchEvent(new CustomEvent('ctz-value', {bubbles: true}));
      }
    });

  }

}
