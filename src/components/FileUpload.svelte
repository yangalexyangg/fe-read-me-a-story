<script lang="ts">
	import { ref, uploadBytes } from 'firebase/storage';
	import { storage } from '../utils/admin';

	export let recordingFile: Blob 

	// specify where to store recordings in firebase
	// Date.now() is temp workaround to create unique(ish) filenames and prevent overwriting
	const recordingRef = ref(storage, `recordings/recording-${Date.now()}.ogg`);

	let fileUploaded = false;

	// TODO: convert to interface?
	const metadata = {
		// using customMetadata as a temporary way to store human-readable name from form
		customMetadata: { niceName: '' }
	};

	const uploadFile = async () => {
		const snapshot = await uploadBytes(recordingRef, recordingFile, metadata);
		console.log(`${metadata.customMetadata.niceName} was uploaded to ${snapshot.ref}`);
		fileUploaded = true;
	};

	const handleReset = () => {
		fileUploaded = false;
		metadata.customMetadata.niceName = '';
	};
</script>

<section>
	{#if fileUploaded}
		<p>File uploaded!</p>
		<button on:click={handleReset}>Upload another file?</button>
	{:else}
		<form>
			<label
				>Story name <input
					type="text"
					required
					bind:value={metadata.customMetadata.niceName}
				/></label
			>
		</form>
		<button on:click={uploadFile}>Upload</button>
	{/if}
</section>

<style></style>
