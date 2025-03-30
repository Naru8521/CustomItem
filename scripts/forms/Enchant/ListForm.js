import { Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import MenuForm from "../MenuForm";
import EnchantsAddForm from "./AddForm";
import EnchantsEditForm from "./EditForm";

/**
 * @param {Player} player 
 * @param {Preset} preset 
 */
export default async function EnchantsListForm(player, preset) {
    let { itemConfig } = preset;

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
    if (canceled) return await MenuForm(player, preset);

    // ボタンが選択された時
    if (selection === 0) return await MenuForm(player, preset);
    if (selection === 1) return await EnchantsAddForm(player, preset);
    await EnchantsEditForm(player, preset, selection - 2);
}