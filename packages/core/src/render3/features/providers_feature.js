"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ɵɵProvidersFeature = ɵɵProvidersFeature;
const di_setup_1 = require("../di_setup");
/**
 * This feature resolves the providers of a directive (or component),
 * and publish them into the DI system, making it visible to others for injection.
 *
 * For example:
 * ```ts
 * class ComponentWithProviders {
 *   constructor(private greeter: GreeterDE) {}
 *
 *   static ɵcmp = defineComponent({
 *     type: ComponentWithProviders,
 *     selectors: [['component-with-providers']],
 *    factory: () => new ComponentWithProviders(directiveInject(GreeterDE as any)),
 *    decls: 1,
 *    vars: 1,
 *    template: function(fs: RenderFlags, ctx: ComponentWithProviders) {
 *      if (fs & RenderFlags.Create) {
 *        ɵɵtext(0);
 *      }
 *      if (fs & RenderFlags.Update) {
 *        ɵɵtextInterpolate(ctx.greeter.greet());
 *      }
 *    },
 *    features: [ɵɵProvidersFeature([GreeterDE])]
 *  });
 * }
 * ```
 *
 * @param definition
 *
 * @codeGenApi
 */
function ɵɵProvidersFeature(providers, viewProviders = []) {
    return (definition) => {
        definition.providersResolver = (def, processProvidersFn) => {
            return (0, di_setup_1.providersResolver)(def, //
            processProvidersFn ? processProvidersFn(providers) : providers, //
            viewProviders);
        };
    };
}
