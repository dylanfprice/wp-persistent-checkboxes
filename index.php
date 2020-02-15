<?php
/**
 * Plugin Name: Persistent Checkboxes
 * Description: Gutenberg block that renders checkboxes whose state will be persisted in the end user's browser.
 * Version: 0.1.0
 * Requires at least: 5.3.0
 * Author: Dylan Price
 * License: GPLv3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.html
 *
 * @package persistent-checkboxes
 */

function persistent_checkboxes_register_block() {

    $asset_file = include( plugin_dir_path( __FILE__ ) . 'build/index.asset.php' );
 
    wp_register_script(
        'persistent-checkboxes-script',
        plugins_url( 'build/index.js', __FILE__ ),
        $asset_file['dependencies'],
        $asset_file['version']
    );

    if ( function_exists( 'register_block_type' ) ) {
        register_block_type(
            'persistent-checkboxes/persistent-checkboxes',
            array( 'script' => 'persistent-checkboxes-script' )
        );
    }
}
add_action( 'init', 'persistent_checkboxes_register_block' );
