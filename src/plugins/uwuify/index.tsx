/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import "./styles.css";

import { addChatBarButton, removeChatBarButton } from "@api/ChatButtons";
import { addPreSendListener, removePreSendListener } from "@api/MessageEvents";
import { CumDevs } from "@utils/constants";
import definePlugin from "@utils/types";

import { settings } from "./settings";
import { uwuify } from "./utils";
import { KittyChatBarIcon } from "./Uwuify";

export default definePlugin({
    name: "UwUify",
    description: "Reimplemented the UwUify plugin from Vencord (it got deleted)",
    authors: [CumDevs.Fxx],
    dependencies: ["MessageAccessoriesAPI", "MessagePopoverAPI", "MessageEventsAPI", "ChatInputButtonAPI"],
    settings,

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
