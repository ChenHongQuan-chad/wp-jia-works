<?php status_header(200); ?>
<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js no-svg">

<head>
	<meta charset="<?php bloginfo('charset'); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<?php
	if (!(wp_is_mobile())) : ?>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<?php else : ?>
		<meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0,user-scalable=no;">
	<?php endif; ?>
	<title><?php wp_title('-', true, 'right'); ?></title>
	<link rel="shortcut icon" type="image/x-icon" href="<?php echo esc_url(get_template_directory_uri()); ?>/favicon.ico" sizes="16x16 24x24 32x32 48x48">
	<link rel="apple-touch-icon" type="image/png" href="/apple-icon.png" sizes="114x114">
	<?php wp_head(); ?>
	<!-- Google tag (gtag.js) -->
	<!-- <script async src="https://www.googletagmanager.com/gtag/js?id=G-10H9XJX94L"></script>
	<script>
		window.dataLayer = window.dataLayer || [];

		function gtag() {
			dataLayer.push(arguments);
		}
		gtag('js', new Date());
		gtag('config', 'G-10H9XJX94L');
	</script> -->
</head>

<body <?php body_class(); ?>>
	<?php wp_body_open(); ?>