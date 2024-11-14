/* eslint-disable simple-header/header */

import "./styles.css";

import { addChatBarButton, removeChatBarButton } from "@api/ChatButtons";
import { addAccessory, removeAccessory } from "@api/MessageAccessories";
import { addPreSendListener, removePreSendListener } from "@api/MessageEvents";
import { addButton, removeButton } from "@api/MessagePopover";
import { CumDevs } from "@utils/constants";
import definePlugin from "@utils/types";
import { ChannelStore } from "@webpack/common";

import { settings } from "./settings";
import { LLmChatBarIcon, LLmIcon } from "./Summarize";
import { handleResponse, SummarizeAccessory } from "./SummarizeAccessory";
import { Summarize } from "./utils";

export default definePlugin({
    name: "LLM",
    description: "LLM",
    authors: [CumDevs.Fxx],
    dependencies: ["MessageAccessoriesAPI", "MessagePopoverAPI", "MessageEventsAPI", "ChatInputButtonAPI"],
    settings,

    start() {
        addAccessory("vc-llm", props => <SummarizeAccessory message={props.message} />);

        addChatBarButton("vc-llm", LLmChatBarIcon);

        addButton("vc-llm", message => {
            if (!message.content) return null;

            return {
                label: "Summarize",
                icon: LLmIcon,
                message,
                channel: ChannelStore.getChannel(message.channel_id),
                onClick: async () => {
                    const resp = await Summarize(message.content);
                    handleResponse(message.id, resp);
                }
            };
        });

        this.preSend = addPreSendListener(async (_, message) => {
            if (!settings.store.autoSummarize) return;
            if (!message.content) return;

            const summarized = await Summarize(message.content);
            if (!summarized) return;

            message.content = summarized;
        });
    },

    stop() {
        removePreSendListener(this.preSend);
        removeChatBarButton("vc-llm");
        removeAccessory("vc-llm");
        removeButton("vc-llm");
    },
});
