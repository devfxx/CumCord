/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { ModalCloseButton, ModalContent, ModalHeader, ModalProps, ModalRoot } from "@utils/modal";
import { Forms, Switch } from "@webpack/common";

import { settings } from "./settings";
import { cl } from "./utils";

function EncryptionToggle() {
    const value = settings.use(["autoEncrypt"]).autoEncrypt;

    return (
        <Switch
            value={value}
            onChange={v => settings.store.autoEncrypt = v}
            note={settings.def.autoEncrypt.description}
            hideBorder
        >
            Encrypt Messages
        </Switch>
    );
}

export function EncryptionModal({ rootProps }: { rootProps: ModalProps; }) {
    return (
        <ModalRoot {...rootProps}>
            <ModalHeader className={cl("modal-header")}>
                <Forms.FormTitle tag="h2">
                    Encrypt
                </Forms.FormTitle>
                <ModalCloseButton onClick={rootProps.onClose} />
            </ModalHeader>

            <ModalContent className={cl("modal-content")}>
                <EncryptionToggle />
            </ModalContent>
        </ModalRoot >
    );
}
