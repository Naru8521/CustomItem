import { CommandPermissionLevel, CustomCommandParamType, Player, system, type CustomCommandRegistry } from "@minecraft/server";
import { config } from "../configs/config";
import MenuForm from "../forms/MenuForm";

export default function loadEditCommand(customCommandRegistry: CustomCommandRegistry): void {
    customCommandRegistry.registerCommand({
        name: `${config.commandPrefix}:edit`,
        description: "アイテムJSONを編集する",
        permissionLevel: CommandPermissionLevel.GameDirectors,
        mandatoryParameters: [],
        optionalParameters: [
            {
                type: CustomCommandParamType.String,
                name: "ItemJSON"
            }
        ]
        // @ts-ignore
    }, (origin, ...args) => {
        const { sourceEntity } = origin;

        if (sourceEntity instanceof Player) {
            const player = sourceEntity;

            system.run(() => {
                MenuForm(player, args[0]);
            });
        }
    });
}