# frontplate

フロントエンド開発の効率を上げるテンプレート

[CHANGELOG](https://github.com/frontainer/frontplate/blob/master/CHANGELOG.md)

[過去バージョン](https://github.com/frontainer/frontplate/releases)

## Dependence

* [NodeJS](https://nodejs.org/) 5.0以上
* [frontplate-cli](https://www.npmjs.com/package/frontplate-cli) 3.0以上

## Usage

詳しくは[wiki](https://github.com/frontainer/frontplate-cli/wiki)を参照ください

https://github.com/frontainer/frontplate-cli/wiki

## firebase

```
npm install -g firebase-tools
```

CLIのインストールが完了したら起動しましょう。

```
firebase login
```

「匿名の情報を収集していいか？」と聞いてくるので、好みでY/nしましょう。
次にブラウザが開いて、googleアカウントでログイン＆権限の承認を求められるので、承認しましょう。

おめでとうございます！これでコマンドラインからfirebaseが使えるようになりました！

さあ、次の手を始めましょう。

```
firebase init
```

とタイプすると燃えたFIREBASEの文字が画面が出てくるはずです。

ここでは静的サイトのホスティングを進めたいので、下の
Hosting: Configure and deploy Firebase Hostingsites
を選びましょう。

プロジェクトを作るか？と聞いてくるので、自分で作成したプロジェクトを選びましょう。

firebase.jsonに

```
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ]
  }
}
```

と記載します。

```
firebase serve
```

コマンドを入力し

http://localhost:5000/
を入力するとwebページが表示されます。

詳しい説明はこちら
https://qiita.com/kohashi/items/43ea22f61ade45972881

## URL

```
https://82mou.github.io/voting-app-by-jquery/public/user.html
https://82mou.github.io/voting-app-by-jquery/public/controlpanel-l5Aqzlfll8.html
https://82mou.github.io/voting-app-by-jquery/public/screen-0XkfQj8T3z.html

```