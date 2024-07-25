/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { ModalCloseButton, ModalContent, ModalHeader, ModalProps, ModalRoot } from "@utils/modal";
import { Forms, Switch } from "@webpack/common";

import { settings } from "./settings";
import { cl } from "./utils";

function AutoUwuifyToggle() {
    const value = settings.use(["autoUwuify"]).autoUwuify;

    return (
        <Switch
            value={value}
            onChange={v => settings.store.autoUwuify = v}
            note={settings.def.autoUwuify.description}
            hideBorder
        >
            Auto UwUify
        </Switch>
    );
}


export function UwuifyModal({ rootProps }: { rootProps: ModalProps; }) {
    return (
        <ModalRoot {...rootProps}>
            <ModalHeader className={cl("modal-header")}>
                <Forms.FormTitle tag="h2">
                    UwUify
                </Forms.FormTitle>
                <ModalCloseButton onClick={rootProps.onClose} />
            </ModalHeader>

            <ModalContent className={cl("modal-content")}>
                <AutoUwuifyToggle />
            </ModalContent>
        </ModalRoot >
    );
}
