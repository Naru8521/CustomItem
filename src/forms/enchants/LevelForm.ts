import { EnchantmentTypes, type Player } from "@minecraft/server";
import type { ItemJSON, ItemJSONEnchant } from "../../types/itemJSON";
import * as UI from "@minecraft/server-ui";
import Utils from "../../utils/utils";

export default async function EnchantLevelForm(
    player: Player,
    json: ItemJSON,
    enchant: ItemJSONEnchant,
    backform: Function,
    i?: number,
): Promise<void> {
    const form = new UI.ModalFormData();

    // enchants
    const enchantTypes = EnchantmentTypes.getAll();
    const enchantIds = enchantTypes.map(v => v.id);
    const enchantMaxlevels = enchantTypes.map(v => v.maxLevel);
    const maxLevel = enchantMaxlevels[enchantIds.findIndex(v => v === enchant.id)] || 1;
    const levels = Utils.genNumberArray(1, maxLevel);

    form.title("エンチャントレベル");
    form.dropdown("エンチャントレベル", levels.map(v => String(v)), {
        defaultValueIndex: levels.findIndex(v => v === enchant.level)
    });
    form.submitButton("設定");

    const { formValues, canceled } = await form.show(player);

    if (canceled) return await backform(player, json, enchant, i);
    if (formValues) {
        enchant.level = levels[formValues[0] as number] as number;
        return await backform(player, json, enchant, i);
    }
}