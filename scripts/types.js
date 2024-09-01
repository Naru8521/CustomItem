import { ItemLockMode } from "@minecraft/server";

/**
 * @typedef {Object} CommandConfig
 * @property {string} prefix - チャット実行時の最初に付ける文字
 * @property {string} ids - scriptEventコマンド実行時の識別IDs
 * @property {string[]} tags - 実行権限のタグリスト
 */

/**
 * @typedef {Object} PresetConfig
 * @property {"g:i" | "s:i"} type
 * @property {Basic} basic
 * @property {Detail} detail
 */

/**
 * @typedef {Object} Basic
 * @property {string} id
 * @property {string?} nameTag
 * @property {string[]} lore
 * @property {number[]} amounts
 */

/**
 * @typedef {Object} Detail
 * @property {string[]} canPlaceOn
 * @property {string[]} canDestory
 * @property {boolean} keepOnDeath
 * @property {ItemLockMode} lockMode
 * @property {GI} gi
 * @property {SI} si
 */

/**
 * @typedef {Object} GI
 * @property {boolean} drop
 */

/**
 * @typedef {Object} SI
 * @property {number} slot
 * @property {boolean} overwrite
 * @property {boolean} drop
 */

/**
 * @typedef {"g:i" | "s:i"} Types
 */

/**
 * @typedef {"inventory" | "none" | "slot"} LockModes
 */