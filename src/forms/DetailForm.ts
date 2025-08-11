import { ItemLockMode, type Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import type { ItemJSON } from "../types/itemJSON";
import { ItemJSONType } from "../types/stats.enum";
import MenuForm from "./MenuForm";

export default async function DetailForm(player: Player, json: ItemJSON): Promise<void> {
    const form = new UI.ModalFormData();

    form.title("詳細設定");
    form.textField("設置可能ブロック", "minecraft:stone,minecraft:grass", {
        defaultValue: json.canPlaceOn.join(",")
    });
    form.textField("破壊可能ブロック", "minecraft:stone,minecraft:grass", {
        defaultValue: json.canDestroy.join(",")
    });
    form.dropdown("ロックモード", Object.keys(ItemLockMode), {
        defaultValueIndex: Object.keys(ItemLockMode).findIndex(v => v === json.lockMode)
    });
    form.toggle("死亡時キープ", {
        defaultValue: json.keepOnDeath
    });

    if (json.type === ItemJSONType.SetItem) {
        form.textField("セットスロット", "0", {
            defaultValue: `${json.slot}`
        });
        form.toggle("上書き", {
            defaultValue: json.overwrite
        });
    }

    const { formValues, canceled } = await form.show(player);

    if (canceled) return await MenuForm(player, json);
    if (formValues) {
        json.canPlaceOn = (formValues[0] as string).split(",");
        json.canDestroy = (formValues[1] as string).split(",");
        json.lockMode = Object.keys(ItemLockMode)[(formValues[2] as number)] as ItemLockMode;
        json.keepOnDeath = formValues[3] as boolean;
        
        if (json.type === ItemJSONType.SetItem) {
            json.slot = formValues[4] as number;
            json.overwrite = formValues[5] as boolean;
        }
        
        return await MenuForm(player, json);
    }
}