# CustomItem

![GitHub Downloads (all assets, all releases)](https://img.shields.io/github/downloads/Naru8521/CustomItem/total) ![GitHub Downloads (all assets, latest release)](https://img.shields.io/github/downloads/Naru8521/CustomItem/latest/total?color=green) ![GitHub Release](https://img.shields.io/github/v/release/Naru8521/CustomItem)

カスタムしたアイテムを作成します

アドオンのダウンロードは[コチラ](https://github.com/Naru8521/CustomItem/releases)

クラフターズコロニーは[コチラ](https://minecraft-mcworld.com/92101/)

# 使い方
動画での説明は [コチラ](https://youtu.be/__Nij10h9Hc?si=u-3uNhvPsjAtBKgK)

まずは、アドオンをワールドにインポートしてください。

``/tag @s add op``を実行し、権限タグを付けます。

``ci create``を実行し、チャット欄を閉じると、作成用のフォームが表示されます

![作成フォーム](https://github.com/user-attachments/assets/9edd22b6-e807-40ef-9357-6a90107aae48)

| タイプ  | 説明 |
| ------------- | ------------- |
| gi  | アイテムを与えます |
| si | アイテムを指定されたスロットにセットします |

| 基本設定 | 説明 |
| ------------- | ------------- |
| アイテムID* | minecraft:appleなど、アイテムIDを設定します (識別IDあり) |
| アイテム名 | アイテム名を設定します |
| アイテムロア | アイテム説明を設定します (,で区切ることで、改行ができます) |
| アイテム数 | アイテム数を設定します |
| アイテム数 (ランダム) | ランダムにするアイテム数を設定します (,で区切ることで複数設定可能) |

| 詳細設定 | 説明 |
| ------------- | ------------- |
| 設置可能ブロックIDs | minecraft:stoneなど、アイテムIDを設定します (,で区切ることで複数設定可能) |
| 破壊可能ブロックIDs | minecraft:stoneなど、アイテムIDを設定します (,で区切ることで複数設定可能) |
| 死亡時にキープ | 死亡時にキープするようにします |
| ロックモード | アイテムのロックモードを設定 |
| セットスロット | セットするスロット (タイプがsiの時のみ使用できます) |
| 上書き | 既にアイテムがある時、上書きする (タイプがsiの時のみ使用できます) |

コマンド生成を押すことで、生成されたコマンドが表示されます

コピーして、使用することができます (execute as @a at @s run <コマンド> でも使用可能)

# コマンド一覧
| コマンド  | 説明 |
| ------------- | ------------- |
| ci create | コマンドを作成します |
| ci edit <command> | コマンドを編集します |
