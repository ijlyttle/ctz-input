import {CtzInput, CtzRadio, CtzSlider} from '../../src/index.js';

const rad00 = new CtzRadio('radio-00');

rad00.description_text = 'Radio buttons';
rad00.label_text = 'Description';
rad00.init(['a', 'b'], 'b', false);

console.log('yo');
