import type { ItemLockMode } from "@minecraft/server"
import type { ItemJSONType } from "./stats.enum"

type ItemJSON = {
    type: ItemJSONType,
    id: string,
    nameTag: string,
    lore: string[],
    amount: number,
    amounts: number[],
    enchants: ItemJSONEnchant[],
    canPlaceOn: string[],
    canDestroy: string[],
    keepOnDeath: boolean,
    lockMode: ItemLockMode,
    slot: number,
    overwrite: boolean,
}

type ItemJSONEnchant = {
    id: string,
    level: number
}