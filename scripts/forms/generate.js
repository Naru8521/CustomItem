import { Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import MenuForm from "./menu";

/**
 * @param {Player} player 
 * @param {import("../types").PresetConfig} preset
 */
export default async function GenerateForm(player, preset) {
    const type = preset.type;
    const basic = preset.basic;

    if (basic.id.trim() === "") return await MenuForm(player, preset, "アイテムIDが設定されていません");
    if (!(basic.amounts.length >= 1)) return await MenuForm(player, preset, "1以上の個数を指定してください");

    const form = new UI.ModalFormData();
    
    form.title("コマンド生成");
    form.textField("コマンド", "", `/scriptevent ${type} ${JSON.stringify(generateJSON(preset))}`);
    form.submitButton("閉じる");

    const { canceled } = await form.show(player);

    if (canceled) return await MenuForm(player, preset);
}

/**
 * @param {import("../types").PresetConfig} preset
 */
function generateJSON(preset) {
    const type = preset.type;
    const basic = preset.basic;
    const detail = preset.detail;
    let newJson = {};

    if (basic.id !== "") {
        newJson["id"] = basic.id;
    }

    if (basic.nameTag !== "") {
        newJson["nameTag"] = basic.nameTag;
    }

    if (basic.lore.length > 0) {
        newJson["lore"] = basic.lore;
    }

    if (basic.amounts.length > 0) {
        newJson["amounts"] = basic.amounts;
    }

    if (detail.canPlaceOn.length > 0) {
        newJson["canPlaceOn"] = detail.canPlaceOn;
    }

    if (detail.canDestory.length > 0) {
        newJson["canDestory"] = detail.canDestory;
    }

    if (detail.keepOnDeath) {
        newJson["keepOnDeath"] = detail.keepOnDeath;
    }

    if (detail.lockMode !== "none") {
        newJson["lockMode"] = detail.lockMode;
    }

    switch (type) {
        case "g:i":
            const gi = detail.gi;

            if (gi.drop) {
                newJson["drop"] = gi.drop;
            }
            break;

        case "s:i":
            const si = detail.si;

            newJson["slot"] = si.slot;

            if (si.overwrite) {
                newJson["overwrite"] = si.overwrite;
            }

            if (si.drop) {
                newJson["drop"] = si.drop;
            }
            break;

        default:
            break;
    }

    return newJson;
}