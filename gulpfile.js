const 	{ 	gulp,
			src,
			dest,
			parallel,
			series,
			task,
			watch	}	= require('gulp');

const		auto		= require('autoprefixer'),
			color		= require('postcss-colorblind'),
			cssnano		= require('cssnano'),
			magic		= require('postcss-font-magician'),
			maps		= require('gulp-sourcemaps'),
			post		= require('gulp-postcss'),
			rename		= require("gulp-rename"),
			rupture		= require('rupture'),
			stylus		= require('gulp-stylus'),
			svgo		= require('postcss-svgo'),
			typo		= require('typographic'),
			ugly		= require('gulp-terser-js');

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

const processors = [
	auto,
	color,
	// magic,
	// svgo,
	cssnano,
];

function styles () {
		return src(path.styles.src)
			.pipe(maps.init())
			.pipe(stylus({
				use: [
					typo(),
					rupture()
				]
			}))
			.pipe(post(processors))
			.pipe(rename('wellspring.css'))
			.pipe(maps.write('./'))
			.pipe(dest(path.styles.dest));
};

function scripts () {
	return src(path.scripts.src)
		.pipe(ugly({
			mangle: {
				toplevel: true
			}
		}))
		.pipe(rename('wellspring.js'))
		.pipe(dest(path.scripts.dest));
};

function tasks (cb) {
	parallel(
		styles,
		scripts
	),
		cb()
};

task('watch', () => {
		watch('**/*.styl', styles),
		watch('**/*.js', scripts)
	});

// task('default', series(tasks, ['watch']));
task('default', series(styles, scripts, ['watch']));