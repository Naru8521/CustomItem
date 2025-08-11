import { ItemStack, system, world } from "@minecraft/server";
import loadCreateCommand from "./commands/create";
import loadRunCommand from "./commands/run";
import loadEditCommand from "./commands/edit";

system.run(() => {
    loadCreateCommand();
    loadRunCommand();
    loadEditCommand();
});