<script lang="ts">
	import Header from '../components/Header.svelte';
	import LogIn from '../components/LogIn.svelte';
	import { page } from '$app/stores';
	import LoginHeader from '../components/LoginHeader.svelte';

	let microphoneSrc = '/images/microphone.png';
	let storySrc = "/images/book.png"

	let loggedIn: boolean = false;
</script>

{#if !loggedIn}
	<LoginHeader />
	<LogIn bind:userLoggedIn={loggedIn} />
{:else}
	<Header />
	<ul class="text-center">
		<li>
			<a
				class:active={$page.url.pathname === '/record'}
				sveltekit:prefetch
				href="/record"
				><h2 class="text-center font-Josefin text-4xl font-normal text-amber-100">
					Record A Story
				</h2><div class="m-auto my-6 rounded border-8 border-solid border-[#b9f6ca] bg-amber-100 py-5 text-center max-w-[14rem]">
					<img src={microphoneSrc} alt="microphone" class="m-auto mt-4 mb-4 max-w-[5rem]" />
				</div></a
			>
		
		</li>
		<li>
			<a
				class:active={$page.url.pathname === '/bookshelf'}
				sveltekit:prefetch
				href="/bookshelf"
	
				><h2 class="text-center font-Josefin text-4xl font-normal text-amber-100">
					Listen To A Story
				</h2><div class="m-auto my-6 rounded border-8 border-solid border-[#b9f6ca] bg-amber-100 py-5 text-center max-w-[14rem] ">
					<img src={storySrc} alt="story" class="m-auto mt-4 mb-4 max-w-[5rem]" />
				</div></a
			>
		</li>
	</ul>
{/if}
