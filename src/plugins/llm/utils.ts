/* eslint-disable simple-header/header */

import { classNameFactory } from "@api/Styles";

export const cl = classNameFactory("vc-llm-");

export async function Summarize(text: string) {
    try {
        const prompt = "Summarize this text, what they meant, and what they said in hindsight.";
        const requestBody = {
            text: `${prompt}\n\n${text}`,
        };

        const response = await fetch("https://llm.kty.lol/", {
            method: "POST",
            body: JSON.stringify(requestBody)
        }).then(res => res.json());

        return response.data;
    } catch (e) {
        console.error(e);
        return "An error occurred while summarizing the text.";
    }
}
