<script>
	import Header from '../components/Header.svelte';
	import { page } from '$app/stores';
	import {recordingIsDisabled, stopIsDisabled, filePresentToUpload} from "../store"

	const handleClick = ()=>{
	recordingIsDisabled.set(false)
	stopIsDisabled.set(false)
	filePresentToUpload.set(false)
}
</script>


<Header/>
<ul class="text-center">
	<li class="mb-11">
		<a on:click={handleClick} class:active={$page.url.pathname === '/record'} sveltekit:prefetch href="/record" class="underline underline-offset-4 decoration-solid decoration-2 decoration-amber-100"
	><h2 class="font-Josefin text-amber-100 text-4xl font-normal text-center">I want to record a story</h2></a>
	</li>
	<li>
		<a class:active={$page.url.pathname === '/bookshelf'} sveltekit:prefetch href="/bookshelf" class="underline underline-offset-4 decoration-solid decoration-2 decoration-amber-100"
		><h2 class="font-Josefin text-amber-100 text-4xl font-normal text-center">Go to bookshelf</h2></a>
	</li>
</ul>