import { Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import MenuForm from "./menu";
import { customItemTypes } from "../config";
import CustomItem from "../libs/CustomItem";

/**
 * @param {Player} player 
 * @param {ItemConfig} itemConfig
 */
export default async function GenCommandForm(player, itemConfig) {
    // フォームを初期化
    const form = new UI.ModalFormData();

    // フォームを作成
    form.title("コマンド");
    form.textField("コマンド", "", CustomItem.generateCommand(itemConfig));
    form.submitButton("確認");

    // フォームを表示
    const { formValues, canceled } = await form.show(player);

    // フォームをキャンセルする
    if (canceled) return await MenuForm(player, itemConfig);
}