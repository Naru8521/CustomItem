/**
 * @typedef {"gi" | "si"} CustomItemType 
 */

/**
 * @typedef {Object} Preset 
 * @property {boolean} isEdit
 * @property {ItemConfig} itemConfig 
 */

/**
 * @typedef {Object} CustomItemTypes 
 * @property {"gi"} gi 
 * @property {"si"} si 
 */

/**
 * @typedef {Object} ItemConfig 
 * @property {CustomItemType} type 
 * @property {string} id 
 * @property {string} nameTag 
 * @property {string[]} lore 
 * @property {number} amount 
 * @property {number[]} amounts  
 * @property {string[]} enchants 
 * @property {string[]} canPlaceOn 
 * @property {string[]} canDestroy
 * @property {boolean} keepOnDeath 
 * @property {import("@minecraft/server").ItemLockMode} lockMode 
 * @property {number} slot - si
 * @property {boolean} overwrite - si 
 */