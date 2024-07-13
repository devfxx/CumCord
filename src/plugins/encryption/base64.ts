export namespace Base64 {
    export function encode(obj) {
        return btoa(JSON.stringify(obj));
    }

    export function decode(str) {
        return JSON.parse(atob(str));
    }
};