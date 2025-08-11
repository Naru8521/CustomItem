import { ItemLockMode, type Player } from "@minecraft/server";
import type { ItemJSON } from "../types/itemJSON";
import * as UI from "@minecraft/server-ui";
import EditTypeForm from "./EditTypeForm";
import BasicForm from "./BasicForm";
import DetailForm from "./DetailForm";
import EnchantsListForm from "./enchants/ListForm";
import GenCommandForm from "./GenCommandForm";
import { ItemJSONType } from "../types/stats.enum";

export default async function MenuForm(player: Player, json?: ItemJSON): Promise<void> {
    if (!json) {
        json = {
            type: ItemJSONType.GiveItem,
            id: "",
            nameTag: "",
            lore: [],
            amount: 0,
            amounts: [],
            enchants: [],
            canPlaceOn: [],
            canDestroy: [],
            keepOnDeath: false,
            lockMode: ItemLockMode.none,
            slot: 0,
            overwrite: false
        };
    }
    
    const form = new UI.ActionFormData();

    form.title("アイテムJSON管理");
    form.button("付与タイプ");
    form.button("基本設定");
    form.button("詳細設定");
    form.button("エンチャント設定");
    form.button("コマンド生成");
    form.button("閉じる");

    const { selection, canceled } = await form.show(player);

    if (canceled) return await CloseCheck(player, json);
    if (selection === 0) return await EditTypeForm(player, json);
    if (selection === 1) return await BasicForm(player, json);
    if (selection === 2) return await DetailForm(player, json);
    if (selection === 3) return await EnchantsListForm(player, json);
    if (selection === 4) return await GenCommandForm(player, json);
    if (selection === 5) return;
}

async function CloseCheck(player: Player, json: ItemJSON): Promise<void> {
    const form = new UI.ActionFormData();

    form.title("確認");
    form.body("このままフォームを閉じると、変更されたデータが破棄されますが、よろしいですか？");
    form.button("はい");
    form.button("いいえ");

    const { selection, canceled } = await form.show(player);

    if (canceled) return await CloseCheck(player, json);
    if (selection === 0) return;
    if (selection === 1) return await MenuForm(player, json);
}