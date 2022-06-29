<script lang="ts">
    export let bookTitle:string;
    let src = 'images/book.png';

</script>

<h2 class="font-Josefin text-amber-100 text-4xl font-normal text-center">{bookTitle}</h2>
<img {src} alt={bookTitle} class=" m-auto mt-4 mb-4 max-w-[13rem]">
<audio controls class="m-auto mt-10">
<!-- need to add source dynamically  -->
<source src="https://firebasestorage.googleapis.com/v0/b/read-me-a-story-18a8d.appspot.com/o/recordings%2Frecording-1656426424469.ogg?alt=media&token=67acd67e-8314-4ea9-b91c-872fe76f6741"/>
</audio>
