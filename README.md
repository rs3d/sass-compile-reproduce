# sass-compile-reproduce

1. run `npm install`
2. run `npm start`
3. navigate to `localhost:8080` in the browser
4. try updating background color in `styles/base/_base.scss` - nothing happens
5. remove variable reference from `styles/base/_base.scss` and now try updating background - now hot reloading works
