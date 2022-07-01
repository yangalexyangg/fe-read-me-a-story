<script lang="ts">
	import { onMount } from 'svelte';
	import { storage } from '../utils/admin';
	import { ref, listAll, getDownloadURL, getMetadata } from 'firebase/storage';
	import { page } from '$app/stores';
	import { fetchStories } from '../utils/api-request';
	import { familyId } from '../store';

	interface Book {
		fileName: string;
		title: string;
		artworkPath: string;
		url: string;
	}
	let srcBook = 'images/book.png';
	let srcOwl = 'images/owl-logo.png';

	let books: Book[] = [];

	const listRef = ref(storage, 'recordings');

	let areStoriesLoading: boolean = true;

	const getBooks = async () => {
		areStoriesLoading = true;
		try {
			const books = await fetchStories($familyId);
			areStoriesLoading = false;
		} catch (error) {
			console.error(error);
		}

		// let url: string;
		// const { items } = await listAll(listRef);
		// books = await Promise.all(
		// 	items.map(async (item) => {
		// 		return {
		// 			title: await getMetadata(ref(storage, item.fullPath)).then(
		// 				(metadata) => metadata.customMetadata.niceName || 'placeholder'
		// 			),
		// 			fileName: item.name,
		// 			artworkPath: srcBook,
		// 			url: await getDownloadURL(ref(storage, item.fullPath))
		// 		};
		// 	})
		// );
	};

	onMount(() => {
		getBooks();
	});
</script>

<ul>
	<h2 class="text-center font-Josefin text-4xl font-normal text-amber-100">Our Bookshelf</h2>
	{#if areStoriesLoading}
		<div class="loader"><img class="m-auto mt-12 w-12" src={srcOwl} alt="" /></div>
	{/if}

	{#each books as book}
		<li
			class="m-auto mb-5 mt-5 max-w-xs rounded border-8 border-solid border-[#b9f6ca] bg-amber-100 py-5 text-center"
		>
			<h2 class="text-xl">{book.title}</h2>
			<img src={book.artworkPath} alt={book.title} class=" m-auto mt-4 mb-4 max-w-[13rem]" />
			<a
				class:active={$page.url.pathname === `/${book.title}`}
				sveltekit:prefetch
				href={`/${book.title}`}
				class="underline decoration-solid decoration-2 underline-offset-4">Listen to story</a
			>
		</li>
	{/each}
</ul>

<style>
	.loader {
		animation: rotation 2s infinite linear;
	}

	@keyframes rotation {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(359deg);
		}
	}
</style>
