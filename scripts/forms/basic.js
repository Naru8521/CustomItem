import { Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import MenuForm from "./menu";

/**
 * @param {Player} player 
 * @param {import("../types").PresetConfig} preset
 */
export default async function BasicForm(player, preset) {
    const basic = preset.basic;
    const form = new UI.ModalFormData();

    form.title("基本設定");
    form.textField("アイテムID §c*§f", "minecraft:apple", basic.id);
    form.textField("アイテム名", "", basic.nameTag);
    form.textField("アイテムロア", "", basic.lore.join(","));
    form.textField("アイテム数 §c*§f\n,で区切る", "1,2,3", basic.amounts.join(","));
    form.submitButton("設定");

    const { formValues, canceled } = await form.show(player);

    if (canceled) return await MenuForm(player, preset);

    const id = formValues[0].trim();
    const nameTag = formValues[1].trim();
    const lore = formValues[2].trim() === "" ? [] : formValues[2].trim().split(",");
    const amounts = formValues[3].trim() === "" ? [1] : formValues[3].trim().split(",").map(amount => {
        return Number.isNaN(parseInt(amount)) ? 1 : parseInt(amount) >= 1 ? parseInt(amount) : 1
    });

    basic.id = id;
    basic.nameTag = nameTag;
    basic.lore = lore;
    basic.amounts = amounts;

    await MenuForm(player, preset);
}