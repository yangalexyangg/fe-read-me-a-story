<script>
	import { page } from '$app/stores';
	
</script>

<a class:active={$page.url.pathname === '/record'} sveltekit:prefetch href="/record"
	>I want to record a story</a
>

<a class:active={$page.url.pathname === '/bookshelf'} sveltekit:prefetch href="/bookshelf"
	>Go to bookshelf</a
>
