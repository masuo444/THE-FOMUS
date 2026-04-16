# FOMUS サイト 現状まとめ

最終確認日: 2026-04-14

## 全体ステータス

サイトの**骨組み（枠組み・コンポーネント・ルーティング）は構築済み**。
ただし、**コンテンツの流し込みと一部ページの実装が未完了**の段階。

---

## 技術スタック

- **フレームワーク**: Next.js（`app` ルーター採用、`[locale]` ダイナミックセグメントで多言語対応）
- **言語対応**: 日本語 / 英語（next-intl 想定、`i18n/` と `messages/` 配置済み）
- **スタイリング**: Tailwind / PostCSS 構成（`postcss.config.mjs` あり）
- **TypeScript**: 導入済み（`tsconfig.json`）
- **Lint**: ESLint（`eslint.config.mjs`）
- **外部連携想定**: Notion API、Contact API（`app/api/notion`, `app/api/contact`）

> ⚠️ プロジェクトの `AGENTS.md` に「通常の Next.js とは破壊的変更あり。コード書く前に `node_modules/next/dist/docs/` を読むこと」との記載あり。バージョン依存の挙動に注意。

---

## ディレクトリ構成（抜粋）

```
the-fomus/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   ├── page.tsx              ← トップ
│   │   ├── philosophy/           （空：page.tsx 未作成）
│   │   ├── programs/
│   │   │   └── [slug]/           ← 動的ルート
│   │   ├── founder/              （空：page.tsx 未作成）
│   │   └── contact/
│   │       └── page.tsx
│   ├── api/
│   │   ├── contact/route.ts      ← 問い合わせ送信
│   │   └── notion/               （空：route.ts 未作成）
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Statement.tsx
│   │   ├── PhilosophyFragment.tsx
│   │   ├── ProgramsGrid.tsx
│   │   ├── FounderFragment.tsx
│   │   └── ContactCTA.tsx
│   └── ui/
│       └── ContactForm.tsx
├── content/
│   ├── ja/                       （空）
│   └── en/                       （空）
├── messages/
│   ├── ja.json
│   └── en.json
├── i18n/
│   ├── request.ts
│   └── routing.ts
├── lib/
├── public/
├── proxy.ts
├── next.config.ts
└── package.json
```

---

## 実装できている部分

- ルーティング：`[locale]` ベースの多言語 URL 構造
- トップページ（`app/[locale]/page.tsx`）
- コンタクトページ + 問い合わせ API（`app/api/contact/route.ts`）
- プログラム詳細ページの動的ルート（`programs/[slug]`）
- 共通レイアウト（Header / Footer）
- セクションコンポーネント一式（Hero, Statement, PhilosophyFragment, ProgramsGrid, FounderFragment, ContactCTA）
- お問い合わせフォーム UI（`ContactForm.tsx`）
- 多言語メッセージファイル（`messages/ja.json`, `messages/en.json`）

---

## 未完了・要対応の部分

| 箇所 | 状態 | 対応内容 |
|------|------|----------|
| `app/[locale]/philosophy/` | 空 | `page.tsx` を作成し Philosophy ページを実装 |
| `app/[locale]/founder/` | 空 | `page.tsx` を作成し Founder ページを実装 |
| `app/api/notion/` | 空 | `route.ts`（Notion 連携）を実装 |
| `content/ja/` | 空 | 日本語コンテンツ（MDX / JSON 等）を投入 |
| `content/en/` | 空 | 英語コンテンツを投入 |
| `README.md` | デフォルトのまま | FOMUS 用に書き換え |
| 動作確認 | 未実施 | `npm run dev` で起動確認が必要 |

---

## 次アクションの候補

1. **ローカル起動して現状を目視確認**（`npm run dev`）
2. **未実装ページの作成**（philosophy / founder / Notion API）
3. **コンテンツ流し込み**（`content/ja`, `content/en` の整備）
4. **README / ドキュメント整備**
5. **デプロイ準備**（Vercel 等）

---

## 参考資料（ワークスペース内）

- `AGENTS.md` / `CLAUDE.md` — プロジェクト運用ルール
- `TheFOMUS_BusinessModel_v3.docx` — ビジネスモデル資料
