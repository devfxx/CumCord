import "./styles.css";

import { addChatBarButton, removeChatBarButton } from "@api/ChatButtons";
import { addPreSendListener, removePreSendListener } from "@api/MessageEvents";
import { Devs } from "@utils/constants";
import definePlugin from "@utils/types";

import { KittyChatBarIcon } from "./Uwuify";
import { settings } from "./settings";
import { uwuify } from "./utils";

export default definePlugin({
    name: "UwUify",
    description: "Reimplemented the UwUify plugin from Vencord (it got deleted)",
    authors: [Devs.Fxx],
    dependencies: ["MessageAccessoriesAPI", "MessagePopoverAPI", "MessageEventsAPI", "ChatInputButtonAPI"],
    settings,

    // export cuz we're cool
    uwuify,

    start() {
        addChatBarButton("vc-uwuify", KittyChatBarIcon);

        this.preSend = addPreSendListener(async (_, message) => {
            if (!settings.store.autoUwuify) return;
            if (!message.content) return;

            message.content = uwuify(message.content);
        });
    },

    stop() {
        removePreSendListener(this.preSend);
        removeChatBarButton("vc-uwuify");
    },
});
