/* eslint-disable simple-header/header */

import { definePluginSettings } from "@api/Settings";
import { OptionType } from "@utils/types";

export const settings = definePluginSettings({
    autoRewrite: {
        type: OptionType.BOOLEAN,
        description: "Automatically rewrite messages with a LLM when sending.",
        default: false
    },
    responsePrompt: {
        type: OptionType.STRING,
        description: "The prompt to use for the LLM when responding to messages.",
        default: "Respond to the following message."
    },
    rewritePrompt: {
        type: OptionType.STRING,
        description: "The prompt to use for the LLM when rewriting messages.",
        default: "Rewrite the following message."
    },
    showChatBarButton: {
        type: OptionType.BOOLEAN,
        description: "Show the LLM button in the chat bar.",
        default: true
    },
}).withPrivateSettings<{
    showAutoRespondAlert: boolean;
}>();
