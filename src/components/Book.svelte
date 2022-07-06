<script lang="ts">
	import { fetchStory, fetchUserById } from '../utils/api-request';
	import { onMount } from 'svelte';
	import { userId } from '../store';
	import Player from './Player.svelte';

	export let bookId: string;

	let src = '../images/book.png';

	interface Chapter {
		chapter_src: string;
	}

	interface Book {
		title: string;
		chapters: Chapter[];
		createdBy: String;
	}
	let book: Book = {
		title: '',
		chapters: [{ chapter_src: '' }],
		createdBy: ''
	};

	let isLoading: boolean = true;

	onMount(async () => {
		book = await fetchStory(bookId);
		const userData = await fetchUserById($userId);
		book.createdBy = userData.display_name;
		isLoading = false;
	});
</script>

<svelte:head>
	<title>{book.title}</title>
</svelte:head>

<div
	class="m-5  mt-4 rounded border-8 border-solid border-[#b9f6ca] bg-amber-100 py-5 text-center "
>
	{#if isLoading}
		<h2 class="text-center font-Josefin text-4xl font-normal">Loading...</h2>
	{:else}
		<h2 class="text-center font-Josefin text-4xl font-normal">{book.title}</h2>
		<img {src} alt={book.title} class=" m-auto mt-4 mb-4 max-w-[13rem]" />
		<p>Recorded by: {book.createdBy}</p>
		{#each book.chapters as chapter, i}
			<Player index={i} src={chapter.chapter_src} />
		{/each}
	{/if}
</div>
