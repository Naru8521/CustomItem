import { Container, Entity, ItemStack, system, world } from "@minecraft/server";
import * as config from "./config";

world.beforeEvents.chatSend.subscribe(async (ev) => {
    const { sender, message } = ev;

    if (message.startsWith(config.commandConfig.prefix)) {
        ev.cancel = true;

        const tags = sender.getTags();
        const hasPermission = tags.some(tag => config.commandConfig.tags.includes(tag));

        if (hasPermission) {
            const command = message.slice(config.commandConfig.prefix.length).trim();
            const [commandName, ...args] = command.split(' ');

            try {
                const module = await import(`./commands/${commandName}`);
                module.run(sender, args);
            } catch (e) {
                sender.sendMessage(`§cエラー: ${message}。そのコマンドは存在しません`);
            }
        } else {
            sender.sendMessage(`§cエラー: コマンドの実行権限がありません`);
        }
    }
});

system.afterEvents.scriptEventReceive.subscribe(ev => {
    const { id, message, sourceEntity } = ev;

    if (!sourceEntity || !config.types.includes(id)) return;

    try {
        /** @type {import("./types").PresetConfig} */
        const preset = JSON.parse(JSON.stringify(config.presetConfig));
        const json = JSON.parse(message);

        preset.type = id;
        preset.basic = {
            id: json.id || "",
            nameTag: json.nameTag || "",
            lore: json.lore || [],
            amounts: json.amounts.length > 0 ? json.amounts : [1]
        };
        preset.detail = {
            canPlaceOn: json.canPlaceOn || [],
            canDestory: json.canDestory || [],
            keepOnDeath: !!json.keepOnDeath,
            lockMode: config.lockModes.includes(json.lockMode) ? json.lockMode : "none",
            gi: { drop: !!json.drop },
            si: { slot: json.slot || 0, overwrite: !!json.overwrite, drop: !!json.drop }
        };

        if (!preset.basic.id) return sourceEntity.sendMessage("§cエラー: アイテムIDがありません");

        const itemStack = createItemStack(preset.basic);

        applyItemDetails(itemStack, preset.detail);

        const inventory = sourceEntity.getComponent("inventory");

        if (inventory) {
            handleItemPlacement(inventory.container, itemStack, preset.type, preset.detail, sourceEntity);
        }
        
    } catch (e) {
        sourceEntity.sendMessage("§cエラー: 入力データが正しくありません");
    }
});

/**
 * @param {import("./types").Basic} basic 
 * @returns {ItemStack}
 */
function createItemStack(basic) {
    const randomIndex = Math.floor(Math.random() * basic.amounts.length);
    const amount = basic.amounts[randomIndex];
    const itemStack = new ItemStack(basic.id, amount);

    if (basic.nameTag) itemStack.nameTag = basic.nameTag;
    if (basic.lore.length) itemStack.setLore(basic.lore);

    return itemStack;
}

/**
 * @param {ItemStack} itemStack 
 * @param {import("./types").Detail} detail 
 */
function applyItemDetails(itemStack, detail) {
    if (detail.canPlaceOn.length) itemStack.setCanPlaceOn(detail.canPlaceOn);
    if (detail.canDestory.length) itemStack.setCanDestroy(detail.canDestory);

    itemStack.keepOnDeath = detail.keepOnDeath;
    itemStack.lockMode = detail.lockMode;
}

/**
 * 
 * @param {Container} container 
 * @param {ItemStack} itemStack 
 * @param {"g:i" | "s:i"} type 
 * @param {import("./types").Detail} detail 
 * @param {Entity} sourceEntity 
 */
function handleItemPlacement(container, itemStack, type, detail, sourceEntity) {
    const dimension = sourceEntity.dimension;
    const location = sourceEntity.location;
    const dropItem = () => dimension.spawnItem(itemStack, location);

    switch (type) {
        case "g:i":
            if (container.emptySlotsCount > 0) {
                container.addItem(itemStack);
            } else if (detail.gi.drop) {
                dropItem();
            }
            break;
        case "s:i":
            if (container.getItem(detail.si.slot)) {
                if (detail.si.overwrite) {
                    container.setItem(detail.si.slot, itemStack);
                } else if (detail.si.drop) {
                    dropItem();
                }
            } else {
                container.setItem(detail.si.slot, itemStack);
            }
            break;
    }
}
