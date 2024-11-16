/* eslint-disable simple-header/header */

import { definePluginSettings } from "@api/Settings";
import { OptionType } from "@utils/types";

export const settings = definePluginSettings({
    autoCorrect: {
        type: OptionType.BOOLEAN,
        description: "Automatically correct messages with Corrections API",
        default: false
    },
    showChatBarButton: {
        type: OptionType.BOOLEAN,
        description: "Show the button to automatically correct messages",
        default: true
    }
}).withPrivateSettings<{
    showAutoCorrectAlert: boolean;
}>();
