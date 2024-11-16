/* eslint-disable simple-header/header */

import { classNameFactory } from "@api/Styles";

export const cl = classNameFactory("vc-corrections-");

/**
 * Corrects the given text by making a request to the corrections API.
 * @param text The text to be corrected.
 * @returns The corrected text or an error message if an error occurred.
 */
export async function Correct(text: string) {
    try {
        const response = await fetch("http://localhost:3000/correct", {
            method: "POST",
            body: JSON.stringify({
                text
            })
        }).then(res => res.json());

        return response.corrected;
    } catch (e) {
        console.error(e);
        return "An error occurred while rewriting the message.";
    }
}
