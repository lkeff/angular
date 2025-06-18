"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryDataService = void 0;
const twain_data_1 = require("./twain/twain.data");
// Adjust to reduce number of quotes
const maxQuotes = Infinity; // 0;
/** Create in-memory database of heroes and quotes */
class InMemoryDataService {
    createDb() {
        const heroes = [
            { id: 12, name: 'Dr. Nice' },
            { id: 13, name: 'Bombasto' },
            { id: 14, name: 'Celeritas' },
            { id: 15, name: 'Magneta' },
            { id: 16, name: 'RubberMan' },
            { id: 17, name: 'Dynama' },
            { id: 18, name: 'Dr. IQ' },
            { id: 19, name: 'Magma' },
            { id: 20, name: 'Tornado' },
        ];
        return { heroes, quotes: twain_data_1.QUOTES.slice(0, maxQuotes) };
    }
}
exports.InMemoryDataService = InMemoryDataService;
