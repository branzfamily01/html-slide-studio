# OSS調査記録

調査日: 2026-08-13

## 目的

HTML Slide Studioの「HTMLの見た目を保ちながら、PowerPoint上で編集できる」変換精度を高めるため、GitHub上の類似OSSを比較しました。ライセンス、ブラウザ内実行、編集可能性、対応CSS、導入コスト、保守性を判断軸にしています。

## 比較結果

| 候補 | ライセンス | 強み | 判断 |
|---|---|---|---|
| [dom-to-pptx](https://github.com/atharva9167j/dom-to-pptx) | MIT | computed styleと座標を読み、グラデーション、影、角丸画像、Flex/Grid、リッチテキスト、SVG、発表者ノートをPowerPointへ変換。ブラウザ用bundleとBlob APIあり | 高精度変換エンジンとして統合 |
| [PptxGenJS](https://github.com/gitbrent/PptxGenJS) | MIT | 成熟したOOXML生成、主要オフィス製品との互換性、ブラウザ対応 | 互換エンジンとして維持 |
| [html-to-editable-pptx](https://github.com/Hasasasa/html-to-editable-pptx) | MIT | Vector-first、複雑装飾だけを画像化、変換前検査、変換後の視覚監査という堅牢な設計 | 設計思想を採用。Python・Playwright前提のためブラウザアプリ本体へは未導入 |
| [Moveable](https://github.com/daybrush/moveable) | MIT | ドラッグ、リサイズ、回転、スナップ、グループ操作 | iframe編集面への導入コストが大きいため保留。現行操作で不足が顕在化した時に再評価 |
| [html2pptxgenjs](https://github.com/it-beyondit/html2pptxgenjs) | MIT | HTMLのインライン書式をPptxGenJSのrich textへ変換 | テキスト中心で、スライド全体のレイアウト変換には不足するため未採用 |

## 統合した設計

- 通常は `dom-to-pptx` で高精度変換し、失敗時のみ既存のPptxGenJS変換へ自動で切り替える二段構成
- 3D変形、動画・音声・埋め込み要素、CORS制約のある外部画像を変換前に検出して注意を表示
- HTML読込時にscript、iframe、イベント属性、`javascript:` URLを除去し、高精度変換用の実行環境へ危険なコードを持ち込まない
- 外部CDNに依存せず、必要なbundleを同梱してGitHub PagesとPWAで利用可能にする

## 既知の境界

PowerPointのOOXMLとWebブラウザのCSSは表現能力が異なるため、完全な1:1再現は保証できません。3D変形、複雑なフィルター、動画・音声、外部Web埋め込みは近似または省略されます。編集性を優先し、文字・基本図形・SVGを可能な限りネイティブ要素として保持します。
