import { Player, world } from "@minecraft/server";
import MenuForm from "../forms/menu";
import * as config from "../config";

/**
 * @param {Player} player
 * @param {string[]} args
 */
export async function run(player, args) {
    const preset = JSON.parse(JSON.stringify(config.presetConfig));

    await MenuForm(player, preset);
}