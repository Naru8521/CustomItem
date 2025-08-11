import { CommandPermissionLevel, CustomCommandParamType, Player, system, type CustomCommandRegistry } from "@minecraft/server";
import { config } from "../configs/config";
import MenuForm from "../forms/MenuForm";

export default function loadCreateCommand(customCommandRegistry: CustomCommandRegistry): void {
    customCommandRegistry.registerCommand({
        name: `${config.commandPrefix}:create`,
        description: "新しいアイテムJSONを作成する",
        permissionLevel: CommandPermissionLevel.GameDirectors,
        mandatoryParameters: [],
        optionalParameters: [
            {
                type: CustomCommandParamType.String,
                name: "PresetName"
            }
        ]
        // @ts-ignore
    }, (origin, ...args) => {
        const { sourceEntity } = origin;

        if (sourceEntity instanceof Player) {
            const player = sourceEntity;

            system.run(() => {
                MenuForm(player);
            });
        }
    });
}