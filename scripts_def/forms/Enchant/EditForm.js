import { EnchantmentTypes, Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import EnchantsListForm from "./ListForm";

/**
 * @param {Player} player 
 * @param {Preset} preset 
 * @param {number} i 
 */
export default async function EnchantsEditForm(player, preset, i) {
    let { itemConfig } = preset;

    // フォームを初期化
    const form = new UI.ModalFormData();

    const enchantId = itemConfig.enchants[i].split(".")[0];
    const enchantLevel = itemConfig.enchants[i].split(".")[1];

    // エンチャントリスト
    const enchantTypes = EnchantmentTypes.getAll();
    const enchantIds = enchantTypes.map(v => v.id);
    const enchantMaxlevels = enchantTypes.map(v => v.maxLevel);
    const levels = createArray(enchantMaxlevels[enchantIds.findIndex(v => v === enchantId)]);

    // フォームを作成
    form.title("エンチャント編集");
    form.dropdown(`エンチャントID: ${enchantId}\nエンチャントレベル`, levels, levels.findIndex(v => v === enchantLevel));
    form.toggle("§c削除", false);
    form.submitButton("設定");

    // フォームを表示
    const { formValues, canceled } = await form.show(player);

    // フォームをキャンセルする
    if (canceled) return await EnchantsListForm(player, preset);

    if (formValues[1]) {
        // enchantsから削除
        itemConfig.enchants.splice(i, 1);
    } else {
        // enchantsに上書き
        itemConfig.enchants[i] = `${enchantId}.${levels[formValues[0]]}`;
    }

    // リストを表示
    await EnchantsListForm(player, preset);
}

function createArray(maxLevel) {
    const levels = [];

    for (let i = 1; i <= maxLevel; i++) {
        levels.push(`${i}`);
    }

    return levels;
}