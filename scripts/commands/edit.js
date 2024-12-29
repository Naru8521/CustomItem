import { Block, Entity, Player } from "@minecraft/server";
import MenuForm from "../forms/menu";
import CustomItem from "../libs/CustomItem";

/**
 * コマンド実行時の処理を行う
 * @param {string[]} args - コマンド引数
 * @param {{ player?: Player, entity?: Entity, initiator?: Entity, block?: Block }} ev - イベント情報
 */
export async function run(args, ev) {
    const { player } = ev;

    if (!player) return;

    const itemConfig = CustomItem.generateItemConfig(args[0]);

    if (!itemConfig) {
        player.sendMessage("§cエラー: itemConfigの構築に失敗しました。");
        return;
    }

    try {
        await MenuForm(player, itemConfig);
    } catch (error) {
        player.sendMessage(`§cエラー: メニューを表示中に問題が発生しました。 (${error.message})`);
    }
}
