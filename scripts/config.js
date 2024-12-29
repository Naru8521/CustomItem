import { ItemLockMode } from "@minecraft/server";

/** @type {import("./libs/commandHandler").CommandsPath} */
export const commandsPath = "../commands";

/** @type {import("./libs/commandHandler").CommandSetting} */
export const commandSetting = {
    prefixs: ["ci"],
    ids: ["c:i"]
};

/** @type {import("./libs/commandHandler").Commands} */
export const commands = [
    {
        name: "create",
        tags: ["op"]
    },
    {
        name: "edit",
        tags: ["op"]
    },
    {
        name: "run",
        tags: ["op"]
    }
];

/** @type {CustomItemType[]} */
export const customItemTypes = [
    "gi",
    "si"
];

/** @type {ItemConfig} */
export const ItemConfigDef = {
    type: "gi",
    id: "",
    nameTag: "",
    lore: [],
    amount: 1,
    amounts: [],
    enchants: [],
    canPlaceOn: [],
    canDestory: [],
    keepOnDeath: false,
    lockMode: ItemLockMode.none,
    slot: 0,
    overwrite: false
};