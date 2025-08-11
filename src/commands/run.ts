import { CommandPermissionLevel, CustomCommandParamType, EntityComponentTypes, Player, system, type CustomCommandRegistry } from "@minecraft/server";
import { config } from "../configs/config";
import CustomItem from "../modules/CustomItem";
import { ItemJSONType } from "../types/stats.enum";

export default function loadRunCommand(customCommandRegistry: CustomCommandRegistry): void {
    customCommandRegistry.registerCommand({
        name: `${config.commandPrefix}:run`,
        description: "アイテムJSONから、アイテム付与を実行する",
        permissionLevel: CommandPermissionLevel.GameDirectors,
        mandatoryParameters: [
            {
                type: CustomCommandParamType.String,
                name: "ItemJSON"
            }
        ],
        optionalParameters: []
        // @ts-ignore
    }, (origin, ...args) => {
        const { sourceEntity } = origin;

        if (sourceEntity instanceof Player) {
            const player = sourceEntity;
            const itemJSON = CustomItem.getItemJSON(args[0]);

            if (itemJSON) {
                system.run(() => {
                    const itemStack = CustomItem.getItemStack(itemJSON);

                    if (itemStack) {
                        const inventory = player.getComponent(EntityComponentTypes.Inventory);
                        const container = inventory?.container;

                        if (itemJSON.type === ItemJSONType.GiveItem) {
                            container?.addItem(itemStack);
                        } else {
                            if (itemJSON.overwrite) {
                                container?.setItem(itemJSON.slot, itemStack);
                            } else {
                                // アイテムの存在を確認
                                const slotItem = container?.getItem(itemJSON.slot);
                            
                                if (!slotItem || slotItem.typeId === "minecraft:air") {
                                    container?.setItem(itemJSON.slot, itemStack);
                                }
                            }
                        }
                    }
                });
            }
        }
    });
}