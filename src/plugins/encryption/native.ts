/* eslint-disable simple-header/header */

import crypto from "node:crypto";

import { type IpcMainInvokeEvent } from "electron";


export const encryptText = (_: IpcMainInvokeEvent, secret: string, text: string): string => {
    const cipher = crypto.createCipheriv("aes-256-cbc", secret, Buffer.alloc(16, 0));
    let encryptedText = cipher.update(text, "utf8", "hex");
    encryptedText += cipher.final("hex");
    return encryptedText;
};

export const decryptText = (_: IpcMainInvokeEvent, secret: string, encryptedText: string): string => {
    const decipher = crypto.createDecipheriv("aes-256-cbc", secret, Buffer.alloc(16, 0));
    let decryptedText = decipher.update(encryptedText, "hex", "utf8");
    decryptedText += decipher.final("utf8");
    return decryptedText;
};
