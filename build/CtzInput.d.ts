export declare class CtzInput {
    _id: string;
    _container: HTMLElement;
    _label: HTMLLabelElement;
    _form: HTMLFormElement;
    _description: HTMLElement;
    _value: any;
    _inputValue: any;
    constructor(id: string, cls: string);
    get id(): string;
    set id(id: string);
    get label_text(): string;
    set label_text(label: string);
    get description_text(): string;
    set description_text(description: string);
    get value(): any;
    considerSubmit(submit: string | boolean | undefined, verb: string): void;
}
//# sourceMappingURL=CtzInput.d.ts.map