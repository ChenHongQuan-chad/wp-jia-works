<?php wp_footer(); ?>
<?php if (preg_match("/(.*.local|.*.loc|localhost:.*)/i", $_SERVER['HTTP_HOST'])) : ?>
	<!-- HMR Reloader -->
	<script id="__bs_script__">
		//<![CDATA[
		document.write("<script async src='http://HOST:3000/browser-sync/browser-sync-client.js?v=2.26.5'><\/script>".replace(
			"HOST", location.hostname));
		//]]>
	</script>
<?php endif; ?>
<!--Start of Tawk.to Script-->
<script type="text/javascript">
	var Tawk_API = Tawk_API || {},
		Tawk_LoadStart = new Date();
	(function() {
		var s1 = document.createElement("script"),
			s0 = document.getElementsByTagName("script")[0];
		s1.async = true;
		s1.src = 'https://embed.tawk.to/65633bbfba9fcf18a80efb75/1hg5q2ppe';
		s1.charset = 'UTF-8';
		s1.setAttribute('crossorigin', '*');
		s0.parentNode.insertBefore(s1, s0);
	})();
</script>
<!--End of Tawk.to Script-->
</body>

</html>