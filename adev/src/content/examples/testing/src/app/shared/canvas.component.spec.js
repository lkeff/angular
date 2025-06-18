"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// #docplaster
// #docregion without-toBlob-macrotask
const testing_1 = require("@angular/core/testing");
const canvas_component_1 = require("./canvas.component");
describe('CanvasComponent', () => {
    // #enddocregion without-toBlob-macrotask
    // #docregion enable-toBlob-macrotask
    beforeEach(() => {
        window.__zone_symbol__FakeAsyncTestMacroTask = [
            {
                source: 'HTMLCanvasElement.toBlob',
                callbackArgs: [{ size: 200 }],
            },
        ];
    });
    // #enddocregion enable-toBlob-macrotask
    // #docregion without-toBlob-macrotask
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield testing_1.TestBed.configureTestingModule({
            imports: [canvas_component_1.CanvasComponent],
        }).compileComponents();
    }));
    it('should be able to generate blob data from canvas', (0, testing_1.fakeAsync)(() => {
        const fixture = testing_1.TestBed.createComponent(canvas_component_1.CanvasComponent);
        const canvasComp = fixture.componentInstance;
        fixture.detectChanges();
        expect(canvasComp.blobSize).toBe(0);
        (0, testing_1.tick)();
        expect(canvasComp.blobSize).toBeGreaterThan(0);
    }));
});
// #enddocregion without-toBlob-macrotask
