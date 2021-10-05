const 	{ 	src,
			dest,
			// parallel,
			series,
			task,
			watch	}	= require('gulp')

const		auto		= require('autoprefixer'),
			color		= require('postcss-colorblind'),
			cssnano		= require('cssnano'),
			magic		= require('postcss-font-magician'),
			maps		= require('gulp-sourcemaps'),
			post		= require('gulp-postcss'),
			rename		= require('gulp-rename'),
			stylus		= require('gulp-stylus'),
			// svgo		= require('postcss-svgo'),
			ugly		= require('gulp-terser-js')

const path	= {
	styles: {
		src: './sources/stylus/theme.styl',
		dest: './assets/css/'
	},
	scripts: {
		src: './sources/javascript/theme.js',
		dest: './assets/js/'
	}
}

function styles () {
	const processors = [
		auto,
		color,
		magic,
		// svgo,
		cssnano,
	]
	return src(path.styles.src)
		.pipe(maps.init())
		.pipe(stylus({
			use: [

			]
		}))
		.pipe(post(processors))
		.pipe(rename('wellspring.css'))
		.pipe(maps.write('./'))
		.pipe(dest(path.styles.dest));
}

function scripts () {
	return src(path.scripts.src)
		.pipe(ugly({
			mangle: {
				toplevel: true
			}
		}))
		.pipe(rename('wellspring.js'))
		.pipe(dest(path.scripts.dest));
}

task('watch', () => {
		watch('**/*.styl', styles)
		watch('**/*.js', scripts)
	});

task('default', series(styles, scripts, ['watch']));