<script lang="ts">
	import { ref, uploadBytesResumable } from 'firebase/storage';
	import { storage } from '../utils/admin';

	import { recordingIsDisabled, stopIsDisabled, uploadIsDisabled, resetIsDisabled } from '../store';
	import { onMount } from 'svelte';
	import { postStory } from '../utils/api-request';

	import { userId, familyId } from '../store';

	export let recordingFile: Blob;
	let fileUploaded: boolean = false;
	let isUploading: boolean = false;
	let progress: number = 0;
	let errorMessage: string = '';
	let onlineStatus: boolean = false;

	onMount(async () => {
		recordingIsDisabled.set(false);
		stopIsDisabled.set(false);
		uploadIsDisabled.set(false);
	});

	// specify where to store recordings in firebase
	// Date.now() is temp workaround to create unique(ish) filenames and prevent overwriting
	const recordingRef = ref(storage, `recordings/recording-${Date.now()}.ogg`);

	let newStory = {
		title: '',
		userId: $userId,
		familyId: $familyId,
		chapterSource: recordingRef.fullPath
	};

	const uploadFile = () => {
		$resetIsDisabled = true;
		isUploading = true;
		const uploadTask = uploadBytesResumable(recordingRef, recordingFile);

		uploadTask.on(
			'state_changed',
			(progressSnapshot) => {
				progress = (progressSnapshot.bytesTransferred / progressSnapshot.totalBytes) * 100;
				if (progress === 100) fileUploaded = true;
			},
			(error) => {
				switch (error.code) {
					case 'storage/unauthorized':
						errorMessage = 'You currently do not have the correct permissions to upload stories.';
						break;
					case 'storage/canceled':
						errorMessage = 'You have cancelled the upload.';
						break;
					case 'storage/unauthenticated':
						errorMessage = 'Unauthenticated user detected. Please check your login.';
						break;
					case 'storage/bucket-not-found':
					case 'storage/project-not-found':
						errorMessage =
							'We are currently experiencing some technical issues. Please try again later.';
						break;
				}
			},
			() => {
				postStory(newStory);
			}
		);
	};

	const handleReset = () => {
		recordingIsDisabled.set(false);
		stopIsDisabled.set(false);
		uploadIsDisabled.set(false);
		isUploading = false;
		fileUploaded = false;
		progress = 0;
		newStory.title = '';
		newStory.chapterSource = '';
		$resetIsDisabled = true;
	};
</script>

<svelte:window bind:online={onlineStatus} />

<section class="mt-6 flex-col text-center">
	<form>
		<label class="text-amber-100"
			>Story name <input
				class="text-[#000000]"
				type="text"
				required
				bind:value={newStory.title}
			/></label
		>
	</form>

	{#if !fileUploaded}
		<button
			disabled={!$uploadIsDisabled || !onlineStatus}
			on:click={uploadFile}
			class={isUploading || !$uploadIsDisabled || !onlineStatus
				? 'bg-slate-400 px-3 py-1 rounded mx-1.5 my-4'
				: 'bg-[#b9f6ca] px-3 py-1 rounded mx-1.5 my-4'}>Upload</button
		>
	{:else}
		<button on:click={handleReset} class="mx-1.5 my-4 rounded bg-[#b9f6ca] px-3 py-1"
			>Upload another file?</button
		>
	{/if}

	{#if !onlineStatus}
		<p class="text-amber-100">You are presently not online.</p>
	{:else if errorMessage}
		<section class="flex-col">
			<p class="text-amber-100">{errorMessage}</p>
			<p class="text-amber-100">Please try to reupload.</p>
		</section>
	{:else if fileUploaded}
		<p class="text-amber-100">File uploaded!</p>
	{:else if isUploading}
		<p class="text-amber-100">File uploading... {Math.round(progress)}% done</p>
	{/if}
</section>

<style></style>
