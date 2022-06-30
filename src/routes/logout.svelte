<script lang="ts">
    import { page } from '$app/stores';
	let src: string = 'images/owl-logo.png';
</script>

<img class="w-40 m-auto mt-64" {src} alt="owly" />
<h1 class="text-amber-100 text-center">Goodnight!</h1>

<a
	class:active={$page.url.pathname === '/'}
	sveltekit:prefetch
	href="/"
	class="underline decoration-amber-100 decoration-solid decoration-2 underline-offset-4"
	><p class="text-center font-Josefin font-normal text-amber-100">
		Sign back in?
	</p></a
>
