import { Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import MenuForm from "./menu";
import { lockModes } from "../config";
/// <reference path="../types.js" />

/**
 * @param {Player} player 
 * @param {import("../types").PresetConfig} preset
 */
export default async function DetailForm(player, preset) {
    const type = preset.type;
    const detail = preset.detail;
    const form = new UI.ModalFormData();

    form.title("詳細設定");
    form.textField("設置可能ブロックIds\n,で区切る", "minecraft:stone,minecraft:grass", detail.canPlaceOn.join(","));
    form.textField("破壊可能ブロックIds\n,で区切る", "minecraft:stone,minecraft:grass", detail.canDestory.join(","));
    form.toggle("アイテム保持", detail.keepOnDeath);
    form.dropdown("ロックモード", lockModes, lockModes.indexOf(detail.lockMode));
    
    switch (type) {
        case "g:i":
            const gi = detail.gi;

            form.toggle("インベントリに空きがない時にドロップ", gi.drop);
            break;

        case "s:i":
            const si = detail.si;

            form.textField("セットスロット §c*", "0", `${si.slot}`);
            form.toggle("上書き", si.overwrite);
            form.toggle("インベントリに空きがない時にドロップ", si.drop);
            break;

        default:
            break;
    }

    const { formValues, canceled } = await form.show(player);

    if (canceled) return await MenuForm(player, preset);

    const canPlaceOn = formValues[0].trim() === "" ? [] : formValues[0].trim().split(",");
    const canDestory = formValues[1].trim() === "" ? [] : formValues[1].trim().split(",");
    const keepOnDeath = formValues[2];
    const lockMode = lockModes[formValues[3]];
    let drop = false;
    let slot = 0;
    let overwrite = false;

    switch (type) {
        case "g:i":
            drop = formValues[4];
            break;

        case "s:i":
            slot = parseInt(formValues[4]) ?? 0;
            overwrite = formValues[5];
            drop = formValues[6];
            break;

        default:
            break;
    }

    detail.canPlaceOn = canPlaceOn;
    detail.canDestory = canDestory;
    detail.keepOnDeath = keepOnDeath;
    detail.lockMode = lockMode;

    switch (type) {
        case "g:i":
            const gi = detail.gi;

            gi.drop = drop;
            break;

        case "s:i":
            const si = detail.si;

            si.slot = slot;
            si.overwrite = overwrite;
            si.drop = drop;
            break;

        default:
            break;
    }

    await MenuForm(player, preset);
}