import type { Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import type { ItemJSON } from "../types/itemJSON";
import MenuForm from "./MenuForm";

export default async function BasicForm(player: Player, json: ItemJSON): Promise<void> {
    const form = new UI.ModalFormData();

    form.title("基本設定");
    form.textField("アイテムID", "minecraft:stick", {
        defaultValue: json.id
    });
    form.textField("アイテム数", "1", {
        defaultValue: `${json.amounts.length > 0 ? json.amount : json.amounts.join(",")}`,
        tooltip: "「,」で区切ることで、ランダムなアイテム数を指定することもできます"
    });
    form.textField("アイテム名", "example", {
        defaultValue: json.nameTag
    });
    form.textField("アイテム説明", "a\\nb\\nc", {
        defaultValue: json.lore.join("\\n"),
        tooltip: "\\nで、改行を指定できます"
    });
    form.submitButton("設定");

    const { formValues, canceled } = await form.show(player);

    if (canceled) return await MenuForm(player, json);
    if (formValues) {
        json.id = formValues[0] as string;
        (formValues[1] as string).includes(",")
            ? json.amounts = (formValues[1] as string).split(",").map(v => Number(v))
            : json.amount = Number(formValues[1]);
        json.nameTag = formValues[2] as string;
        json.lore = (formValues[3] as string).split("\\n");
        return await MenuForm(player, json);
    }
}