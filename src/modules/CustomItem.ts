import { EnchantmentType, ItemComponentTypes, ItemLockMode, ItemStack } from "@minecraft/server";
import { config } from "../configs/config";
import type { ItemJSON } from "../types/itemJSON";
import { ItemJSONType } from "../types/stats.enum";
import Utils from "../utils/utils";

export default class CustomItem {
    static genCommand(itemJSON: ItemJSON): string {
        return `/${config.commandPrefix}:run ${JSON.stringify(itemJSON)}`;
    }

    static getItemJSON(objstr: string): ItemJSON | null {
        try {
            let newItemJSON: any = {};

            const obj = JSON.parse(objstr);

            newItemJSON.type = obj.type || ItemJSONType.GiveItem;
            newItemJSON.id = obj.id || "";
            newItemJSON.nameTag = obj.nameTag || "";
            newItemJSON.lore = obj.lore || [];
            newItemJSON.amount = obj.amount || 1;
            newItemJSON.amounts = obj.amounts || [];
            newItemJSON.enchants = obj.enchants || [];
            newItemJSON.canPlaceOn = obj.canPlaceOn || [];
            newItemJSON.canDestroy = obj.canDestroy || [];
            newItemJSON.keepOnDeath = obj.keepOnDeath || false;
            newItemJSON.lockMode = obj.lockMode || ItemLockMode.none;

            if (newItemJSON.type === ItemJSONType.SetItem) {
                newItemJSON.slot = obj.slot || 0;
                newItemJSON.overwrite = obj.overwrite || true;
            }

            return newItemJSON;
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    static getItemJSONByItemStack(itemStack: ItemStack): ItemJSON | null {
        try {
            let newItemJSON: any = {};

            newItemJSON.type = ItemJSONType.GiveItem
            newItemJSON.id = itemStack.typeId;
            newItemJSON.nameTag = itemStack.nameTag;
            newItemJSON.lore = itemStack.getLore();
            newItemJSON.amount = itemStack.amount;
            newItemJSON.amounts = [];
            newItemJSON.enchants = itemStack.getComponent(ItemComponentTypes.Enchantable)
                ? itemStack.getComponent(ItemComponentTypes.Enchantable)?.getEnchantments().map(v => {
                    const { type, level } = v;
                    const id = type.id;

                    return { id, level };
                })
                : [];
            newItemJSON.canPlaceOn = itemStack.getCanPlaceOn();
            newItemJSON.canDestroy = itemStack.getCanDestroy();
            newItemJSON.keepOnDeath = itemStack.keepOnDeath;
            newItemJSON.lockMode = itemStack.lockMode;
            newItemJSON.slot = 0;
            newItemJSON.overwrite = true;

            return newItemJSON;
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    static getItemStack(itemJSON: ItemJSON): ItemStack | null {
        try {
            const itemStack = new ItemStack(itemJSON.id);

            itemStack.amount = itemJSON.amounts.length > 0
                ? itemJSON.amounts[Utils.randomIndex(0, itemJSON.amounts.length)] || 1
                : itemJSON.amount;
            itemStack.setLore(itemJSON.lore);
            itemStack.setCanPlaceOn(itemJSON.canPlaceOn);
            itemStack.setCanDestroy(itemJSON.canDestroy);
            itemStack.nameTag = itemJSON.nameTag;
            itemStack.keepOnDeath = itemJSON.keepOnDeath;
            itemStack.lockMode = itemJSON.lockMode;

            const enchantable = itemStack.getComponent(ItemComponentTypes.Enchantable);

            if (enchantable) {
                itemJSON.enchants.forEach(enchant => {
                    const { id, level } = enchant;
                    const type = new EnchantmentType(id);
                    
                    enchantable.addEnchantment({ type, level });
                });
            }

            return itemStack;
        } catch (e) {
            console.error(e);
            return null;
        }
    }
}