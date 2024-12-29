import { Block, Entity, Player, world } from "@minecraft/server";
import CustomItem from "../libs/CustomItem";

/**
 * @param {string[]} args 
 * @param {{ player?: Player, entity?: Entity, initiator?: Entity, block?: Block }} ev 
 */
export function run(args, ev) {
    const { player, entity, initiator, block } = ev;
    const itemConfig = CustomItem.generateItemConfig(args[0]);

    if (!itemConfig) {
        player?.sendMessage("§cエラー: itemConfigの構築に失敗しました。");
        return;
    }

    const { type, slot, overwrite } = itemConfig;
    const itemStack = CustomItem.getItemStack(itemConfig);

    if (!itemStack) {
        player?.sendMessage("§cエラー: アイテムの生成に失敗しました。");
        return;
    }

    // コンテナ取得
    const container = player?.getComponent("inventory")?.container ??
                      entity?.getComponent("inventory")?.container ??
                      initiator?.getComponent("inventory")?.container ??
                      block?.getComponent("inventory")?.container;

    if (!container) {
        player?.sendMessage("§cエラー: コンテナーが見つかりませんでした。");
        return;
    }

    // アイテムの追加/設定
    if (type === "gi") {
        container.addItem(itemStack);
    } else if (type === "si") {
        const slotItem = container.getItem(slot);
        if (!overwrite && slotItem) return;
        container.setItem(slot, itemStack);
    }
}
