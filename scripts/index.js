import { system, world } from "@minecraft/server";
import CommandHandler from "./libs/commandHandler";
import { commands, commandSetting, commandsPath } from "./config";

// コマンドハンドラーを初期化
const commandHandler = new CommandHandler(commandsPath, commandSetting, commands);

world.beforeEvents.chatSend.subscribe(ev => {
    // コマンドをチェック
    commandHandler.handleCommand(ev);
});

system.afterEvents.scriptEventReceive.subscribe(ev => {
    // コマンドをチェック
    commandHandler.handleCommand(ev);
});