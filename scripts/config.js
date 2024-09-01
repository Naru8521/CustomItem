/** @type {import("./types").CommandConfig} */
export const commandConfig = {
    prefix: "ci",
    ids: [
        "g:i",
        "s:i"
    ],
    tags: ["op"]
}

/** @type {import("./types").PresetConfig} */
export const presetConfig = {
    type: "g:i",
    basic: {
        id: "",
        nameTag: "",
        lore: [],
        amounts: [
            1
        ]
    },
    detail: {
        canPlaceOn: [],
        canDestory: [],
        keepOnDeath: false,
        lockMode: "none",
        gi: {
            drop: true
        },
        si: {
            slot: 0,
            overwrite: true,
            drop: true 
        }
    }
}

/** @type {import("./types").Types} */
export const types = [
    "g:i",
    "s:i"
]

/** @type {import("./types").LockModes} */
export const lockModes = [
    "none",
    "inventory",
    "slot"
]