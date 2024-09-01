import { Player, system } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";

/**
 * formを表示するのを待ちます
 * @param {Player} player - フォームを表示するプレイヤー
 * @param {UI.ActionFormData | UI.ModalFormData | UI.MessageFormData} form - フォーム
 * @returns {Promise<UI.ActionFormResponse | UI.ModalFormResponse | UI.MessageFormResponse>} - フォームの返り値
 */
export function formBusy(player, form) {
    return new Promise(res => {
        system.run(async function run() {
            const response = await form.show(player);
            const { canceled, cancelationReason: reason } = response;
            if (canceled && reason === UI.FormCancelationReason.UserBusy) return system.run(run);
            res(response);
        });
    });
}

/**
 * UUIDv4を生成します
 * @returns {string} - UUID
 */
export function generateUUIDv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

/**
 * アクションバーを表示
 * @param {Player} player 
 * @param {string} message 
 */
export function setActionbar(player, message) {
    system.run(() => {
        player.onScreenDisplay.setActionBar(message);
    });
}