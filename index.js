// Add this workaround for Hermes JS engine not supporting Event
if (global.Event === undefined) {
    class Event {
        constructor(type, params = {}) {
            this.type = type;
            this.bubbles = !!params.bubbles;
            this.cancelable = !!params.cancelable;
        }
    }
    global.Event = Event;
}



import { Buffer } from "buffer";
import { getRandomValues as expoCryptoGetRandomValues } from "expo-crypto";
global.Buffer = Buffer;

// getRandomValues polyfill
class Crypto {
    getRandomValues = expoCryptoGetRandomValues;
}

const webCrypto = typeof crypto !== "undefined" ? crypto : new Crypto();

(() => {
    if (typeof crypto === "undefined") {
        Object.defineProperty(window, "crypto", {
            configurable: true,
            enumerable: true,
            get: () => webCrypto,
        });
    }
})();

import "expo-router/entry";

