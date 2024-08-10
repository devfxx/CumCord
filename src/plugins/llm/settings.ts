/* eslint-disable simple-header/header */

import { definePluginSettings } from "@api/Settings";
import { OptionType } from "@utils/types";

export const settings = definePluginSettings({
    autoSummarize: {
        type: OptionType.BOOLEAN,
        description: "Automatically summarize your messages before sending. I don't know why you'd want to do this, but you can.",
        default: false
    },
    showChatBarButton: {
        type: OptionType.BOOLEAN,
        description: "Show summarize button in chat bar",
        default: true
    },
}).withPrivateSettings<{
    showAutoSummarizationAlert: boolean;
}>();
