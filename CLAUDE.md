@AGENTS.md

---

# THE FOMUS — プロジェクトルール & スキル

## ブランド定義
- **FOMUS** = FOMUSブランド全体（運営母体）
- **THE FOMUS** = FOMUSの中核ブランド。コーポレートギフト・展示品・空間演出の体験設計
- ターゲット：法人・ホテル・ラグジュアリー施設
- 品格レベル：ザ・プリンスホテル相当

---

## コピーの絶対NG（Masuoが過去に却下済み）

1. **否定文** — 「〜ではありません」「〜ない」型の表現。常に肯定・宣言で書く
2. **詩的表現・文学的断片** — **絶対禁止**。体言止め（「〜ものを。」「〜前だ。」）、哲学的断片（「空間は、何も言わずに語る。」）、余韻を狙った短文、全て排除。**全ての文は主語＋述語の完結した文章で書く**
3. **番号付きリスト** — 01/02/03 プレフィックス不使用
4. **For Whom セクション** — 「このプログラムをお選びの方」は廃止
5. **曖昧マーケティング語** — 「〜だからこそできる仕事があります」「そういう仕事です」等
6. **価格表示** — ページ上のどこにも¥・金額を表示しない（meta.titleも含む）
7. **「フラッグシップライン」** — 伝わりにくいのでNG

## コピーのルール

- **デスマス統一** — ボディコピーは全て敬体（です・ます）で統一。詩的な意図なき体言止め禁止
- **主語はクライアント** — クライアントの体験・成果を中心に書く
- **具体性** — 「高品質」「一流」等の形容詞より、何が起きるかを具体的に
- CTAの問いかけ文は**直接的な宣言文**（「〜を設計します。」「〜をつくります。」）

---

## デザインの絶対ルール

### CTA
- ボーダー付きボタン **禁止**
- 正解：Cormorant Garamond イタリック体のアンダーラインリンク
```css
.cta-link {
  font-family: var(--font-cormorant), "Cormorant Garamond", serif;
  font-style: italic;
  font-size: clamp(1.375rem, 2.2vw, 1.75rem);
  color: var(--color-ink);
  text-decoration: none;
  padding-bottom: 0.25rem;
  border-bottom: 1px solid var(--color-ink);
}
```

### フォント階層
| 用途 | フォント |
|---|---|
| 見出し・ディスプレイ | Cormorant Garamond（イタリック, weight 400） |
| ボディコピー | Noto Serif JP（weight 300） |
| ラベル・アイブロウ | Jost（weight 400, uppercase, letter-spacing 0.28em+） |

### カラー
```
var(--color-ink)       メインテキスト
var(--color-ink-mute)  サブテキスト・セクションラベル
var(--color-accent)    アクセント（多用禁止）
var(--color-line)      ボーダー・区切り
var(--color-white)     背景
```

### セクションラベル
- `var(--color-ink-mute)` を使う。`var(--color-accent)` は多用禁止

### ページ個性
- 各サブページは**それぞれ異なるデザイン**でなければならない。均一なテンプレ禁止
- CSSクラスのプレフィックス：`cg-`（CorporateGift）`cs-`（CulturalSpace）`hb-`（HotelBranding）`be-`（Bespoke）`sm-`（SakeMasu）`cp-`（Craft）`sp-`（Sustainability）`fp-`（Founder）`co-`（Company）

---

## 技術ルール

### ミドルウェア
- このプロジェクトは `proxy.ts` がミドルウェア。`middleware.ts` は**絶対に作らない**（競合してビルドエラー）
- `localeDetection: false` を必ず維持する（ブラウザ言語で英語に飛ばないように）

### ロケール
- 日本語 = `/`（デフォルト、プレフィックスなし）
- 英語 = `/en/`
- `localePrefix: 'as-needed'`

### JSONファイル編集
- `messages/ja.json` と `messages/en.json` は大きいため **Edit ツール禁止**
- 必ず Python3 で編集する：
```bash
python3 - <<'EOF'
import json
with open('messages/ja.json', 'r') as f: d = json.load(f)
# 変更
with open('messages/ja.json', 'w') as f: json.dump(d, f, ensure_ascii=False, indent=2)
EOF
```

