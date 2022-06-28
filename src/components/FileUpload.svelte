<script lang="ts">
	import { ref, uploadBytes } from 'firebase/storage';
	import { storage } from '../utils/admin';
	// TODO: currently imports file directly, this should be passed into component
	import file from '../data/testFile.txt';

	// specify where to store recordings in firebase
	// Date.now() is temp workaround to create unique(ish) filenames and prevent overwriting
	const recordingRef = ref(storage, `recordings/testFile-${Date.now()}.txt`);

	let fileUploaded = false;

	// TODO: convert to interface?
	const metadata = {
		// using customMetadata as a temporary way to store human-readable name from form
		customMetadata: { niceName: '' }
	};

	const uploadFile = async () => {
		console.log('uploading file');
		const response = await fetch(file);
		if (response.ok) {
			const fileContents = await response.blob();
			const snapshot = await uploadBytes(recordingRef, fileContents, metadata);
			console.log(`${metadata.customMetadata.niceName} was uploaded to ${snapshot.ref}`);
			fileUploaded = true;
		} else {
			// placeholder error handling
			const message = `An error has occured: ${response.status}`;
			throw new Error(message);
		}
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
