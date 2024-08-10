/* eslint-disable simple-header/header */

import { ModalCloseButton, ModalContent, ModalHeader, ModalProps, ModalRoot } from "@utils/modal";
import { Forms, Switch } from "@webpack/common";

import { settings } from "./settings";
import { cl } from "./utils";

function EncryptionToggle() {
    const value = settings.use(["autoSummarize"]).autoSummarize;

    return (
        <Switch
            value={value}
            onChange={v => settings.store.autoSummarize = v}
            note={settings.def.autoSummarize.description}
            hideBorder
        >
            Summarize Messages
        </Switch>
    );
}

export function SummarizeModal({ rootProps }: { rootProps: ModalProps; }) {
    return (
        <ModalRoot {...rootProps}>
            <ModalHeader className={cl("modal-header")}>
                <Forms.FormTitle tag="h2">
                    Summarize
                </Forms.FormTitle>
                <ModalCloseButton onClick={rootProps.onClose} />
            </ModalHeader>

            <ModalContent className={cl("modal-content")}>
                <EncryptionToggle />
            </ModalContent>
        </ModalRoot >
    );
}
