/* eslint-disable simple-header/header */

import { ModalCloseButton, ModalContent, ModalHeader, ModalProps, ModalRoot } from "@utils/modal";
import { Forms, Switch } from "@webpack/common";

import { settings } from "./settings";
import { cl } from "./utils";

function RewriteToggle() {
    const value = settings.use(["autoRewrite"]).autoRewrite;

    return (
        <Switch
            value={value}
            onChange={v => settings.store.autoRewrite = v}
            note={settings.def.autoRewrite.description}
            hideBorder
        >
            Rewrite Messages
        </Switch>
    );
}

export function LLMModal({ rootProps }: { rootProps: ModalProps; }) {
    return (
        <ModalRoot {...rootProps}>
            <ModalHeader className={cl("modal-header")}>
                <Forms.FormTitle tag="h2">
                    LLM
                </Forms.FormTitle>
                <ModalCloseButton onClick={rootProps.onClose} />
            </ModalHeader>

            <ModalContent className={cl("modal-content")}>
                <RewriteToggle />
            </ModalContent>
        </ModalRoot >
    );
}
