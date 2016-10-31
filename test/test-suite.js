require('fs').readdir('./test', (err, files) => {
	files.filter(file => file.endsWith('Spec.js')).forEach(file => require('./' + file));
})