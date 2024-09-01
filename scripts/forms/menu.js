import { Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import * as util from "../util";
import TypeForm from "./type";
import BasicForm from "./basic";
import DetailForm from "./detail";
import GenerateForm from "./generate";

/**
 * @param {Player} player 
 * @param {import("../types").PresetConfig} preset
 * @param {string?} err
 */
export default async function MenuForm(player, preset, err) {
    const type = preset.type;
    const basic = preset.basic;
    const form = new UI.ActionFormData();

    form.title("メニュー");
    form.body([
        `${err ? `§c${err}§f\n` : ""}タイプ: ${type}`,
        `アイテムID: ${basic.id}`,
        `アイテム数: ${basic.amounts}`
    ].join("\n"));
    form.button("§lタイプ設定");
    form.button("§l基本設定");
    form.button("§l詳細設定");
    form.button("§l§aコマンド生成");

    const { selection, canceled } = await util.formBusy(player, form);

    if (canceled) return;

    switch (selection) {
        case 0:
            await TypeForm(player, preset);
            break;

        case 1:
            await BasicForm(player, preset);
            break;

        case 2:
            await DetailForm(player, preset);
            break;

        case 3:
            await GenerateForm(player, preset);
            break;

        default:
            player.sendMessage("§cエラー: 不正な選択が行われました");
            break;
    }
}