### ビルド・デプロイ
```bash
npm run build          # 必ず確認
git add -A
git commit -m "メッセージ\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
git push origin main
npx vercel --prod --yes
```

---

## ページ構成

| ページ | ファイル | 備考 |
|---|---|---|
| トップ | `app/[locale]/page.tsx` | Hero → Statement → ProgramsGrid → MasuGrid → LegacyGrid → AboutGrid |
| コーポレートギフト | `ProgramPageClient.tsx`（早期return `cg-`） | ジプティックレイアウト |
| 文化空間 | `ProgramPageClient.tsx`（`cs-`） | ダーク背景 |
| ホテルブランディング | `ProgramPageClient.tsx`（`hb-`） | 右寄せヒーロー |
| ビスポーク | `ProgramPageClient.tsx`（早期return `be-`） | 超ミニマル。年間3件限定表示 |
| 酒×枡 | `ProgramPageClient.tsx`（早期return `sm-`） | 儀式的・センタリング |
| クラフト | `app/[locale]/craft/CraftPageClient.tsx` | |
| サステナビリティ | `app/[locale]/sustainability/SustainabilityPageClient.tsx` | |
| ファウンダー | `app/[locale]/founder/FounderPageClient.tsx` | |
| カンパニー | `app/[locale]/company/CompanyPageClient.tsx` | |

---

## エージェント組織とワークフロー

### 起動方法
エージェントは必ず `mode: "bypassPermissions"` で起動する。権限待ちで止まらないように。

### 組織構造
```
Masuo（人間） ── ビジョン・最終確認のみ
  └── fomus-ceo     ── 経営判断・品質チェック・チーム指示
        ├── fomus-creative  ── コピー・トーン・ビジュアル表現
        ├── fomus-dev       ── Next.js実装・バグ修正・CSS
        ├── fomus-bd        ── 法人営業・提案書
        ├── fomus-marketing ── SEO・コンテンツ・SNS
        └── fomus-product   ── 製品仕様・職人連携
```

### ワークフロー
```
Masuo の指示
  → 必要なエージェントを起動
  → CEOが品質チェック（このCLAUDE.mdのNGリストを全項目確認）
  → ビルド・コミット・デプロイまで完遂
  → CEOがOK出したらMasuoに報告
  → Masuoが最終確認（これが唯一の確認機会）
```

### エージェント共通ルール
- **Masuoへの途中確認は禁止**。最後の一回だけ報告する
- ビルドエラーは自力で修正してからデプロイする
- このCLAUDE.mdの**NG項目リストを必ず読んでから**作業開始
- コピー変更は必ずja.jsonとen.jsonの両方に反映
- JSONはPython3で編集（Editツール禁止）

### CEOのチェックリスト（デプロイ前に必ず確認）
- [ ] 否定文がないか
- [ ] 詩的表現・体言止めがないか
- [ ] 価格（¥）がページ上に表示されていないか
- [ ] ボーダー付きボタンがないか（CTAはイタリックリンクのみ）
- [ ] For Whomセクションが表示されていないか
- [ ] 各ページのデザインが個別に異なるか
- [ ] デスマスが統一されているか
- [ ] ビルドが通るか（`npm run build`）

---

## 画像ファイル一覧（`/public/images/`）

| ファイル | 用途 |
|---|---|
| `masu-top.jpg` | 枡・メイン |
| `masu-lug-crop.jpg` | 枡・クロップ |
| `masukame.jpg` | 枡亀 |
| `material-philosophy.jpg` | 素材・哲学 |
| `founder.png` | 代表 |
| `cultural-space-hero.jpg` | 文化空間ヒーロー |
| `sagishima-interior.png` | 鷺島インテリア |
| `sagishima-wall.png` | 鷺島壁 |
| `sagishima-frame.png` | 鷺島フレーム |
| `parure.jpg` | パルール |
| `architectural.jpg` | 建築 |
| `fomus-architectural.jpg` | FOMUS建築 |
