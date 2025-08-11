import { ItemLockMode, Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import MenuForm from "./MenuForm";

/**
 * @param {Player} player 
 * @param {Preset} preset 
 */
export default async function DetailForm(player, preset) {
    let { itemConfig } = preset;

    // フォームを初期化
    const form = new UI.ModalFormData();

    // フォームを作成
    form.title("詳細情報");
    form.textField("設置可能ブロックID (,で区切る)", "minecraft:stone,minecraft:grass...", itemConfig.canPlaceOn.join(","));
    form.textField("破壊可能ブロックID (,で区切る)", "minecraft:stone,minecraft:grass...", itemConfig.canDestroy.join(","));
    form.toggle("死亡時にキープ", itemConfig.keepOnDeath);
    form.dropdown("ロックモード", Object.values(ItemLockMode), Object.values(ItemLockMode).findIndex(value => value === itemConfig.lockMode));

    if (itemConfig.type === "si") {
        form.textField("セットスロット", "0", `${itemConfig.slot}`);
        form.toggle("上書き", itemConfig.overwrite);
    }

    form.submitButton("設定");

    // フォームを表示
    const { formValues, canceled } = await form.show(player);

    // フォームをキャンセルする
    if (canceled) return await MenuForm(player, preset);

    // itemConfigをセット
    itemConfig.canPlaceOn = formValues[0].trim() !== "" ? formValues[0].split(",") : [];
    itemConfig.canDestroy = formValues[1].trim() !== "" ? formValues[1].split(",") : [];
    itemConfig.keepOnDeath = formValues[2];
    itemConfig.lockMode = Object.values(ItemLockMode)[formValues[3]];

    if (itemConfig.type === "si") {
        itemConfig.slot = parseInt(formValues[4]) ?? 0;
        itemConfig.overwrite = formValues[5];
    }

    // メニューフォームへ戻る
    await MenuForm(player, preset);
}