import { Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import MenuForm from "../menu";
import EnchantsAddForm from "./add";
import EnchantsEditForm from "./edit";

/**
 * @param {Player} player 
 * @param {ItemConfig} itemConfig
 */
export default async function EnchantsListForm(player, itemConfig) {
    // フォームを初期化
    const form = new UI.ActionFormData();

    // フォームを作成
    form.title("エンチャントリスト");
    form.button("戻る");
    form.button("§b追加");
    for (const enchant of itemConfig.enchants) {
        form.button(enchant);
    }

    // フォームを表示
    const { selection, canceled } = await form.show(player);

    // フォームをキャンセルする
    if (canceled) return await MenuForm(player, itemConfig);

    // ボタンが選択された時
    if (selection === 0) return await MenuForm(player, itemConfig);
    if (selection === 1) return await EnchantsAddForm(player, itemConfig);
    await EnchantsEditForm(player, itemConfig, selection - 2);
}