  ## ボードのレイアウト：実装方法
  - Butttonを用いて頑張る
    - Good:置く場所の判定簡単そう
    - Bad:レイアウトだるそう
  - Canvasを用いて頑張る
    - Good:クリックされた場所にコマを置くだけで、画面の更新が少なく、楽そう
    - Bad:クリックされた場所を特定することがめんどくさそう

## ゲーム内容（N目並べ）
- 基本機能
  - ユーザーの入力からボードのサイズや勝利条件を設定
  - 交差点にコマを置ける
  - 黒→白の順番にコマを置ける
  - N個並んでるか判定
  - 禁じ手の判定
    - これ、ボードのサイズによって変わってくるのでは？
- 追加機能
  - オンライン対戦
    - WebSocket?
  - CPU対戦
    - 原始モンテカルロ法？
      - ボードのサイズにかかわらず出来そう
    - 強化学習？

## やったこと
- 2022-10-21まで
  - Create/Join Roomの実装
  - Renderにデプロイ
    - よくわからんが、npmよりyarnの方が良さそう。
- 2022-10-11
  - https://www.youtube.com/watch?v=cXxEiWudIUY
  - webSocket_MultiPlaterGame_Tutorialってフォルダを作って、npm initした
- 2022-10-07
  - https://weseek.co.jp/tech/1484/
  - ```node src/index.js```
    - これでサーバーを起動する
    - 出来たこと
      - ブラウザで入力した文字をサーバー側で受け取る。
      - 
  - 
- 2022-10-04
  - https://weseek.co.jp/tech/1484/
  - package.json
    - ```json
      {
      "name": "simple_chat",
      "version": "1.0.0",
      "main": "index.js",
      "license": "MIT",
      "dependencies": {
      "express": "^4.17.1",
      "socket.io": "^4.3.1"
      }
      ```
- 
