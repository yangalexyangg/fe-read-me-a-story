<script>
	import Nav from '../components/Nav.svelte';
	let src = 'images/owl-logo.png';
</script>

<header>
	<Nav/>
	<a href="/">
		<div class="mb-6 flex items-center p-4">
			<img class="w-3/12" {src} alt="owly" />
			<h1 class="font-Amatic text-6xl text-amber-100">Read Me A Story</h1>
		</div>
	</a>
</header>
