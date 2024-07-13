import "./styles.css";

import { addChatBarButton, removeChatBarButton } from "@api/ChatButtons";
import { addAccessory, removeAccessory } from "@api/MessageAccessories";
import { addPreSendListener, removePreSendListener } from "@api/MessageEvents";
import { addButton, removeButton } from "@api/MessagePopover";
import { Devs } from "@utils/constants";
import { ChannelStore } from "@webpack/common";
import { DecryptionAccessory, handleDecrypt } from "./DecryptionAccessory";
import { KeyChatBarIcon, KeyIcon } from "./Encryption";
import { settings } from "./settings";
import { decrypt, encrypt } from "./utils";

import definePlugin from "@utils/types";

export default definePlugin({
    name: "Encryption",
    description: "Shitty message encryption plugin",
    authors: [Devs.Fxx],
    dependencies: ["MessageAccessoriesAPI", "MessagePopoverAPI", "MessageEventsAPI", "ChatInputButtonAPI"],
    settings,

    start() {
        addAccessory("vc-decrypt", props => <DecryptionAccessory message={props.message} />);

        addChatBarButton("vc-encryption", KeyChatBarIcon);

        addButton("vc-encryption", message => {
            if (!message.content) return null;

            return {
                label: "Decrypt",
                icon: KeyIcon,
                message,
                channel: ChannelStore.getChannel(message.channel_id),
                onClick: async () => {
                    const dec = await decrypt(message.content);
                    handleDecrypt(message.id, dec);
                }
            };
        });

        this.preSend = addPreSendListener(async (_, message) => {
            if (!settings.store.autoEncrypt) return;
            if (!message.content) return;

            const encrypted = await encrypt(message.content);
            if (!encrypted) return;

            message.content = encrypted;
        });
    },

    stop() {
        removePreSendListener(this.preSend);
        removeChatBarButton("vc-encryption");
        removeAccessory("vc-encryption");
        removeButton("vc-decrypt");
    },
});
