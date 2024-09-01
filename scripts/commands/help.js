import { Player } from "@minecraft/server";
import * as config from "../config";

/**
 * @param {Player} player
 * @param {string[]} args
 */
export function run(player, args) {
    const prefix = config.commandConfig.prefix;
    const ids = config.commandConfig.ids;

    player.sendMessage([
        `§bーー[ コマンドヘルプ ]ーー§f`,
        `§eprefix§f: ${prefix}`,
        `§eids§f: ${ids}`,
        `§a${prefix} create§f - コマンドを生成する`,
        `§a${prefix} edit <command | json>§f - コマンドまたはJSONを編集する`,
        `§a${prefix} help§f - ヘルプを表示する`,
        `§bーーーーーーーーーーーー§f`
    ].join("\n"));
}