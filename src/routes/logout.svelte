<script lang="ts">
	import { page } from '$app/stores';
	import { signOut } from 'firebase/auth';
	import { auth } from '../utils/admin';
	import { onMount } from 'svelte';
	import { userId } from '../store';
	let src: string = 'images/owl-logo.png';

	onMount(() => {
		signOut(auth)
			.then(() => {
				userId.set('');
			})
			.catch((error) => {
				console.error(error);
			});
	});
</script>

<img class="m-auto mt-64 w-40" {src} alt="owly" />
<h1 class="text-center text-amber-100">Goodnight!</h1>

<a
	class:active={$page.url.pathname === '/'}
	sveltekit:prefetch
	href="/"
	class="underline decoration-amber-100 decoration-solid decoration-2 underline-offset-4"
	><p class="text-center font-Josefin font-normal text-amber-100">Log back in?</p></a
>
