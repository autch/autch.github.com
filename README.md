# autch.github.com

https://www.autch.net/ （autch.github.io）のソース。[Hugo](https://gohugo.io/) で生成し、
GitHub Actions（`.github/workflows/hugo.yml`）でビルドして GitHub Pages にデプロイする。

## 構成

- `hugo.toml` — サイト設定
- `data/downloads.yaml` — ダウンロードページの内容（トップページに表示される）
- `content/posts/` — 日付付きの日記。ファイル名は Jekyll 流の `YYYY-MM-DD-title.md`。
  URL は `/:year/:month/:day/:title/` になる
- `content/articles/` — 日付に依存しない記事。URL は `/articles/:title/`
- `layouts/` — テンプレート（Hugo 0.146+ の新レイアウト構成）
- `assets/css/style.css` — セルフホストの素の CSS（フレームワーク・WebFont 不使用）
- `static/` — favicon、アバター画像、CNAME

## ローカルプレビュー

```
hugo server -D
```

`-D` はドラフト（`draft: true` の記事）も表示する。http://localhost:1313/ で確認できる。

## デプロイ

master ブランチへの push で GitHub Actions が走る。リポジトリの
Settings → Pages → Build and deployment → Source を **GitHub Actions** にしておくこと。
