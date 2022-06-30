<script lang="ts">
import { fetchUserStatus } from '../utils/api-request';

	import Header from '../components/Header.svelte';

    let isExistingUser:boolean = false;
    let isNewUser:boolean = false;

    interface Family {
        name: string,
    }

    interface User {
        email: string,
        fullName: string,
        displayName: string,
    }

    const user:User = {
        email: "",
        fullName: "",
        displayName: "",
    }

    const handleSubmit = async () => {
        const status = await fetchUserStatus(user.email)

        if(status === "not found"){
            isNewUser = true;
        }        
    }
    
</script>

<Header />
<h2 class="text-center font-Josefin text-4xl font-normal text-amber-100">Register</h2>

{#if !isExistingUser && !isNewUser}
<div class="flex justify-center">
    <form on:submit|preventDefault = {handleSubmit}> 
        <label for="email" class="text-amber-100 block">Email address</label>
        <input bind:value = {user.email} type="email" class="mb-6 rounded bg-amber-100 p-2" placeholder="owly@hootmail.com">
        <button type="submit" class="ml-36 rounded bg-[#b9f6ca] px-4 py-2">Register</button>
    </form>
</div>
{:else}
    {#if isNewUser}
        <p>Full Name</p>
        <p>Family nickname</p>
        <p>Setting up a family: choose family name</p>
    {/if}
{/if}

