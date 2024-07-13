import { Parser, useEffect, useState } from "@webpack/common";
import { Message } from "discord-types/general";

import { KeyIcon } from "./Encryption";
import { cl, DecryptionValue } from "./utils";
import { Devs } from "@utils/constants";

const DecryptionSetters = new Map<string, (v: DecryptionValue) => void>();

export function handleDecrypt(messageId: string, data: DecryptionValue) {
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
    const [decrypted, setDecrypted] = useState<DecryptionValue>();

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
            {Parser.parse(decrypted.text)}
            {" "}
            <Dismiss onDismiss={() => setDecrypted(undefined)} />
        </span>
    );
}
