<?php
/*
 * @Description:
 * @Author: chad-Chen
 */
// Remove all default WP template redirects/lookups
remove_action('template_redirect', 'redirect_canonical');

show_admin_bar(false);

// Redirect all requests to index.php so the Vue app is loaded and 404s aren't thrown
function remove_redirects() {
	add_rewrite_rule('^/(.+)/?', 'index.php', 'top');
}
add_action('init', 'remove_redirects');

// Load scripts
function load_vue_scripts() {
	wp_enqueue_script(
		'vuejs-wordpress-theme-starter-js',
		get_stylesheet_directory_uri() . '/dist/scripts/index.js',
		array('jquery'),
		filemtime(get_stylesheet_directory() . '/dist/scripts/index.js'),
		true
	);

	wp_enqueue_style(
		'vuejs-wordpress-theme-starter-css',
		get_stylesheet_directory_uri() . '/dist/styles.css',
		null,
		filemtime(get_stylesheet_directory() . '/dist/styles.css')
	);
}
add_action('wp_enqueue_scripts', 'load_vue_scripts', 100);

add_action('rest_api_init', 'wp_rest_insert_some'); //添加到 REST API 中
function wp_rest_insert_some() { //注册要个性化的功能函数
	register_rest_field(
		'page',
		'content',
		array(
			'get_callback'    => 'do_shortcodes',
			'update_callback' => null,
			'schema'          => null,
		)
	);
	register_rest_field(
		'post',
		'content',
		array(
			'get_callback'    => 'do_shortcodes',
			'update_callback' => null,
			'schema'          => null,
		)
	);
	// 给自定义类型添加shortCodes支持
	register_rest_field(
		'video',
		'content',
		array(
			'get_callback'    => 'do_shortcodes',
			'update_callback' => null,
			'schema'          => null,
		)
	);
	register_rest_field(
		'post',
		'post_categories',
		array(
			'get_callback'    => 'wp_rest_get_categories_links', //在 posts 中展示分类&链接&ID
			'update_callback' => null,
			'schema'          => null,
		)
	);
	register_rest_field(
		'video',
		'post_categories',
		array(
			'get_callback'    => 'wp_rest_get_categories_links', //在 posts 中展示分类&链接&ID
			'update_callback' => null,
			'schema'          => null,
		)
	);
	register_rest_field(
		'post',
		'post_excerpt',
		array(
			'get_callback'    => 'wp_rest_get_plain_excerpt', //在 posts 中展示纯文本摘录
			'update_callback' => null,
			'schema'          => null,
		)
	);
	register_rest_field(
		'video',
		'post_excerpt',
		array(
			'get_callback'    => 'wp_rest_get_plain_excerpt', //在 posts 中展示纯文本摘录
			'update_callback' => null,
			'schema'          => null,
		)
	);
	register_rest_field(
		'post',
		'post_date',
		array(
			'get_callback'    => 'wp_rest_get_normal_date', //在 posts 中展示简化后的日期
			'update_callback' => null,
			'schema'          => null,
		)
	);
	register_rest_field(
		'video',
		'post_date',
		array(
			'get_callback'    => 'wp_rest_get_normal_date', //在 posts 中展示简化后的日期
			'update_callback' => null,
			'schema'          => null,
		)
	);
	// 给产品添加blog_name
	register_rest_field(
		'post',
		'blog_name',  //要注册的字段名
		array(
			'get_callback' => 'get_blog_name', //注册的要实现的功能函数
			'update_callback' => null,
			'schema' => null,
		)
	);
	register_rest_field(
		'video',
		'blog_name',  //要注册的字段名
		array(
			'get_callback' => 'get_blog_name', //注册的要实现的功能函数
			'update_callback' => null,
			'schema' => null,
		)
	);
	register_rest_field(
		'category',
		'feat_image',
		array(
			'get_callback'    => 'wp_rest_get_feat_image', //在 category 中展示简化后的日期
			'update_callback' => null,
			'schema'          => null,
		)
	);

	// 有问题
	// register_rest_field(
	// 	'post',
	// 	'post_metas',
	// 	array(
	// 		'get_callback' => 'get_post_meta_for_api', //在 posts 中展示一些指定的文章自定义字段
	// 		'update_callback' => null,
	// 		'schema' => null,
	// 	)
	// );
}

