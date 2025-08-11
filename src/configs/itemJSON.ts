import { ItemLockMode } from "@minecraft/server";
import type { ItemJSON } from "../types/itemJSON";
import { ItemJSONType } from "../types/stats.enum";

export const DefItemJSON: ItemJSON = {
    type: ItemJSONType.GiveItem,
    id: "",
    nameTag: "",
    lore: [],
    amount: 1,
    amounts: [],
    enchants: [],
    canDestroy: [],
    canPlaceOn: [],
    keepOnDeath: false,
    lockMode: ItemLockMode.none,
    slot: 0,
    overwrite: true
};