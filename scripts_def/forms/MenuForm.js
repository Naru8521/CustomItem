import { Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import Util from "../utils/util";
import ObjectUtil from "../utils/objectUtil";
import { PresetDef } from "../config";
import BasicForm from "./BasicForm";
import DetailForm from "./DetailForm";
import TypeForm from "./TypeForm";
import EnchantsListForm from "./Enchant/ListForm";
import GenerateCommandForm from "./GenerateCommandForm";

/**
 * @param {Player} player 
 * @param {Preset} preset 
 */
export default async function MenuForm(player, preset) {
    if (!preset) preset = ObjectUtil.duplication(PresetDef);

    const { isEdit } = preset;

    // フォームを初期化
    const form = new UI.ActionFormData();

    // フォームを作成
    form.title(isEdit ? "アイテム編集メニュー" : "アイテム作成メニュー");
    form.button("§lタイプ設定");
    form.button("§l基本情報");
    form.button("§l詳細情報");
    form.button("§lエンチャント");
    form.button("§l§bコマンド生成");
    form.button("§l完了");

    // フォームを表示
    const { selection, canceled } = await Util.formBusy(player, form);

    // フォームをキャンセルする
    if (canceled) return;

    // ボタンが選択された時
    if (selection === 0) return await TypeForm(player, preset);
    if (selection === 1) return await BasicForm(player, preset);
    if (selection === 2) return await DetailForm(player, preset);
    if (selection === 3) return await EnchantsListForm(player, preset);
    if (selection === 4) return await GenerateCommandForm(player, preset);
    if (selection === 5) return;
}