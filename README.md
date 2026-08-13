# HTML Slide Studio

HTMLで作ったスライドを読み込み、デザインシステム・フォント・AI画像制作を組み合わせて編集し、編集可能なPowerPoint（.pptx）として書き出すブラウザアプリです。

## 使い方

1. `index.html` を開きます。
2. 「HTMLを読込」から `.html` ファイルを選ぶか、HTMLコードを貼り付けます。
3. 「デザイン制作」からStyle Library、Font Studio、AI Image Lab、品質確認を利用します。
4. NotebookLM Slide Style Library Offline Archive v6を使う場合は、「v6 / Style Packを読込」からZIPをそのまま選びます。画像160枚とYAMLはIndexedDBへ保存され、外部へ送信されません。
5. スライド上の文字・図形・画像をクリックして、右側の「書式」で編集します。
6. 「PowerPoint」を押し、高精度変換の完了後に「PowerPointをダウンロード」を押します。

スライドの区切りには、`[data-slide]`、`section.slide`、または `body` 直下の `section` / `.slide` を使用してください。基準サイズは 1280 × 720（16:9）です。

## GitHub Pagesで公開する

このフォルダ内のファイルとフォルダを、すべてリポジトリ直下へアップロードしてください。ZIPファイルそのものはアップロードしません。リポジトリ名の候補は `html-slide-studio` です。

GitHubの「Settings」→「Pages」で、公開元を `main` ブランチの `/ (root)` に設定すると公開できます。

## 対応範囲

- 12種類の独自デザインシステム、検索、お気に入り、My Styles保存
- 監査済みNotebookLM v6 ZIPのローカル統合（画像160）。アーカイブ監査表記はOriginal 155 / 復元5ですが、011のOriginal YAML本体が空のため、アプリでは実データ基準で検証済み154 / 復元・未検証6に安全側で再分類します。
- v6の見本画像、カテゴリ、検証状態、YAMLコピー、配色・書体・画像生成指示への変換
- v6データのIndexedDB保存と端末内削除（公開サイトへ素材データを送信・配布しない設計）
- JSON / YAML形式の外部Style Pack読込（正規の160 Style Packを後から追加可能）
- Style、Font、Layout、Image Promptを分離したテーマ設計
- 見出し・本文・英数字のフォントペア設定、要素単位のフォント変更
- TTF / OTF / WOFF / WOFF2フォントのセッション内読込
- Klee One、Yusei Magic、Caveat、Noto Sans JP、Noto Serif JPのWeb表示
- 現在のデザインと人物有無を反映したAI画像生成プロンプト作成・コピー
- 生成した画像の取込、差し替え、トリミング、代替テキスト
- 全ページの極小文字、重なり、はみ出し、外部画像、変換互換性チェック
- HTML、現在ページPNG、印刷PDF、編集可能PowerPointの書き出し
- 文字、基本図形、画像、SVG、表をPowerPoint要素へ変換
- グラデーション、影、角丸画像、Flexbox / Grid、リッチテキスト、疑似要素を高精度変換
- `data-pptx-notes` 属性をPowerPointの発表者ノートとして保持
- 位置、サイズ、文字サイズ、太さ、色、行間、揃え、背景、角丸、余白、不透明度を編集
- HTML保存、スライド一覧、レイヤー一覧、複製・削除、取り消し・やり直し、端末内自動保存
- 高精度エンジンが利用できない場合は、従来の互換エンジンへ自動切り替え
- PWA対応（GitHub Pages / NetlifyなどのHTTPS環境でホーム画面に追加可能）

3D変形、動画、音声、埋め込みWebページは、PowerPoint側の表現力に合わせて近似または省略されます。外部画像は配信元のCORS設定によって読み込めない場合があります。変換前に該当パターンを検出した場合は、書き出し画面に注意を表示します。

高精度変換には `dom-to-pptx 2.1.1`、互換変換には `PptxGenJS 4.0.1`、ZIPの端末内展開には `fflate 0.8.2` を同梱しています。ライセンスは `vendor/` 内の各LICENSEを参照してください。GitHub上で比較した候補と採用理由は `OSS-RESEARCH.md` にまとめています。

Google Fontsはオンライン時の表示用です。ローカルフォントを追加した場合は、その制作セッションと書き出したHTMLに反映されます。PowerPointを別のPCで開く際、同じフォントがない場合は置換されることがあります。

AI Image LabはAPIキーをアプリへ保存しません。生成指示文をコピーしてChatGPTなどで画像を生成し、完成画像をアプリへ戻す方式です。
