import { Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import { types } from "../config";
import MenuForm from "./menu";

/**
 * @param {Player} player 
 * @param {import("../types").PresetConfig} preset
 */
export default async function TypeForm(player, preset) {
    const type = preset.type;
    const form = new UI.ModalFormData();

    form.title("タイプ設定");
    form.dropdown("タイプ", types, types.indexOf(type));
    form.submitButton("設定");

    const { formValues, canceled } = await form.show(player);

    if (canceled) return await MenuForm(player, preset);

    preset.type = types[formValues[0]];
    await MenuForm(player, preset);
}