import { Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import MenuForm from "./MenuForm";
import { CustomItemType } from "../config";

/**
 * @param {Player} player 
 * @param {Preset} preset 
 */
export default async function TypeForm(player, preset) {
    let { itemConfig } = preset;
    
        // フォームを初期化
        const form = new UI.ModalFormData();
    
        // フォームを作成
        form.title("タイプ設定");
        form.dropdown("タイプ", Object.values(CustomItemType), Object.values(CustomItemType).findIndex(v => v === itemConfig.type));
        form.submitButton("設定");
    
        const { formValues, canceled } = await form.show(player);
    
        // フォームをキャンセルする
        if (canceled) return await MenuForm(player, preset);
    
        // itemConfigをセット
        itemConfig.type = Object.values(CustomItemType)[formValues[0]];
    
        // メニューフォームへ戻る
        await MenuForm(player, preset);
}