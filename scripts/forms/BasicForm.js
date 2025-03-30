import { Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import MenuForm from "./MenuForm";

/**
 * @param {Player} player 
 * @param {Preset} preset 
 */
export default async function BasicForm(player, preset) {
    let { itemConfig } = preset;

    // フォームを初期化
    const form = new UI.ModalFormData();

    // フォームを作成
    form.title("基本情報");
    form.textField("アイテムID", "minecraft:stick", itemConfig.id);
    form.textField("アイテム名 (\\nで改行されます)", "アイテム名\\ntest", itemConfig.nameTag);
    form.textField("アイテムロア (\\nで改行されます)", "a\\nb\\nc", itemConfig.lore.join(","));
    form.textField("アイテム数", "1", `${itemConfig.amount}`);
    form.textField("ランダムアイテム数 (,で区切ることで複数ランダムになります)", "1,2,3", `${itemConfig.amounts.join(",")}`);
    form.submitButton("設定");

    const { formValues, canceled } = await form.show(player);

    // フォームをキャンセルする
    if (canceled) return await MenuForm(player, preset);

    // itemConfigをセット
    itemConfig.id = formValues[0].trim();
    itemConfig.nameTag = formValues[1].replaceAll("\\n", "\n");
    itemConfig.lore = formValues[2].trim() !== "" ? formValues[2].split("\\n") : [];
    itemConfig.amount = parseInt(formValues[3]);
    itemConfig.amounts = formValues[4].trim() !== "" ? formValues[4].split(",").map(v => parseInt(v)).filter(v => v > 0) : [];

    // メニューフォームへ戻る
    await MenuForm(player, preset);
}