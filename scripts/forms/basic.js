import { Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import MenuForm from "./menu";

/**
 * @param {Player} player 
 * @param {ItemConfig} itemConfig
 */
export default async function BasicForm(player, itemConfig) {
    // フォームを初期化
    const form = new UI.ModalFormData();

    // フォームを作成
    form.title("基本情報");
    form.textField("アイテムID", "minecraft:stick", itemConfig.id);
    form.textField("アイテム名", "", itemConfig.nameTag);
    form.textField("アイテムロア (,で区切る)", "", itemConfig.lore.join(","));
    form.textField("アイテム数", "", `${itemConfig.amount}`);
    form.textField("アイテム数 (ランダム) (,で区切る)", "", itemConfig.amounts.join(","));
    form.submitButton("設定");

    // フォームを表示
    const { formValues, canceled } = await form.show(player);

    // フォームをキャンセルする
    if (canceled) return await MenuForm(player, itemConfig);

    // itemConfigをセット
    const id = formValues[0];
    const nameTag = formValues[1];
    const lore = formValues[2].trim() !== "" ? formValues[2].split(",") : [];
    const amount = isNaN(Number(formValues[3])) ? 1 : Number(formValues[3]);
    const amounts = formValues[4].trim() !== "" ? formValues[4].split(",").map(v => Number(v)) : [];
    itemConfig = { ...itemConfig, id, nameTag, lore, amount, amounts };

    // メニューフォームへ戻る
    await MenuForm(player, itemConfig);
}