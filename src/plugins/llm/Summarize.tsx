/* eslint-disable simple-header/header */

import { ChatBarButton } from "@api/ChatButtons";
import { Margins } from "@utils/margins";
import { classes } from "@utils/misc";
import { openModal } from "@utils/modal";
import { Alerts, Forms } from "@webpack/common";

import { settings } from "./settings";
import { SummarizeModal } from "./SummarizeModal";
import { cl } from "./utils";

export function LLmIcon({ height = 24, width = 24, className }: { height?: number; width?: number; className?: string; }) {
    return (
        <svg
            viewBox="0 0 24 24"
            height={height}
            width={width}
            className={classes(cl("icon"), className)}
        >
            <path fill="currentColor" d="M319 885 c-24 -13 -38 -37 -54 -93 -4 -13 -21 -28 -40 -36 -51 -22 -112 -83 -131 -132 -19 -49 -15 -115 11 -163 10 -21 13 -44 9 -75 -13 -92 38 -185 117 -211 23 -8 35 -20 43 -46 15 -48 64 -72 131 -64 64 7 90 7 146 -1 75 -10 120 18 142 88 3 9 19 19 35 23 73 16 131 119 118 211 -4 31 -1 54 9 75 56 108 10 226 -115 292 -25 13 -46 32 -48 43 -15 91 -91 129 -178 88 -31 -15 -37 -15 -68 0 -42 20 -92 20 -127 1z m109 -61 c19 -13 22 -24 22 -81 l0 -65 -32 5 c-18 3 -45 9 -59 12 -18 5 -31 1 -42 -10 -36 -36 -6 -92 42 -80 14 3 41 9 59 12 l32 5 0 -152 0 -152 -32 5 c-18 3 -45 9 -59 12 -48 12 -78 -44 -42 -80 11 -11 24 -15 42 -10 14 3 41 9 59 12 l32 5 0 -59 c0 -69 -10 -83 -60 -83 -41 0 -66 21 -72 59 -3 25 -6 27 -71 55 -43 18 -77 67 -77 113 0 32 1 32 53 35 l52 3 3 38 c3 35 6 38 25 32 52 -16 65 -16 80 0 36 36 6 92 -42 80 -14 -3 -46 -9 -71 -13 -43 -7 -45 -8 -48 -44 -3 -30 -7 -38 -22 -38 -25 0 -49 47 -56 108 -8 66 21 107 109 151 61 31 67 37 67 66 0 65 55 96 108 59z m196 -6 c9 -12 16 -37 16 -56 0 -28 5 -35 30 -43 27 -10 30 -15 30 -56 0 -50 3 -49 -81 -28 -48 12 -78 -45 -42 -80 11 -12 24 -15 42 -10 14 4 51 10 81 13 l55 7 5 54 c5 50 6 52 21 35 44 -51 49 -117 14 -184 -11 -22 -14 -46 -10 -93 7 -76 -14 -118 -72 -143 -65 -28 -68 -30 -71 -55 -6 -38 -31 -59 -72 -59 -52 0 -60 13 -60 102 l0 77 93 3 92 3 3 40 c1 22 8 50 14 63 13 25 5 47 -25 66 -34 21 -81 -30 -59 -64 26 -41 17 -50 -53 -50 l-65 0 0 224 c0 221 0 225 22 240 33 23 74 20 92 -6z" />
        </svg>
    );
}

export const LLmChatBarIcon: ChatBarButton = ({ isMainChat }) => {
    const { autoSummarize, showChatBarButton } = settings.use(["autoSummarize", "showChatBarButton"]);

    if (!isMainChat || !showChatBarButton) return null;

    const toggle = () => {
        const newState = !autoSummarize;
        settings.store.autoSummarize = newState;
        if (newState && settings.store.showAutoSummarizationAlert !== false)
            Alerts.show({
                title: "Vencord AI Summarization Enabled",
                body: <>
                    <Forms.FormText>
                        You just enabled auto summarization (by right clicking the LLM icon). Any message you send will automatically be summarized before being sent.
                    </Forms.FormText>
                    <Forms.FormText className={Margins.top16}>
                        If you don't want this, you can disable it by clicking the LLM icon again.
                    </Forms.FormText>
                </>,
                cancelText: "Disable Auto-Summarization",
                confirmText: "Got it",
                secondaryConfirmText: "Don't show again",
                onConfirmSecondary: () => settings.store.showAutoSummarizationAlert = false,
                onCancel: () => settings.store.autoSummarize = false
            });
    };

    return (
        <ChatBarButton
            tooltip="Summarize"
            onClick={e => {
                if (e.shiftKey) return toggle();

                openModal(props => (
                    <SummarizeModal rootProps={props} />
                ));
            }}
            onContextMenu={() => toggle()}
            buttonProps={{
                "aria-haspopup": "dialog"
            }}
        >
            <LLmIcon className={cl({ "progress": autoSummarize, "chat-button": true })} />
        </ChatBarButton>
    );
};
