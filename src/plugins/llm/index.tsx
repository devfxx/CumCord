/* eslint-disable simple-header/header */

import "./styles.css";

import { addChatBarButton, removeChatBarButton } from "@api/ChatButtons";
import { addAccessory, removeAccessory } from "@api/MessageAccessories";
import { addPreSendListener, removePreSendListener } from "@api/MessageEvents";
import { addButton, removeButton } from "@api/MessagePopover";
import { PwnDevs } from "@utils/constants";
import definePlugin from "@utils/types";
import { ChannelStore } from "@webpack/common";

import { sendMessage } from "@utils/discord";
import { LLmChatBarIcon, LLmIcon } from "./LLM";
import { LLMAccessory } from "./ModelAccessory";
import { settings } from "./settings";
import { Respond, Rewrite } from "./utils";

export default definePlugin({
    name: "LLM",
    description: "Use AI to respond to messages and rewrite messages when sending",
    authors: [PwnDevs.Fxx],
    dependencies: ["MessageAccessoriesAPI", "MessagePopoverAPI", "MessageEventsAPI", "ChatInputButtonAPI"],
    settings,

    start() {
        addAccessory("vc-llm", props => <LLMAccessory message={props.message} />);
        addChatBarButton("vc-llm", LLmChatBarIcon);

        addButton("vc-llm", message => {
            if (!message.content) return null;

            const channel = ChannelStore.getChannel(message.channel_id);
            if (!channel) return null;

            return {
                label: "Respond with LLM",
                icon: LLmIcon,
                message,
                channel,
                onClick: async () => {
                    const llmResponse = await Respond(message.content);
                    if (!llmResponse.trim()) return;

                    return sendMessage(channel.id, { content: llmResponse });
                }
            };
        });

        this.preSend = addPreSendListener(async (_, message) => {
            if (!settings.store.autoRewrite) return;
            if (!message.content) return;

            const llmResponse = await Rewrite(message.content);
            if (!llmResponse) return;

            message.content = llmResponse;
        });
    },

    stop() {
        removePreSendListener(this.preSend);
        removeChatBarButton("vc-llm");
        removeAccessory("vc-llm");
        removeButton("vc-llm");
    },
});
