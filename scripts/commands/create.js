import { Block, Entity, Player } from "@minecraft/server";
import MenuForm from "../forms/menu";

/**
 * @param {string[]} args 
 * @param {{ player: Player?, entity: Entity?, initiator: Entity?, block: Block? }} ev 
 */
export async function run(args, ev) {
    const { player, entity, initiator, block } = ev;

    if (!player) return;

    await MenuForm(player);
}