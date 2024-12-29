import { EnchantmentSlot, EnchantmentTypes, ItemLockMode, Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import MenuForm from "./menu";

/**
 * @param {Player} player 
 * @param {ItemConfig} itemConfig
 */
export default async function DetailForm(player, itemConfig) {
    // フォームを初期化
    const form = new UI.ModalFormData();

    // フォームを作成
    form.title("応用情報");
    form.textField("設置可能ブロックIDs (,で区切る)", "minecraft:stone,minecraft:grass...", itemConfig.canPlaceOn.join(","));
    form.textField("破壊可能ブロックIDs (,で区切る)", "minecraft:stone,minecraft:grass...", itemConfig.canDestory.join(","));
    form.toggle("死亡時にキープ", itemConfig.keepOnDeath);
    form.dropdown("ロックモード", Object.values(ItemLockMode), Object.values(ItemLockMode).findIndex(value => value === itemConfig.lockMode));
    form.submitButton("設定");

    if (itemConfig.type === "s:i") {
        form.textField("セットスロット", "0", `${itemConfig.slot}`);
        form.toggle("上書き", itemConfig.overwrite);
    }

    // フォームを表示
    const { formValues, canceled } = await form.show(player);

    // フォームをキャンセルする
    if (canceled) return await MenuForm(player, itemConfig);

    // itemConfigをセット
    const canPlaceOn = formValues[0].trim() !== "" ? formValues[0].split(",") : [];
    const canDestory = formValues[1].trim() !== "" ? formValues[1].split(",") : [];
    const keepOnDeath = formValues[2];
    const lockMode = Object.keys(ItemLockMode)[formValues[3]];
    itemConfig = { ...itemConfig, canPlaceOn, canDestory, keepOnDeath, lockMode };

    if (itemConfig.type === "s:i") {
        const slot = isNaN(Number(formValues[4])) ? 0 : Number(formValues[4]);
        const overwrite = formValues[5];
        itemConfig = { ...itemConfig, slot, overwrite };
    }

    // メニューフォームへ戻る
    await MenuForm(player, itemConfig);
}