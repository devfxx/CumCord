/* eslint-disable simple-header/header */

import "./styles.css";

import { addChatBarButton, removeChatBarButton } from "@api/ChatButtons";
import { addAccessory, removeAccessory } from "@api/MessageAccessories";
import { addPreSendListener, removePreSendListener } from "@api/MessageEvents";
import { CumDevs } from "@utils/constants";
import definePlugin from "@utils/types";

import { CorrectionAccessory } from "./CorrectionAccessory";
import { CorrectionChatBarIcon } from "./Corrections";
import { settings } from "./settings";
import { Correct } from "./utils";

export default definePlugin({
    name: "Corrections",
    description: "Use AI to fix grammar and spelling mistakes in your messages.",
    authors: [CumDevs.Fxx],
    dependencies: ["MessageAccessoriesAPI", "MessageEventsAPI", "ChatInputButtonAPI"],
    settings,

    start() {
        addAccessory("vc-corrections", props => <CorrectionAccessory message={props.message} />);
        addChatBarButton("vc-corrections", CorrectionChatBarIcon);

        this.preSend = addPreSendListener(async (_, message) => {
            if (!settings.store.autoCorrect) return;
            if (!message.content) return;

            const llmResponse = await Correct(message.content);
            if (!llmResponse) return;

            message.content = llmResponse;
        });
    },

    stop() {
        removePreSendListener(this.preSend);
        removeChatBarButton("vc-corrections");
        removeAccessory("vc-corrections");
    },
});
