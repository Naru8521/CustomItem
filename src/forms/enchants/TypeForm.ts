import { EnchantmentTypes, type Player } from "@minecraft/server";
import type { ItemJSON, ItemJSONEnchant } from "../../types/itemJSON";
import * as UI from "@minecraft/server-ui";

export default async function EnchantTypeForm(
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

    form.title("エンチャントタイプ");
    form.dropdown("エンチャントID", enchantIds, {
        defaultValueIndex: enchantTypes.findIndex(v => v.id === enchant.id) || 0
    });
    form.submitButton("設定");

    const { formValues, canceled } = await form.show(player);

    if (canceled) return await backform(player, json, enchant, i);
    if (formValues) {
        enchant.id = enchantIds[formValues[0] as number] as string;
        return await backform(player, json, enchant, i);
    }
}