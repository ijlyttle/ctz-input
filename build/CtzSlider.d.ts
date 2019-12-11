import { CtzInput } from './CtzInput';
import './css/CtzSlider.css';
export declare class CtzSlider extends CtzInput {
    _fnTransform(arg0: number): any;
    _fnPrecision(arg0: any): void;
    _slider: HTMLInputElement;
    _display: HTMLOutputElement;
    constructor(id: string);
    init(min: number, max: number, value: number, step: number, fnTransform: (x: number) => number, precision: number, maxWidth: number, submit: string | boolean | undefined): void;
}
//# sourceMappingURL=CtzSlider.d.ts.map