/* eslint-disable simple-header/header */

import { classNameFactory } from "@api/Styles";

import { settings } from "./settings";

export const cl = classNameFactory("vc-llm-");

export async function Respond(text: string) {
    try {
        const prompt = settings.store.responsePrompt;
        const requestBody = {
            text: `${prompt}\nMessage: ${text}`,
        };

        const response = await fetch("https://llm.kty.lol/", {
            method: "POST",
            body: JSON.stringify(requestBody)
        }).then(res => res.json());

        return trimResponse(response.data);
    } catch (e) {
        console.error(e);
        return "An error occurred while responding to the message.";
    }
}

function trimResponse(response: string) {
    let resp = response.trim();
    if (resp.endsWith(".")) resp = resp.slice(0, -1);
    if (resp.startsWith("Message: ")) resp = resp.slice(7);
    return resp;
}

export async function Rewrite(text: string) {
    try {
        const prompt = settings.store.rewritePrompt;
        const requestBody = {
            text: `${prompt}\nMessage: ${text}`,
        };

        const response = await fetch("https://llm.kty.lol/", {
            method: "POST",
            body: JSON.stringify(requestBody)
        }).then(res => res.json());

        return trimResponse(response.data);
    } catch (e) {
        console.error(e);
        return "An error occurred while rewriting the message.";
    }
}
