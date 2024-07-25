/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import { OptionType } from "@utils/types";

export const settings = definePluginSettings({
    autoEncrypt: {
        type: OptionType.BOOLEAN,
        description: "Automatically encrypt your messages before sending. You can also shift/right click the encryption button to toggle this",
        default: false
    },
    showChatBarButton: {
        type: OptionType.BOOLEAN,
        description: "Show encryption button in chat bar",
        default: true
    },
    secretKey: {
        type: OptionType.STRING,
        description: "The secret to use for encryption/decryption",
        default: ""
    }
}).withPrivateSettings<{
    showAutoEncryptionAlert: boolean;
}>();
