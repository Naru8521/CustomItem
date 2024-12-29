/**
 * @typedef {"gi" | "si"} CustomItemType 
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
 * @property {string[]} canDestory 
 * @property {boolean} keepOnDeath 
 * @property {import("@minecraft/server").ItemLockMode} lockMode 
 * @property {number} slot - si
 * @property {boolean} overwrite - si
 */