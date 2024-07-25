/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { Parser, useEffect, useState } from "@webpack/common";
import { Message } from "discord-types/general";

import { KeyIcon } from "./Encryption";
import { cl } from "./utils";

const DecryptionSetters = new Map<string, (v: string) => void>();

export function handleDecrypt(messageId: string, data: string) {
    DecryptionSetters.get(messageId)!(data);
}

function Dismiss({ onDismiss }: { onDismiss: () => void; }) {
    return (
        <button
            onClick={onDismiss}
            className={cl("dismiss")}
        >
            Dismiss
        </button>
    );
}

export function DecryptionAccessory({ message }: { message: Message; }) {
    const [decrypted, setDecrypted] = useState<string>();

    useEffect(() => {
        // Ignore MessageLinkEmbeds messages
        if ((message as any).vencordEmbeddedBy) return;

        DecryptionSetters.set(message.id, setDecrypted);

        return () => void DecryptionSetters.delete(message.id);
    }, []);

    if (!decrypted) return null;

    return (
        <span className={cl("accessory")}>
            <KeyIcon width={16} height={16} />
            {Parser.parse(decrypted)}
            {" "}
            <Dismiss onDismiss={() => setDecrypted(undefined)} />
        </span>
    );
}
