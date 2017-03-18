var elixir = require('laravel-elixir');

elixir.ready(() => {
  elixir.config.js.browserify.transformers.push({
    name: 'vueify',
    // https://github.com/vuejs/vueify#usage
    options: {}
  });
});

elixir((mix) => {
  mix.browserify('./src/build.js');
});
