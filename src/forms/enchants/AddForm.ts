import { EnchantmentTypes, type Player } from "@minecraft/server";
import type { ItemJSON, ItemJSONEnchant } from "../../types/itemJSON";
import * as UI from "@minecraft/server-ui";
import EnchantsListForm from "./ListForm";
import EnchantTypeForm from "./TypeForm";
import EnchantLevelForm from "./LevelForm";

export default async function EnchantAddForm(
    player: Player,
    json: ItemJSON,
    enchant?: ItemJSONEnchant
): Promise<void> {
    if (!enchant) {
        enchant = {
            id: EnchantmentTypes.getAll()[0]?.id as string,
            level: 1
        }
    }

    const form = new UI.ActionFormData();

    form.title("エンチャント追加");
    form.button("エンチャントタイプ");
    form.button("エンチャントレベル");
    form.button("追加");

    const { selection, canceled } = await form.show(player);

    if (canceled) return await EnchantsListForm(player, json);
    if (selection === 0) return await EnchantTypeForm(player, json, enchant, EnchantAddForm);
    if (selection === 1) return await EnchantLevelForm(player, json, enchant, EnchantAddForm);
    if (selection === 2) {
        json.enchants.push(enchant);
        return await EnchantsListForm(player, json);
    }
}