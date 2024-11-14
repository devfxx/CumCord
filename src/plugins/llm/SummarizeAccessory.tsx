/* eslint-disable simple-header/header */

import { Parser, useEffect, useState } from "@webpack/common";
import { Message } from "discord-types/general";

import { LLmIcon } from "./Summarize";
import { cl } from "./utils";

const ResponseSetters = new Map<string, (v: string) => void>();

export function handleResponse(messageId: string, data: string) {
    ResponseSetters.get(messageId)!(data);
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

export function SummarizeAccessory({ message }: { message: Message; }) {
    const [response, setResponse] = useState<string>();

    useEffect(() => {
        // Ignore MessageLinkEmbeds messages
        if ((message as any).vencordEmbeddedBy) return;

        ResponseSetters.set(message.id, setResponse);

        return () => void ResponseSetters.delete(message.id);
    }, []);

    if (!response) return null;

    return (
        <span className={cl("accessory")}>
            <LLmIcon width={16} height={16} />
            {Parser.parse(response)}
            {" "}
            <Dismiss onDismiss={() => setResponse(undefined)} />
        </span>
    );
}
