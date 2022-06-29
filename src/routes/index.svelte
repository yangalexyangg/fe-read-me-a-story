<script>
	import { page } from '$app/stores';
	import {recordingIsDisabled, stopIsDisabled, filePresentToUpload} from "../store"
const handleClick = ()=>{
	recordingIsDisabled.set(false)
	stopIsDisabled.set(false)
	filePresentToUpload.set(false)
}
</script>



<a on:click={handleClick} class:active={$page.url.pathname === '/record'} sveltekit:prefetch href="/record"
	>I want to record a story</a
>

<a class:active={$page.url.pathname === '/bookshelf'} sveltekit:prefetch href="/bookshelf"
	>Go to bookshelf</a
>
