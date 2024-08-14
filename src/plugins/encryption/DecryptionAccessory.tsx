/* eslint-disable simple-header/header */

import { Parser, useEffect, useState } from "@webpack/common";
import { Message } from "discord-types/general";

import { cl } from ".";
import { KeyIcon } from "./Encryption";

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
