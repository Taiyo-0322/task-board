# task-board

## プロジェクト概要

タスク管理ボードアプリケーション。

## リポジトリ情報

- **GitHub URL**: https://github.com/Taiyo-0322/task-board.git
- **メールアドレス**: sol0322@au.com

## Git 運用ルール

**コードを変更するたびに、必ずGitHubにプッシュすること。**

具体的な手順:

1. 変更をステージングする
   ```
   git add <変更ファイル>
   ```
2. コミットメッセージをつけてコミットする
   ```
   git commit -m "変更内容の説明"
   ```
3. GitHubにプッシュする
   ```
   git push origin <ブランチ名>
   ```

リモートリポジトリの設定（初回のみ）:
   ```
   git remote add origin https://github.com/Taiyo-0322/task-board.git
   ```

### コミットメッセージの規則

- `feat:` 新機能の追加
- `fix:` バグ修正
- `refactor:` リファクタリング
- `docs:` ドキュメントの変更
- `style:` コードスタイルの修正（動作に影響しない変更）
- `test:` テストの追加・修正
- `chore:` ビルドや設定ファイルの変更

例: `feat: タスクの追加機能を実装`

### ブランチ運用

- `main`: 本番用ブランチ。直接プッシュ禁止。
- `feature/<機能名>`: 新機能開発用ブランチ。
- `fix/<バグ名>`: バグ修正用ブランチ。

機能開発・バグ修正はブランチを切り、Pull Request経由でmainにマージする。
