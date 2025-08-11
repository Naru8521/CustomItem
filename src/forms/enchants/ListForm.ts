import type { Player } from "@minecraft/server";
import type { ItemJSON } from "../../types/itemJSON";
import * as UI from "@minecraft/server-ui";
import MenuForm from "../MenuForm";

export default async function EnchantsListForm(player: Player, json: ItemJSON): Promise<void> {
    const form = new UI.ActionFormData();

    form.title("エンチャントリスト");
    form.button("追加");
    
    for (const enchant of json.enchants) {
        form.button(`${enchant.level} | ${enchant.id}`);
    }

    form.button("戻る");

    const { selection, canceled } = await form.show(player);

    if (canceled) return await MenuForm(player, json);
    if (selection === 0) return;
    if (selection === json.enchants.length + 1) return await MenuForm(player, json); 
}