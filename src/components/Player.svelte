<script lang="ts">
	import { onMount } from 'svelte';
	import { ref, getDownloadURL } from 'firebase/storage';
	import { storage } from '../utils/admin';
	import { fetchUserById } from '../utils/api-request';

	export let src: string;
	export let index: number;
	export let author: string;

	$: authorName = '';
	$: chapterSource = '';
	let isLoading: boolean = true;

	onMount(async () => {
		chapterSource = await getDownloadURL(ref(storage, src));
		let audio = document.getElementById(`audio${index}`) as HTMLAudioElement;
		if (audio) {
			audio.src = chapterSource;
		}
		let user = await fetchUserById(author);
		authorName = user.display_name;
		isLoading = false;
	});
</script>

{#if isLoading}
	<p>Loading...</p>
{:else}
	{#if index >= 0}
		<p class="text-xl mt-12 mb-2">Chapter {index + 1}</p>
	{/if}
	<audio id={`audio${index}`} controls class="m-auto" src={chapterSource} />
	<p class="italic mt-2">Read by: {authorName}</p>
{/if}
