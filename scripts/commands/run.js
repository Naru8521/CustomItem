import { Block, Entity, EntityComponentTypes } from "@minecraft/server";
import { config } from "../config";
import commandManager from "../modules/CommandManager";
import CustomItem from "../modules/CustomItem";

export default function loadRunCommand() {
    const runCommand = commandManager.register({
        ids: config.command.ids,
        name: "run",
        description: "アイテムを与える",
        args: [
            {
                name: "command",
                type: "string"
            }
        ]
    });

    console.log("load run command.");

    runCommand.onCommand((args, player) => {
        const command = args.command;

        set(command, undefined, player, undefined);
    });

    runCommand.onScriptCommand((args, initiator, sourceEntity, sourceBlock) => {
        const command = args.command;

        set(command, initiator, sourceEntity, sourceBlock);
    });

    runCommand.onCommandError((player, initiator, entity, block, errorType, message, extra) => {
        console.error(message);
    });
}

/**
 * @param {string} command 
 * @param {Entity} initiator 
 * @param {Entity} sourceEntity 
 * @param {Block} sourceBlock 
 */
function set(command, initiator, sourceEntity, sourceBlock) {
    const itemConfig = CustomItem.getItemConfigByObjstr(command);

    if (itemConfig) {
        const itemStack = CustomItem.getItemStack(itemConfig);

        if (itemStack) {
            let container;

            if (initiator) container = initiator?.getComponent("inventory")?.container;
            if (sourceEntity) container = sourceEntity?.getComponent("inventory")?.container;
            if (sourceBlock) container = sourceBlock?.getComponent("inventory")?.container;
            if (!container) return;
            if (itemConfig.type === "gi") {
                container.addItem(itemStack);
            } else {
                const slotItem = container.getItem(itemConfig.slot);

                if (!itemConfig.overwrite && slotItem) return;

                container.setItem(itemConfig.slot, itemStack);
            }
        }
    }
}