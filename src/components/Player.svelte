<script lang="ts">
	import { onMount } from 'svelte';
	import { ref, getDownloadURL } from 'firebase/storage';
	import { storage } from '../utils/admin';
	import Book from './Book.svelte';

	export let src: string;
	export let index: number;

	$: chapterSource = '';
	let isLoading: boolean = true;

	onMount(async () => {
		chapterSource = await getDownloadURL(ref(storage, src));
		let audio = document.getElementById(`audio${index}`) as HTMLAudioElement;
		if (audio) {
			audio.src = chapterSource;
		}
		isLoading = false;
	});
</script>

{#if isLoading}
	<p>Loading...</p>
{:else}
	<p>Chapter {index + 1}</p>
	<audio id={`audio${index}`} controls class="m-auto mt-5" src={chapterSource} />
{/if}