function get_blog_name($post) { //要实现的功能函数
	return get_bloginfo('name');
}
// 借助Categories Images插件，给category添加feat_img图片
function wp_rest_get_feat_image($category) {
	// return $category['slug'];
	return z_taxonomy_image_url($category['id']);
	// $feat_images = array();
	// echo (z_taxonomy_image_url() . 'test');
	// foreach ($categories as $category) {
	// 	// $term_link = z_taxonomy_image_url($category->term_id);
	// 	echo (get_category_link($category->term_id));
	// 	echo (json_encode($category) . '打印数组字符串');
	// if (is_wp_error($term_link)) {
	// 	continue;
	// }
	// $feat_images[] = array('link' => $term_link);
	// }
	// return $feat_images;
}
function wp_rest_get_categories_links($post) {
	$post_categories = array();
	$categories = wp_get_post_terms($post['id'], 'category', array('fields' => 'all'));

	foreach ($categories as $term) {
		$term_link = get_term_link($term);
		if (is_wp_error($term_link)) {
			continue;
		}
		$post_categories[] = array('term_id' => $term->term_id, 'name' => $term->name, 'link' => $term_link);
	}
	return $post_categories;
}
function wp_rest_get_plain_excerpt($post) {
	$excerpts = wp_trim_words(get_the_excerpt($post['id']), 90);
	return $excerpts;
}

function wp_rest_get_normal_date($post) {
	$date = get_the_date('y-m-d', $post['id']);
	return $date;
}

function get_post_meta_for_api($post) {
	$post_meta = array();
	$post_meta['views'] = get_post_meta($post['id'], 'post_views_count', true);
	$post_meta['link'] = get_post_meta($post['id'], 'link', true);
	$post_meta['img'] = wp_get_attachment_image_src(get_post_thumbnail_id($post->ID), 'full');
	$post_meta['title'] = get_the_title($post['id']);
	return $post_meta;
}

function do_shortcodes($object, $field_name, $request) {
	if (class_exists('WPBMap')) WPBMap::addAllMappedShortcodes(); //添加短代码支持
	global $post;
	$pid = $object['id'];
	$post = get_post($pid);
	$content = apply_filters('the_content', $post->post_content);
	// 添加自定义样式
	$vccss = get_post_meta($pid, '_wpb_shortcodes_custom_css', true);
	if (!empty($vccss)) {
		$vccss = strip_tags($vccss);
		$content .= '<style type="text/css" data-type="vc_shortcodes-custom-css">';
		$content .= $vccss;
		$content .= '</style>';
	}
	// wpbmap的video短代码不支持
	$output['rendered'] = do_shortcode($content);
	return $output;
}


/**
 * 一次性加上所有分类的支持
 * 自定义分类hotel_category的分类列表： …/wp-json/wp/v2/hotel_category/
 * 分类为12的自定义类型文章列表：…/wp-json/wp/v2/hotel?hotel_category=12
 */
function my_custom_post_type_rest_support() {
	global $wp_post_types;
	//be sure to set this to the name of your post type!
	$post_type_name = 'blogs';
	if (isset($wp_post_types[$post_type_name])) {
		$wp_post_types[$post_type_name]->show_in_rest = true;
		// Optionally customize the rest_base or controller class
		$wp_post_types[$post_type_name]->rest_base = $post_type_name;
		$wp_post_types[$post_type_name]->rest_controller_class = 'WP_REST_Posts_Controller';
	}
}
add_action('init', 'my_custom_post_type_rest_support', 25);
function sb_add_cpts_to_api($args, $post_type) {
	if ('blogs' === $post_type) {
		$args['show_in_rest'] = true;
	}
	return $args;
}
add_filter('register_post_type_args', 'sb_add_cpts_to_api', 10, 2);

function add_custom_taxes_to_api() {
	$taxonomies = get_taxonomies('', 'objects');
	foreach ($taxonomies as $taxonomy) {
		$taxonomy->show_in_rest = true;
	}
}
add_action('init', 'add_custom_taxes_to_api', 30);
add_filter('acf/settings/rest_api_format', function () {
	return 'standard';
});


function disable_wp_rest_api_server_var_custom($var) {
	return array(
		'/wp-json/contact-form-7/v1/contact-forms/1757/refill',
		'/wp-json/contact-form-7/v1/contact-forms/1757/refill/',
		'/wp-json/contact-form-7/v1/contact-forms/1757/feedback',
		'/wp-json/contact-form-7/v1/contact-forms/1757/feedback/',
		'/wp-json/contact-form-7/v1/contact-forms/1757/feedback/schema',
		'/wp-json/contact-form-7/v1/contact-forms/1757/feedback/schema/'
	);
}
add_filter('disable_wp_rest_api_server_var', 'disable_wp_rest_api_server_var_custom');
// add_filter( 'acf/settings/rest_api_enabled', '__return_false' ); //acf restApi不可用
