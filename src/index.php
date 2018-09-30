<?php

function wp_persistent_checkboxes_register_block() {
    wp_register_script(
        'wp-persistent-checkboxes-script',
        plugins_url('dist/main.js', __FILE__ ),
        // Must be kept in sync with wordpress packages in package.json.
        array('wp-blocks', 'wp-components', 'wp-editor')
    );

    register_block_type('wp-persistent-checkboxes/persistent-checkboxes', array(
        'script' => 'wp-persistent-checkboxes-script',
    ));
}
add_action('init', 'wp_persistent_checkboxes_register_block');
