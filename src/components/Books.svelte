<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { fetchStories } from '../utils/api-request';
	import { familyId } from '../store';

	interface Chapter {
		chapter_src: string;
		created_by: string;
		played: boolean;
	}

	interface bookItem {
		storyId: {
			chapters: Chapter[];
			cover: string;
			created_at: number;
			created_by: string;
			families: {
				family_id: boolean;
			};
			title: string;
		};
	}

	interface Book {
		fileName: string;
		title: string;
		artworkPath: string;
		url: string;
	}
	let srcBook = 'images/book.png';
	let srcOwl = 'images/owl-logo.png';

	let books: Book[] = [];

	let areStoriesLoading: boolean = true;

	const getBooks = async () => {
		areStoriesLoading = true;
		try {
			console.log($familyId);

			const returnedBooks = await fetchStories($familyId);
			books = returnedBooks.map((bookItem: bookItem) => {
				return {
					artworkPath: srcBook,
					title: Object.values(bookItem)[0].title
				};
			});
			areStoriesLoading = false;
		} catch (error) {
			console.error(error);
		}
	};

	onMount(() => {
		getBooks();
	});
</script>

<h2 class="text-center font-Josefin text-4xl font-normal text-amber-100">Our Bookshelf</h2>
{#if areStoriesLoading}
	<div class="loader"><img class="m-auto mt-12 w-12" src={srcOwl} alt="" /></div>
{:else if books.length === 0}
	<p>No books</p>
{:else}
	<ul>
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
{/if}

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
