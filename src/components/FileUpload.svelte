<script lang="ts">

	
	import { ref, uploadBytesResumable } from 'firebase/storage';
	import { storage } from '../utils/admin';
	import {recordingIsDisabled, stopIsDisabled, filePresentToUpload} from "../store"

	export let recordingFile: Blob 
	let fileUploaded:boolean = false;
	let isUploading:boolean = false;	
	let progress:number = 0;
	let errorMessage:string = ""
	let onlineStatus:boolean = false

	// specify where to store recordings in firebase
	// Date.now() is temp workaround to create unique(ish) filenames and prevent overwriting
	const recordingRef = ref(storage, `recordings/recording-${Date.now()}.ogg`);

	// TODO: convert to interface?
	const metadata = {
		// using customMetadata as a temporary way to store human-readable name from form
		customMetadata: { niceName: '' }
	};

	const uploadFile = () => {
		isUploading = true;
		const uploadTask = uploadBytesResumable(recordingRef, recordingFile, metadata);
		
		uploadTask.on('state_changed', 
			(progressSnapshot) => {
				progress = (progressSnapshot.bytesTransferred / progressSnapshot.totalBytes) * 100;
				if(progress === 100) fileUploaded = true;
			},
			(error)=>{
				switch (error.code) {
      				case 'storage/unauthorized':
        			errorMessage="You currently do not have the correct permissions to upload stories."
        				break;
      				case 'storage/canceled':
       					errorMessage="You have cancelled the upload."
        				break;
					case 'storage/unauthenticated':
       					errorMessage="Unauthenticated user detected. Please check your login."
        				break;
					case 'storage/bucket-not-found':
					case 'storage/project-not-found':
       					errorMessage="We are currently experiencing some technical issues. Please try again later."
        				break;
					}	
			}
		)
	};

	const handleReset = () => {
		recordingIsDisabled.set(false)
		stopIsDisabled.set(false)
		filePresentToUpload.set(false)
		isUploading = false;
		fileUploaded = false;
		metadata.customMetadata.niceName = '';
	};

</script>

<svelte:window bind:online={onlineStatus}/>

<section class="flex-col mt-6 text-center">

	<form>
		<label class="text-amber-100">Story name <input
			class="text-[#000000]"
				type="text"
				required
				bind:value={metadata.customMetadata.niceName}
			/></label>
	</form>

	{#if !fileUploaded}
		<button disabled={!$filePresentToUpload || !onlineStatus} on:click={uploadFile} class={isUploading || !$filePresentToUpload || !onlineStatus ? "bg-slate-400 px-3 py-1 rounded mx-1.5 my-4":"bg-[#b9f6ca] px-3 py-1 rounded mx-1.5 my-4"}>Upload</button>
	{:else }
		<button on:click={handleReset} class="bg-[#b9f6ca] px-3 py-1 rounded mx-1.5 my-4">Upload another file?</button>
	{/if}

	{#if !onlineStatus}
		<p class="text-amber-100">You are presently not online.</p>
	{:else if errorMessage}
		<p class="text-amber-100">{errorMessage}</p>
	{:else if fileUploaded}
		<p class="text-amber-100">File uploaded!</p>
	{:else if isUploading}
		<p class="text-amber-100">File uploading... {Math.round(progress)}% done</p>
	{/if}


</section>

<style></style>
