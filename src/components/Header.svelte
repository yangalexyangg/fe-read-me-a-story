<script>
	import Nav from '../components/Nav.svelte';
	let src = 'images/owl-logo.png';
</script>

<header>
	<a href="/">
		<div class="flex justify-center p-4">
			<img class="max-w-[85px]" {src} alt="owly" />
			<h1 class="font-Amatic text-6xl text-amber-100">Read Me A Story</h1>
		</div>
	</a>
</header>
<Nav />
