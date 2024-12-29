import { EnchantmentType, ItemLockMode, ItemStack } from "@minecraft/server";
import { customItemTypes } from "../config";

export default class CustomItem {
    /**
     * @param {string} objstr
     * @returns {ItemConfig | null} 
     */
    static generateItemConfig(objstr) {
        try {
            const obj = JSON.parse(objstr);

            const type = customItemTypes.includes(obj.type) ? obj.type : "g:i";
            const id = obj.id ?? "";
            const nameTag = obj.nameTag ?? "";
            const lore = obj.lore ?? [];
            const amount = obj.amount ?? 1;
            const amounts = obj.amounts ?? [];
            const enchants = obj.enchants ?? [];
            const canPlaceOn = obj.canPlaceOn ?? [];
            const canDestory = obj.canDestory ?? [];
            const keepOnDeath = obj.keepOnDeath ?? false;
            const lockMode = obj.lockMode ?? ItemLockMode.none;
            let newItemConfig = { type, id, nameTag, lore, amount, amounts, enchants, canPlaceOn, canDestory, keepOnDeath, lockMode };

            if (type === "s:i") {
                const slot = obj.slot ?? 0;
                const overwrite = obj.overwrite ?? false;
                newItemConfig = { ...newItemConfig, slot, overwrite };
            }

            return newItemConfig;
        } catch (e) {
            console.error(e);
        }

        return null;
    }

    /**
     * @param {ItemConfig} itemConfig 
     */
    static generateCommand(itemConfig) {
        const { type, id, nameTag, lore, amount, amounts, enchants, canPlaceOn, canDestory, keepOnDeath, lockMode, slot, overwrite } = itemConfig;
        const commands = [];
        let command = "/scriptevent c:i run ";

        if (type !== "") commands.push(`"type":"${type}"`);
        if (id !== "") commands.push(`"id":"${id}"`);
        if (nameTag !== "") commands.push(`"nameTag":"${nameTag}"`);
        if (lore.length > 0) commands.push(`"lore":${JSON.stringify(lore)}`);
        if (amount > 0) commands.push(`"amount":${amount}`);
        if (amounts.length > 0) commands.push(`"amounts":${JSON.stringify(amounts)}`);
        if (enchants.length > 0) commands.push(`"enchants":${JSON.stringify(enchants)}`);
        if (canPlaceOn.length > 0) commands.push(`"canPlaceOn":${JSON.stringify(canPlaceOn)}`);
        if (canDestory.length > 0) commands.push(`"canDestory":${JSON.stringify(canDestory)}`);
        if (keepOnDeath) commands.push(`"keepOnDeath":${keepOnDeath}`);
        if (lockMode !== "none") commands.push(`"lockMode":"${lockMode}"`);
        if (type === "s:i") {
            if (slot >= 0) commands.push(`"slot":${slot}`);
            if (overwrite) commands.push(`"overwrite":${overwrite}`);
        }

        command += "{" + commands.join(",") + "}";

        return command;
    }

    /**
     * @param {ItemConfig} itemConfig 
     * @returns {ItemStack | null}
     */
    static getItemStack(itemConfig) {
        const { id, nameTag, lore, amount, amounts, enchants, canPlaceOn, canDestory, keepOnDeath, lockMode } = itemConfig;

        try {
            const itemStack = new ItemStack(id);

            itemStack.nameTag = nameTag;
            itemStack.setLore(lore);
            itemStack.setCanPlaceOn(canPlaceOn);
            itemStack.setCanDestroy(canDestory);
            itemStack.keepOnDeath = keepOnDeath;
            itemStack.lockMode = lockMode;
            
            if (amounts.length > 0) {
                const randomAmount = amounts[Math.floor(Math.random() * amounts.length)];
                itemStack.amount = randomAmount;
            } else {
                itemStack.amount = amount;
            }

            // エンチャント
            const enchantable = itemStack.getComponent("enchantable");
            if (enchantable) {
                for (const enchant of enchants) {
                    if (enchant.split(".").length !== 2) continue;

                    const type = new EnchantmentType(enchant.split(".")[0]);
                    const level = isNaN(Number(enchant.split(".")[1])) ? 1 : Number(enchant.split(".")[1]);
                    const enchantment = { type, level };

                    enchantable.addEnchantment(enchantment);
                }
            }

            return itemStack;
        } catch (e) {
            console.error(e);
        }

        return null;
    }
}