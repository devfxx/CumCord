import { definePluginSettings } from "@api/Settings";
import { OptionType } from "@utils/types";

export const settings = definePluginSettings({
    autoUwuify: {
        type: OptionType.BOOLEAN,
        description: "Automatically UwUify your messages before sending. You can also shift/right click the translate button to toggle this",
        default: false
    },
    showChatBarButton: {
        type: OptionType.BOOLEAN,
        description: "Show UwUify button in chat bar",
        default: true
    }
}).withPrivateSettings<{
    showAutoUwuifyAlert: boolean;
}>();
