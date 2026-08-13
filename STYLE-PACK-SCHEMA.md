# Style Pack形式

HTML Slide Studio 2.0は、JSONまたはYAMLのStyle Packを読み込めます。

## JSON例

```json
{
  "styles": [
    {
      "id": "school-blue",
      "name": "School Blue",
      "category": "Education",
      "description": "学校説明会向けの青いスタイル",
      "palette": {
        "background": "#f7f8fa",
        "primary": "#1f2937",
        "accent": "#2563eb",
        "text": "#1f2937",
        "muted": "#64748b"
      },
      "headingFont": "Yusei Magic",
      "bodyFont": "Klee One",
      "latinFont": "Caveat",
      "radius": 8,
      "shadow": "minimal",
      "spacing": "generous",
      "imageStyle": {
        "mood": "warm and polished educational editorial",
        "composition": "simple with generous negative space",
        "illustration": "flat hand-drawn geometry",
        "avoid": "people, glossy 3D, logos, text in image"
      }
    }
  ]
}
```

## YAML例

```yaml
id: school-blue
name: School Blue
category: Education
description: 学校説明会向けの青いスタイル
palette:
  background: "#f7f8fa"
  primary: "#1f2937"
  accent: "#2563eb"
  text: "#1f2937"
  muted: "#64748b"
headingFont: Yusei Magic
bodyFont: Klee One
latinFont: Caveat
radius: 8
shadow: minimal
spacing: generous
imageStyle:
  mood: warm and polished educational editorial
  composition: simple with generous negative space
  illustration: flat hand-drawn geometry
  avoid: people, glossy 3D, logos, text in image
```

元のYAMLが色名や抽象表現を使う場合は、Theme JSONへ変換する段階でHEX色・フォント名・余白・画像スタイルへ正規化してください。作者のOriginal YAMLや見本画像を一般公開版へ同梱する場合は、配布条件と権利を確認してください。
