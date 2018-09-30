<?php
/**
 * Plugin Name: Persistent Checkboxes
 * Plugin URI: https://github.com/dylanfprice/wp-persistent-checkboxes
 * Description: This plugin contains a gutenberg block that renders checkboxes whose state will be persisted in the end user's browser.
 * Version: 0.0.1
 * Author: Dylan Price <the.dylan.price@gmail.com>
 *
 * @package persistent-checkboxes
 */

function persistent_checkboxes_register_block() {
    wp_register_script(
        'persistent-checkboxes-script',
        plugins_url('dist/main.js', __FILE__ ),
        // Must be kept in sync with wordpress packages in package.json.
        array('wp-blocks', 'wp-components', 'wp-editor')
    );

    register_block_type('persistent-checkboxes/persistent-checkboxes', array(
        'script' => 'persistent-checkboxes-script',
    ));
}
add_action('init', 'persistent_checkboxes_register_block');

