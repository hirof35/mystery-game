# 🕵️‍♂️ 大富豪殺人事件 - Web Mystery Game

TypeScriptで開発された、ブラウザで遊べるテキストベースの本格推理シミュレーションゲームです。
限られた行動回数（AP）の中で、現場の証拠を集め、容疑者の嘘を暴き、真犯人を特定してください。
<img width="1907" height="1028" alt="スクリーンショット 2026-06-03 070020" src="https://github.com/user-attachments/assets/4dc88486-4c2f-44de-9fa8-4d61b05bf414" />

---

## 🎮 ゲーム概要

富豪の館で凄惨な殺人事件が発生した。
プレイヤーであるあなたの任務は、現場に残されたわずかな手がかりを元に犯人を特定すること。
ただし、夜が明けて警察が到着するまでの時間は限られている……。

### 主なゲームシステム
- **AP（アクションポイント）制限**: 調査や尋問を行うたびにAPが減少します。0になるとタイムオーバー（捜査失敗）になります。
- **リソース管理（コーヒーの発見）**: 現場のどこかにAPを回復させ、最大値を増やす隠しアイテム「コーヒー」が眠っています。
- **メンタルトラップ（威圧的な容疑者）**: 容疑者の中には、高圧的な態度でプレイヤーの精神を削り、**通常よりも多くAPを消費させる危険人物**が潜んでいます。

---

## 🛠️ 技術スタック

- **Language**: TypeScript
- **Bundler / Build Tool**: Vite
- **UI / Styling**: HTML5 / CSS3 (Vanilla JS DOM manipulation)
- **Deployment**: GitHub Pages

---

## 🚀 ローカルでの実行方法

手元でゲームを起動し、開発・プレイするための手順です。

### 1. リポジトリのクローン
```bash
git clone [https://github.com/あなたのユーザー名/mystery-game.git](https://github.com/あなたのユーザー名/mystery-game.git)
cd mystery-game
2. 依存関係のインストール
Bash
npm install
3. 開発サーバーの起動
Bash
npm run dev
ターミナルに表示される http://localhost:5173/ などのURLにブラウザでアクセスしてください。

📦 デプロイ（GitHub Pagesへの公開方法）
本リポジトリは gh-pages を使って簡単にWebへ公開できるようスクリプトが組まれています。

vite.config.ts の base パスが、あなたのリポジトリ名と一致しているか確認します。

以下のコマンドを実行してビルド＆デプロイを行います。

Bash
npm run deploy
数分後、 https://あなたのユーザー名.github.io/mystery-game/ にてゲームが公開されます。

📝 ライセンス
MIT License

Developed with ❤️ using TypeScript.
