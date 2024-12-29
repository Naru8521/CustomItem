import { Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import { ObjectUtil } from "../utils/objectUtil";
import { ItemConfigDef } from "../config";
import { Util } from "../utils/util";
import TypeForm from "./type";
import BasicForm from "./basic";
import DetailForm from "./detail";
import EnchantsListForm from "./enchants/list";
import GenCommandForm from "./gen_command";

/**
 * @param {Player} player 
 * @param {ItemConfig | undefined} itemConfig
 */
export default async function MenuForm(player, itemConfig) {
    // フォームを初期化
    const form = new UI.ActionFormData();

    // itemConfigを初期化
    if (!itemConfig) itemConfig = ObjectUtil.duplication(ItemConfigDef);

    // フォームを作成
    form.title("アイテム作成メニュー");
    form.body([
        `type: ${itemConfig.type}`,
        `id: ${itemConfig.id}`
    ].join("\n"));
    form.button("§lタイプ変更");
    form.button("§l基本情報");
    form.button("§l応用情報");
    form.button("§lエンチャント");
    form.button("§l§aコマンドを作成");

    // フォームを表示
    const { selection, canceled } = await Util.formBusy(player, form);

    // フォームをキャンセルする
    if (canceled) return;

    // ボタンが選択された時
    if (selection === 0) return await TypeForm(player, itemConfig);
    if (selection === 1) return await BasicForm(player, itemConfig);
    if (selection === 2) return await DetailForm(player, itemConfig);
    if (selection === 3) return await EnchantsListForm(player, itemConfig);
    if (selection === 4) return await GenCommandForm(player, itemConfig);
}