import { Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import CustomItem from "../modules/CustomItem";
import MenuForm from "./MenuForm";

/**
 * @param {Player} player 
 * @param {Preset} preset 
 */
export default async function GenerateCommandForm(player, preset) {
    const { itemConfig } = preset;

    // フォームを初期化
    const form = new UI.ModalFormData();

    // フォームを作成
    form.title("コマンド生成");
    form.textField("コマンド", "", CustomItem.generateCommand(itemConfig));
    form.submitButton("戻る");

    // フォームを表示
    const { formValues, canceled } = await form.show(player);

    // メニューフォームへ戻る
    await MenuForm(player, preset);
}