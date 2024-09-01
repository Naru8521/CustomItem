import { Player } from "@minecraft/server";
import MenuForm from "../forms/menu";
import * as config from "../config";

/**
 * @param {Player} player
 * @param {string[]} args
 */
export async function run(player, args) {
    const preset = JSON.parse(JSON.stringify(config.presetConfig));
    let json = null;

    try {
        if (args[0] === "/scriptevent" && config.types.includes(args[1])) {
            json = JSON.parse(args[2]);
            preset.type = args[1];
        } else {
            json = JSON.parse(args[0]);
            preset.type = "g:i";
        }

        if (json) {
            preset.basic = getBasicConfig(json);
            preset.detail = getDetailConfig(json);

            await MenuForm(player, preset);
        } else {
            player.sendMessage("§cエラー: 無効なJSONデータです");
        }
    } catch (e) {
        player.sendMessage("§cエラー: JSONのパースに失敗しました");
    }
}

/**
 * @param {object} json
 * @returns {object}
 */
function getBasicConfig(json) {
    return {
        id: json.id ?? "",
        nameTag: json.nameTag ?? "",
        lore: json.lore ?? [],
        amounts: json.amounts.length > 0 ? json.amounts : 1
    };
}

/**
 * @param {object} json
 * @returns {object}
 */
function getDetailConfig(json) {
    return {
        canPlaceOn: json.canPlaceOn ?? [],
        canDestory: json.canDestory ?? [],
        keepOnDeath: typeof json.keepOnDeath === "boolean" ? json.keepOnDeath : false,
        lockMode: config.lockModes.includes(json.lockMode) ? json.lockMode : "none",
        gi: {
            drop: typeof json.drop === "boolean" ? json.drop : false
        },
        si: {
            slot: typeof json.slot === "number" ? json.slot : 0,
            overwrite: typeof json.overwrite === "boolean" ? json.overwrite : true,
            drop: typeof json.drop === "boolean" ? json.drop : true
        }
    };
}
