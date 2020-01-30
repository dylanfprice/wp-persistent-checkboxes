<?php
/**
 * Plugin Name: Persistent Checkboxes
 * Plugin URI: https://bitbucket.org/dylanfprice/wp-persistent-checkboxes
 * Description: This plugin contains a gutenberg block that renders checkboxes whose state will be persisted in the end user's browser.
 * Version: 0.1.0
 * Author: Dylan Price <the.dylan.price@gmail.com>
 *
 * @package persistent-checkboxes
 */

function persistent_checkboxes_register_block() {

    $asset_file = include( plugin_dir_path( __FILE__ ) . 'build/index.asset.php');
 
    wp_register_script(
        'persistent-checkboxes-script',
        plugins_url('build/index.js', __FILE__ ),
        $asset_file['dependencies'],
        $asset_file['version']
    );

    register_block_type('persistent-checkboxes/persistent-checkboxes', array(
        'script' => 'persistent-checkboxes-script',
    ));
}
add_action('init', 'persistent_checkboxes_register_block');
