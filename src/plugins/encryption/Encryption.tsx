import { ChatBarButton } from "@api/ChatButtons";
import { Margins } from "@utils/margins";
import { classes } from "@utils/misc";
import { openModal } from "@utils/modal";
import { Alerts, Forms } from "@webpack/common";

import { EncryptionModal } from "./EncryptionModal";
import { settings } from "./settings";
import { cl } from "./utils";

export function KeyIcon({ height = 24, width = 24, className }: { height?: number; width?: number; className?: string; }) {
    return (
        <svg
            viewBox="0 0 24 24"
            height={height}
            width={width}
            className={classes(cl("icon"), className)}
        >
            <path fill="currentColor" d="M21.0667 5C21.6586 5.95805 22 7.08604 22 8.29344C22 11.7692 19.1708 14.5869 15.6807 14.5869C15.0439 14.5869 13.5939 14.4405 12.8885 13.8551L12.0067 14.7333C11.272 15.465 11.8598 15.465 12.1537 16.0505C12.1537 16.0505 12.8885 17.075 12.1537 18.0995C11.7128 18.6849 10.4783 19.5045 9.06754 18.0995L8.77362 18.3922C8.77362 18.3922 9.65538 19.4167 8.92058 20.4412C8.4797 21.0267 7.30403 21.6121 6.27531 20.5876C6.22633 20.6364 5.952 20.9096 5.2466 21.6121C4.54119 22.3146 3.67905 21.9048 3.33616 21.6121L2.45441 20.7339C1.63143 19.9143 2.1115 19.0264 2.45441 18.6849L10.0963 11.0743C10.0963 11.0743 9.3615 9.90338 9.3615 8.29344C9.3615 4.81767 12.1907 2 15.6807 2C16.4995 2 17.282 2.15509 18 2.43738" />
        </svg>
    );
}

export const KeyChatBarIcon: ChatBarButton = ({ isMainChat }) => {
    const { autoEncrypt, showChatBarButton } = settings.use(["autoEncrypt", "showChatBarButton"]);

    if (!isMainChat || !showChatBarButton) return null;

    const toggle = () => {
        const newState = !autoEncrypt;
        settings.store.autoEncrypt = newState;
        if (newState && settings.store.showAutoEncryptionAlert !== false)
            Alerts.show({
                title: "Vencord Encryption Enabled",
                body: <>
                    <Forms.FormText>
                        You just enabled auto encryption (by right clicking the Key icon). Any message you send will automatically be encrypted before being sent.
                    </Forms.FormText>
                    <Forms.FormText className={Margins.top16}>
                        Remember to keep your secret key safe, as you will need it to decrypt messages.
                    </Forms.FormText>
                </>,
                cancelText: "Disable Auto-Encryption",
                confirmText: "Got it",
                secondaryConfirmText: "Don't show again",
                onConfirmSecondary: () => settings.store.showAutoEncryptionAlert = false,
                onCancel: () => settings.store.autoEncrypt = false
            });
    };

    return (
        <ChatBarButton
            tooltip="Encryption"
            onClick={e => {
                if (e.shiftKey) return toggle();

                openModal(props => (
                    <EncryptionModal rootProps={props} />
                ));
            }}
            onContextMenu={() => toggle()}
            buttonProps={{
                "aria-haspopup": "dialog"
            }}
        >
            <KeyIcon className={cl({ "encrypting": autoEncrypt, "chat-button": true })} />
        </ChatBarButton>
    );
};
