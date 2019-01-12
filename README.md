# post

開発用コードネーム: post

2bb334247e2b14fae71dfaba39cf28eb2543705f の時点での Tree

```
├── README.md
├── app
│   ├── app.js
│   ├── expand
│   │   └── render.js
│   ├── middlewares
│   │   ├── errorHandler.js
│   │   ├── language.js
│   │   ├── notFoundHandler.js
│   │   ├── passport
│   │   │   ├── index.js
│   │   │   └── local.js
│   │   └── session.js
│   └── routes
│       ├── filters
│       │   ├── edit.js
│       │   └── login.js
│       ├── get
│       │   ├── games
│       │   │   └── _id
│       │   │       ├── edit
│       │   │       │   ├── api.js
│       │   │       │   ├── app.js
│       │   │       │   ├── index.js
│       │   │       │   ├── info.js
│       │   │       │   ├── license.js
│       │   │       │   ├── meta.js
│       │   │       │   └── public.js
│       │   │       └── index.js
│       │   ├── index.js
│       │   ├── login.js
│       │   ├── settings
│       │   │   ├── account.js
│       │   │   ├── index.js
│       │   │   ├── notifications.js
│       │   │   ├── password.js
│       │   │   └── profile.js
│       │   ├── signup.js
│       │   ├── upload.js
│       │   └── users
│       │       └── _screenName
│       │           └── index.js
│       ├── index.js
│       ├── multipartPost
│       │   ├── games
│       │   │   └── _id
│       │   │       └── edit
│       │   │           ├── app
│       │   │           │   └── zip.js
│       │   │           └── thumbnail.js
│       │   └── settings
│       │       └── avater.js
│       └── post
│           ├── games
│           │   └── _id
│           │       └── edit
│           │           ├── app.js
│           │           ├── info.js
│           │           ├── license.js
│           │           ├── meta.js
│           │           └── public.js
│           ├── login.js
│           ├── logout.js
│           ├── settings
│           │   ├── account.js
│           │   ├── email.js
│           │   ├── password.js
│           │   └── profile.js
│           ├── signup.js
│           └── upload.js
├── bin
│   └── www
├── config
│   ├── config.js
│   ├── default.js
│   ├── development.js
│   ├── environment
│   │   ├── devDirectory.yaml
│   │   ├── devMariaDB.yaml
│   │   ├── devRedis.yaml
│   │   ├── devSecrets.yaml
│   │   ├── prodDirectory.yaml
│   │   ├── prodMariaDB.yaml
│   │   ├── prodRedis.yaml
│   │   └── prodSecrets.yaml
│   ├── languages
│   │   └── ja.yaml
│   ├── pattern
│   │   ├── game.yaml
│   │   └── user.yaml
│   └── production.js
├── db
│   ├── config.js
│   ├── migrations
│   │   ├── 20180924105444-create-user.js
│   │   ├── 20180924110215-create-game.js
│   │   ├── 20181006112718-create-tag.js
│   │   └── 20181006112827-create-game-tag.js
│   ├── models
│   │   ├── game.js
│   │   ├── gameTag.js
│   │   ├── index.js
│   │   ├── tag.js
│   │   └── user.js
│   └── seeders
├── package-lock.json
├── package.json
├── src
│   ├── index.js
│   ├── scripts
│   │   └── sub.js
│   ├── stylesheets
│   │   ├── app.sass
│   │   ├── foundation
│   │   │   ├── base.scss
│   │   │   └── reset.scss
│   │   ├── layout
│   │   │   ├── footer.scss
│   │   │   ├── header.scss
│   │   │   └── main.scss
│   │   └── object
│   │       ├── component
│   │       │   ├── hd.scss
│   │       │   └── input.scss
│   │       ├── project
│   │       │   ├── form.scss
│   │       │   └── widget.scss
│   │       └── utility
│   ├── stylesheets_old
│   │   ├── components
│   │   │   └── form.sass
│   │   ├── includes
│   │   │   ├── footer.sass
│   │   │   └── header.sass
│   │   ├── pages
│   │   │   ├── auth.sass
│   │   │   ├── game.sass
│   │   │   ├── profile.sass
│   │   │   ├── settings.sass
│   │   │   └── upload.sass
│   │   └── style.sass
│   └── turbolinks
│       ├── index.js
│       └── style.sass
├── util
│   ├── resizeImage.js
│   └── validation.js
├── views
│   ├── includes
│   │   ├── footer.pug
│   │   └── header.pug
│   ├── layout.pug
│   └── pages
│       ├── edit
│       │   ├── api.pug
│       │   ├── app.pug
│       │   ├── info.pug
│       │   ├── layout.pug
│       │   ├── license.pug
│       │   ├── meta.pug
│       │   └── public.pug
│       ├── error.pug
│       ├── game.pug
│       ├── index.pug
│       ├── login.pug
│       ├── settings
│       │   ├── account.pug
│       │   ├── layout.pug
│       │   ├── notifications.pug
│       │   ├── password.pug
│       │   └── profile.pug
│       ├── signup.pug
│       ├── upload.pug
│       └── user.pug
└── webpack.config.js
```
