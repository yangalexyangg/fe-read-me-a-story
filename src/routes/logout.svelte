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


<div class="text-center m-auto text-[#b9f6ca] mt-40 animate-pulse">
	<p class="inline text-2xl ml-5">z</p>
	<p class="inline text-4xl">z</p>
	<p class="inline text-6xl">z</p>
</div>


<img class="m-auto w-40" {src} alt="owly" />
<h1 class="text-center text-amber-100 text-4xl my-5">Goodnight!</h1>

<a
	class:active={$page.url.pathname === '/'}
	sveltekit:prefetch
	href="/"
	class="underline decoration-amber-100 decoration-solid decoration-2 underline-offset-4"
	><p class="text-center font-Josefin font-normal text-amber-100">Log back in?</p></a
>


