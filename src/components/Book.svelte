<script lang="ts">
    export let bookTitle:string;
    let src = 'images/book.png';

</script>

<h2 class="font-Josefin text-amber-100 text-4xl font-normal text-center">{bookTitle}</h2>
<img {src} alt={bookTitle} class=" m-auto mt-4 mb-4 max-w-[13rem]">
<audio controls class="m-auto mt-10">
<!-- need to add source, no audio at moment  -->

</audio>
