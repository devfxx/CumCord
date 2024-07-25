/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { classNameFactory } from "@api/Styles";

export const cl = classNameFactory("vc-uwuify-");

const endings = [
    "rawr x3",
    "OwO",
    "UwU",
    "o.O",
    "-.-",
    ">w<",
    "(⑅˘꒳˘)",
    "(ꈍᴗꈍ)",
    "(˘ω˘)",
    "(U ᵕ U❁)",
    "σωσ",
    "òωó",
    "(///ˬ///✿)",
    "(U ﹏ U)",
    "( ͡o ω ͡o )",
    "ʘwʘ",
    ":3",
    ":3", // important enough to have twice
    "XD",
    "nyaa~~",
    "mya",
    ">_<",
    "😳",
    "🥺",
    "😳😳😳",
    "rawr",
    "^^",
    "^^;;",
    "(ˆ ﻌ ˆ)♡",
    "^•ﻌ•^",
    "/(^•ω•^)",
    "(✿oωo)"
];

const replacements = [
    ["small", "smol"],
    ["cute", "kawaii~"],
    ["fluff", "floof"],
    ["love", "luv"],
    ["stupid", "baka"],
    ["what", "nani"],
    ["meow", "nya~"],
];

function selectRandomElement(arr) {
    // generate a random index based on the length of the array
    const randomIndex = Math.floor(Math.random() * arr.length);

    // return the element at the randomly generated index
    return arr[randomIndex];
}


export function uwuify(message: string): string {
    message = message.toLowerCase();

    for (const pair of replacements) {
        message = message.replaceAll(pair[0], pair[1]);
    }

    message = message
        .replaceAll(/([ \t\n])n/g, "$1ny") // nyaify
        .replaceAll(/[lr]/g, "w") // [lr] > w
        .replaceAll(/([ \t\n])([a-z])/g, (_, p1, p2) => Math.random() < .5 ? `${p1}${p2}-${p2}` : `${p1}${p2}`) // stutter
        .replaceAll(/([^.,!][.,!])([ \t\n])/g, (_, p1, p2) => `${p1} ${selectRandomElement(endings)}${p2}`); // endings

    return message;
}
