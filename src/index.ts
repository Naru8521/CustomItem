import { system } from "@minecraft/server";
import loadCreateCommand from "./commands/create";
import loadEditCommand from "./commands/edit";
import loadRunCommand from "./commands/run";

system.beforeEvents.startup.subscribe(ev => {
    const { customCommandRegistry } = ev;

    loadCreateCommand(customCommandRegistry);
    loadEditCommand(customCommandRegistry);
    loadRunCommand(customCommandRegistry);
});