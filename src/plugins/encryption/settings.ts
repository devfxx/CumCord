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
    }
}).withPrivateSettings<{
    showAutoEncryptionAlert: boolean;
}>();