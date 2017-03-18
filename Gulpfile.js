var path = require('path');
var elixir = require('laravel-elixir');

function resolve (dir) {
  return path.join(__dirname, dir);
}

elixir.ready(() => {
  elixir.config.js.browserify.transformers.push(
    {
      name: 'vueify',
      options: {}
    }
  );
});

elixir((mix) => {
  mix.sass('./src/assets/styles/app.scss')
  mix.browserify('./src/build.js')
});
