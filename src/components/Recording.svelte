<script lang="ts">
  import { onMount } from 'svelte'
  let media: any[] = [];
  let mediaRecorder: any = null;
  onMount(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = (event: any) => media.push(event.data)
    mediaRecorder.onstop = function(){
      const audio: any = document.querySelector('audio');
      const blob = new Blob(media, {'type' : 'audio/ogg; codecs=opus' });
      media = []; 
      audio.src = window.URL.createObjectURL(blob);
    }
  })
  let recordingIsDisabled:boolean = false;

  function startRecording() { 
    mediaRecorder.start() 
    recordingIsDisabled = true;
  }

  let stopIsDisabled:boolean = false;
  function stopRecording() { mediaRecorder.stop() 
  stopIsDisabled = true;
  }
</script>

<section class="text-center">
  <button disabled = {recordingIsDisabled} on:click={startRecording} class={recordingIsDisabled ? "bg-slate-400 px-3 py-1 rounded mx-1.5 my-4":"bg-[#b9f6ca] px-3 py-1 rounded mx-1.5 my-4"}>Record</button>
  <button disabled = {stopIsDisabled} on:click={stopRecording} class={stopIsDisabled ? "bg-slate-400 px-3 py-1 rounded mx-1.5 my-4":"bg-[#b9f6ca] px-3 py-1 rounded mx-1.5 my-4"}>Stop</button>
  <audio controls class="m-auto"/>
</section>