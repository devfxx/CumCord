import { classNameFactory } from "@api/Styles";
import { Base64 } from "./base64";

export const cl = classNameFactory("vc-encryption-");

export interface DecryptionValue {
    text: string;
}

export async function encrypt(text) {
    try {
        const response = await fetch('https://encrypt.tritan.gg/api/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: text })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const encryptionValues = await response.json();
        const encryptedMessage = Base64.encode(encryptionValues);

        return encryptedMessage;
    } catch (error) {
        alert("Error: " + error);
    }
}

export async function decrypt(text) {
    const encryptedValues = Base64.decode(text);

    const encryptedResponse = await fetch(`https://encrypt.tritan.gg/api/fetch?i=${encryptedValues.id}&t=${encryptedValues.token}`, {
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (!encryptedResponse.ok) {
        throw new Error(`HTTP error! status: ${encryptedResponse.status}`);
    }

    const decrypted = await encryptedResponse.json();

    return decrypted;
}