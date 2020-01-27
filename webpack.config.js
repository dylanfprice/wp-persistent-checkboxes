const merge = require( 'webpack-merge' );
const config = require( '@wordpress/scripts/config/webpack.config' );

module.exports = merge( config, {
	output: {
		library: 'persistentCheckboxes',
	},
} );
