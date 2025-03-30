import { ItemLockMode } from "@minecraft/server";

export const config = {
    command: {
        prefixes: ["ci "],
        ids: ["c:i"]
    }
};

/** @type {CustomItemTypes} */
export const CustomItemType = {
    "gi": "gi",
    "si": "si"
};

/** @type {Preset} */
export const PresetDef = {
    isEdit: false,
    itemConfig: {
        type: "gi",
        id: "",
        nameTag: "",
        lore: [],
        amount: 1,
        amounts: [],
        enchants: [],
        canPlaceOn: [],
        canDestroy: [],
        keepOnDeath: false,
        lockMode: ItemLockMode.none,
        slot: 0,
        overwrite: false
    }
};