<script lang="ts">
	import Header from '../components/Header.svelte';
	import LogIn from '../components/LogIn.svelte';
	import { page } from '$app/stores';
	import LoginHeader from '../components/LoginHeader.svelte';

	let loggedIn: boolean = false;
</script>

{#if !loggedIn}
	<LoginHeader />
	<LogIn bind:userLoggedIn={loggedIn} />
{:else}
	<Header />
	<ul class="text-center">
		<li class="mb-11">
			<a
				class:active={$page.url.pathname === '/record'}
				sveltekit:prefetch
				href="/record"
				class="underline decoration-amber-100 decoration-solid decoration-2 underline-offset-4"
				><h2 class="text-center font-Josefin text-4xl font-normal text-amber-100">
					I want to record a story
				</h2></a
			>
		</li>
		<li>
			<a
				class:active={$page.url.pathname === '/bookshelf'}
				sveltekit:prefetch
				href="/bookshelf"
				class="underline decoration-amber-100 decoration-solid decoration-2 underline-offset-4"
				><h2 class="text-center font-Josefin text-4xl font-normal text-amber-100">
					Go to bookshelf
				</h2></a
			>
		</li>
	</ul>
{/if}
