import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdf = require('pdf-parse');

console.log('Type of pdf:', typeof pdf);
console.log('Keys of pdf:', Object.keys(pdf));
if (typeof pdf === 'function') {
    console.log('PDF is callable directly.');
} else if (pdf.default && typeof pdf.default === 'function') {
    console.log('PDF default is callable.');
} else if (pdf.__esModule && typeof pdf.default === 'function') {
    console.log('PDF __esModule default is callable.');
} else {
    console.log('PDF shape:', pdf);
}
