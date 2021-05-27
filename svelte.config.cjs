const sveltePreprocess = require('svelte-preprocess')

module.exports = {
	// preprocess: [
	// 	sveltePreprocess({
	// 		postcss: true
	// 	}),
	// ],
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: sveltePreprocess({ postcss: true })
}
