import { Player, system } from "@minecraft/server";
import { config } from "../config";
import MenuForm from "../forms/MenuForm";
import commandManager from "../modules/CommandManager";
import CustomItem from "../modules/CustomItem";

export default function loadEditCommand() {
    const editCommand = commandManager.register({
        prefixes: config.command.prefixes,
        ids: config.command.ids,
        name: "edit",
        description: "アイテムを編集する",
        optionalArgs: [
            {
                name: "command",
                type: "string"
            }
        ]
    });

    console.log("load edit command.");

    editCommand.onCommand((args, player) => {
        const command = args.command;
        const selectedItemStack = player.getComponent("inventory").container.getItem(player.selectedSlotIndex);

        system.run(async () => {
            const itemConfig = command
                ? CustomItem.getItemConfigByObjstr(command)
                : CustomItem.getItemConfigByItemStack(selectedItemStack)

            if (itemConfig) {
                const preset = {
                    isEdit: true,
                    itemConfig
                };

                await MenuForm(player, preset);
            }
        });
    });

    editCommand.onScriptCommand((args, initiator, sourceEntity, sourceBlock) => {
        if (sourceEntity instanceof Player) {
            const command = args.command;
            const selectedItemStack = sourceEntity.getComponent("inventory").container.getItem(sourceEntity.selectedSlotIndex);

            system.run(async () => {
                const itemConfig = command
                    ? CustomItem.getItemConfigByObjstr(command)
                    : CustomItem.getItemConfigByItemStack(selectedItemStack)

                if (itemConfig) {
                    const preset = {
                        isEdit: true,
                        itemConfig
                    };

                    await MenuForm(sourceEntity, preset);
                }
            });
        }
    });

    editCommand.onCommandError((player, initiator, entity, block, errorType, message, extra) => {
        console.error(message);
    });
}