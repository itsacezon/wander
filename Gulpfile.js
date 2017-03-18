var elixir = require('laravel-elixir');

elixir.ready(() => {
  elixir.config.js.browserify.transformers.push({
    name: 'vueify',
    options: {}
  });
});

elixir((mix) => {
  mix.sass('./src/assets/styles/app.scss')
  mix.browserify('./src/build.js')
});
