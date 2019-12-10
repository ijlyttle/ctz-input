import './css/CtzInput.css';
export class CtzInput {
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
            // TODO: need a better way to enforce legal values of `verb`
            if (verb === "oninput" || verb === "onchange") {
                this._container[verb] = (event) => {
                    event.stopPropagation();
                };
            }
        }
    }
}
//# sourceMappingURL=CtzInput.js.map