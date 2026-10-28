やさしい脳活日和 個人版 v0.1.0　（2026-10-28）
===================================================
★このZIPは「フィジカル脳活4種目＋記録・転記機能」の動作版です。
★元の12ゲームは、この時点では格納されていません。別添の最新12ゲームZIPとの合体が必要です。
★脳活ゲームの中身は変えません。個人版から呼び出し、結果画面の表示時に履歴を受け取ります。

【すぐ試す】
index.html をブラウザで開く（スマートフォンならHTTPSのGitHub Pagesに公開して使うことを推奨）。
「フィジカル脳活」→種目→難易度→スタート。3秒の準備時間の後に計測が始まります。
記録は端末内（localStorage）に保存されます。履歴→JSONバックアップ推奨。

【元の12ゲームを組み込む】
1. 元の最新12ゲームZIPを手元に用意（例: noukatsu-github-test-12games-v1.6.6-start.zip）
2. このフォルダーでPowerShell/コマンドプロンプトを起動
3. 次を実行（WindowsにPython 3が必要）:
   py merge_personal.py "C:\path\to\noukatsu-github-test-12games-v1.6.6-start.zip"
4. 「Noukatsu-Personal-Ready.zip」が生成されます。
5. 自分用の新規GitHubリポジトリへ、生成されたZIPの中身をアップロード。
   公開用・販売用の既存リポジトリは上書きしないこと。
6. 元ゲームの見た目・操作は維持されます。元の結果画面の呼び出しにのみ記録ブリッジを追加します。

【Google スプレッドシート自動転記：初回設定】
1. 新しいGoogleスプレッドシートを作成。
2. メニュー「拡張機能」→「Apps Script」→ Code.gs の中身を gas/Code.gs に入れ替えて保存。
3. Apps Script内で setupOnce 関数を選び「実行」。Googleの認可手順を終える。
4. 「実行ログ」に表示される SYNC_TOKEN を控える。公開リポジトリや他人には送らない。
5. 「デプロイ」→「新しいデプロイ」→「ウェブアプリ」。実行ユーザーは「自分」、
   アクセスできるユーザーは「全員」。得られた /exec で終わるURLを控える。
6. 個人版アプリの「設定」でGAS URLとSYNC_TOKENを入力して「連携設定を保存」。
7. 「未確認の記録を転記・照合」を押す。成功すると「シート保存確認済み」と表示。
8. 以後は記録を保存すると自動で送信、未確認のデータは次回のアクセス・手動同期で再送信。
※初期コードはGoogleアカウントに自動でシートやGASを作った状態ではありません。
※スマホや別PCは別の端末内履歴です。同じGAS接続情報で送信できるが、
  シートから端末への履歴復元は実装していないのでJSONバックアップを併用する。
※GASを修正したら通常はウェブアプリの新しいバージョンを再デプロイする。

【科学的な根拠と注意】
・片足立ちの年代別値：Springer et al. 2007 / RehabMeasures Database
  https://www.sralab.org/rehabilitation-measures/single-leg-stance-or-one-legged-stance-test
・椅子立ち上がり 30秒：CDC STEADI
  https://www.cdc.gov/steadi/hcp/clinical-resources/index.html
・２分間足踏み：Senior Fitness Test / RehabMeasures Database
  https://www.sralab.org/rehabilitation-measures/2-minute-step-test
・二重課題トレーニング：2024年メタ解析
  https://pubmed.ncbi.nlm.nih.gov/38703695/
・運動の認知機能への効果（2025年アンブレラレビュー）
  https://doi.org/10.1136/BJSPORTS-2024-108589
このアプリは医学的な診断・脳年齢判定ではありません。運動レベルを混在させて「年齢」を推定しません。
補助ありの初心者、閉眼の上級者は標準検査の得点と直接比較できません。
閉眼片足立ちは介助者が同席し、転倒しそうになったら中止してください。
腰痛・平衡障害がある方は医療者に実施可否を確認してください。

【データ・セキュリティ】
ブラウザ上に保存する同期トークンを他人と共有しない。プライベート用の端末・GASを使用。
公開GitHub Pagesに同期トークンをコードとして書き込まない。設定画面から入力する。
自動送信は転記の有無をID照合したときだけ「確認済み」と表示。
GASのURL公開のみでは書込不可。SYNC_TOKEN不一致は書込み拒否。

【中身】
index.html / style.css / app.js : 個人版の新UI、ストップウォッチ、履歴、クラウド転記
bridge.js : 元12ゲームが終了した際に個人版の履歴へ送るブリッジ
merge_personal.py : 元ZIPから既存12ゲームをそのまま統合する生成ツール
 gas/Code.gs : Googleスプレッドシートの受信、重複防止、保存確認
