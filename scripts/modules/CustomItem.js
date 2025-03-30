import { EnchantmentType, ItemComponentTypes, ItemLockMode, ItemStack, Player } from "@minecraft/server";
import { CustomItemType } from "../config";

export default class CustomItem {
    /**
     * @param {ItemConfig} itemConfig 
     */
    static generateCommand(itemConfig) {
        const keys = [
            "type", "id", "nameTag", "lore", "amount", "amounts",
            "enchants", "canPlaceOn", "canDestroy", "keepOnDeath", "lockMode"
        ];

        const commandData = keys.reduce((obj, key) => {
            const value = itemConfig[key];

            if (
                (typeof value === "string" && value !== "" && value !== "none") ||
                (Array.isArray(value) && value.length > 0) ||
                (typeof value === "number" && value > 0) ||
                (typeof value === "boolean" && value)
            ) {
                obj[key] = value;
            }

            return obj;
        }, {});

        if (itemConfig.type === "si") {
            if (itemConfig.slot >= 0) commandData.slot = itemConfig.slot;
            if (itemConfig.overwrite) commandData.overwrite = itemConfig.overwrite;
        }

        return `/scriptevent c:i run ${JSON.stringify(commandData)}`;
    }

    /**
     * @param {string} objstr 
     * @returns {ItemConfig | null}
     */
    static getItemConfigByObjstr(objstr) {
        try {
            const obj = JSON.parse(objstr);

            const type = Object.values(CustomItemType).includes(obj.type) ? obj.type : "gi";
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

            if (type === "si") {
                const slot = obj.slot ?? 0;
                const overwrite = obj.overwrite ?? false;

                newItemConfig = { ...newItemConfig, slot, overwrite };
            }

            return newItemConfig;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    /**
     * @param {ItemStack} itemStack 
     * @returns {ItemConfig | null}
     */
    static getItemConfigByItemStack(itemStack) {
        try {
            const type = CustomItemType.gi;
            const id = itemStack.typeId;
            const nameTag = itemStack.nameTag ?? "";
            const lore = itemStack.getLore();
            const amount = itemStack.amount;
            const amounts = [];
            const enchants = itemStack.getComponent(ItemComponentTypes.Enchantable)
                ? itemStack.getComponent(ItemComponentTypes.Enchantable).getEnchantments().map((v) => `${v.type.id}.${v.level}`)
                : [];
            const canPlaceOn = itemStack.getCanPlaceOn();
            const canDestory = itemStack.getCanDestroy();
            const keepOnDeath = itemStack.keepOnDeath;
            const lockMode = itemStack.lockMode;
            const slot = 0;
            const overwrite = true;
            const newItemConfig = { type, id, nameTag, lore, amount, amounts, enchants, canPlaceOn, canDestory, keepOnDeath, lockMode, slot, overwrite };

            return newItemConfig;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    /**
     * @param {ItemConfig} itemConfig 
     * @returns {ItemStack | null}
     */
    static getItemStack(itemConfig) {
        const {
            id, nameTag, lore, amount, amounts, enchants,
            canPlaceOn, canDestroy, keepOnDeath, lockMode
        } = itemConfig;

        try {
            const itemStack = new ItemStack(id);

            Object.assign(itemStack, { nameTag, keepOnDeath, lockMode });
            itemStack.setLore(lore);
            itemStack.setCanPlaceOn(canPlaceOn);
            itemStack.setCanDestroy(canDestroy);
            itemStack.amount = amounts.length
                ? amounts[Math.floor(Math.random() * amounts.length)]
                : amount;

            const enchantable = itemStack.getComponent(ItemComponentTypes.Enchantable);

            if (enchantable) {
                enchants.forEach(enchant => {
                    const [typeStr, levelStr] = enchant.split(".");

                    if (!typeStr || !levelStr) return;

                    const type = new EnchantmentType(typeStr);
                    const level = Number(levelStr) || 1;

                    enchantable.addEnchantment({ type, level });
                });
            }

            return itemStack;
        } catch (e) {
            console.log(e);
            return null;
        }
    }
}
