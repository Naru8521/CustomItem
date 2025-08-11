import type { Player } from "@minecraft/server";
import type { ItemJSON } from "../types/itemJSON";
import * as UI from "@minecraft/server-ui";
import { ItemJSONType } from "../types/stats.enum";
import MenuForm from "./MenuForm";

export default async function EditTypeForm(player: Player, json: ItemJSON): Promise<void> {
    const form = new UI.ModalFormData();

    form.title("付与タイプ変更");
    form.dropdown("付与タイプ", Object.keys(ItemJSONType), {
        defaultValueIndex: Object.keys(ItemJSONType).findIndex(v => v === json.type)
    });
    form.submitButton("変更");

    const { formValues, canceled } = await form.show(player);

    if (canceled) return await MenuForm(player, json);
    if (formValues) {
        json.type = Object.keys(ItemJSONType)[formValues[0] as number] as ItemJSONType;
        return await MenuForm(player, json);
    }
}