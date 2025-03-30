import { config } from "../config";
import MenuForm from "../forms/MenuForm";
import commandManager from "../modules/CommandManager";

export default function loadCreateCommand() {
    const createCommand = commandManager.register({
        prefixes: config.command.prefixes,
        ids: config.command.ids,
        name: "create",
        description: "アイテムを作成する"
    });

    console.log("load create command.");

    createCommand.onCommand(async (args, player) => {
        await MenuForm(player);
    });

    createCommand.onScriptCommand(async (args, initiator, sourceEntity, sourceBlock) => {
        if (sourceEntity instanceof Player) {
            await MenuForm(player);
        }
    });

    createCommand.onCommandError((player, initiator, entity, block, errorType, message, extra) => {
        console.error(message);
    });
}