/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { classNameFactory } from "@api/Styles";
import crypto from "crypto-js";

export const cl = classNameFactory("vc-encryption-");

export namespace Encryption {
    export const encryptText = (secret: string, text: string): string => {
        const cipher = crypto.AES.encrypt(text, secret);
        return cipher.toString();
    };

    export const decryptText = (secret: string, encryptedText: string): string => {
        const decipher = crypto.AES.decrypt(
            encryptedText,
            secret,
        );

        const decryptedText = decipher.toString(crypto.enc.Utf8);

        return decryptedText;
    };
}
