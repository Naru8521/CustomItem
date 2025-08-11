import type { Player } from "@minecraft/server";
import type { ItemJSON } from "../types/itemJSON";
import * as UI from "@minecraft/server-ui";
import CustomItem from "../modules/CustomItem";
import MenuForm from "./MenuForm";

export default async function GenCommandForm(player: Player, json: ItemJSON): Promise<void> {
    const form = new UI.ModalFormData();

    form.title("コマンド生成");
    form.textField("コマンド", "", {
        defaultValue: CustomItem.genCommand(json)
    });
    form.submitButton("戻る");

    const { formValues, canceled } = await form.show(player);

    if (canceled) return await MenuForm(player, json);
    if (formValues) return await MenuForm(player, json);
}