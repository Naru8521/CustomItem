import { type Player } from "@minecraft/server";
import type { ItemJSON, ItemJSONEnchant } from "../../types/itemJSON";
import * as UI from "@minecraft/server-ui";
import EnchantsListForm from "./ListForm";
import EnchantTypeForm from "./TypeForm";
import EnchantLevelForm from "./LevelForm";

export default async function EnchantEditForm(
    player: Player,
    json: ItemJSON,
    enchant: ItemJSONEnchant,
    i: number,
): Promise<void> {
    const form = new UI.ActionFormData();

    form.title("エンチャント編集");
    form.button("エンチャントタイプ");
    form.button("エンチャントレベル");
    form.button("削除");
    form.button("保存");

    const { selection, canceled } = await form.show(player);

    if (canceled) return await EnchantsListForm(player, json);
    if (selection === 0) return await EnchantTypeForm(player, json, enchant, EnchantEditForm);
    if (selection === 1) return await EnchantLevelForm(player, json, enchant, EnchantEditForm);
    if (selection === 2) return await DeleteCheck(player, json, enchant, i);
    if (selection === 3) {
        json.enchants[i] = enchant;
        return await EnchantsListForm(player, json);
    }
}

async function DeleteCheck(
    player: Player,
    json: ItemJSON,
    enchant: ItemJSONEnchant,
    i: number
): Promise<void> {
    const form = new UI.ActionFormData();

    form.title("確認");
    form.body("削除しますか？元に戻すことはできません。");
    form.button("はい");
    form.button("いいえ");

    const { selection, canceled } = await form.show(player);

    if (canceled) return await EnchantEditForm(player, json, enchant, i);
    if (selection === 0) {
        json.enchants.splice(i, 1);
        return await EnchantsListForm(player, json);
    }
    if (selection === 1) return await EnchantEditForm(player, json, enchant, i);
}