import { EnchantmentTypes, Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import EnchantsListForm from "./list";
import EnchantsEditForm from "./edit";

/**
 * @param {Player} player 
 * @param {ItemConfig} itemConfig
 */
export default async function EnchantsAddForm(player, itemConfig) {
    // フォームを初期化
    const form = new UI.ModalFormData();

    // エンチャントリスト
    const enchantTypes = EnchantmentTypes.getAll();
    const enchantIds = enchantTypes.map(v => v.id);
    const enchantMaxlevels = enchantTypes.map(v => v.maxLevel);

    // フォームを作成
    form.title("エンチャント追加");
    form.dropdown("※レベルはIDを設定した後、編集できます。\nエンチャントID", enchantIds);
    form.submitButton("設定");

    // フォームを表示
    const { formValues, canceled } = await form.show(player);

    // フォームをキャンセルする
    if (canceled) return await EnchantsListForm(player, itemConfig);

    // enchantsに追加
    itemConfig.enchants.push(`${enchantIds[formValues[0]]}.${enchantMaxlevels[formValues[0]]}`);

    // 編集画面を表示
    await EnchantsEditForm(player, itemConfig, itemConfig.enchants.length - 1);
}