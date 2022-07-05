<script lang="ts">
	import { inviteUser } from '../utils/api-request';
	import { familyId } from '../store';

	let email: string = '';
	let userInvited: boolean = false;
	let isError: boolean = false;

	const handleSubmit = async () => {
		try {
			await inviteUser(email, $familyId);
			userInvited = true;
		} catch (error) {
			isError = true;
		}
	};

	const inviteAgain = async () => {
		email = '';
		userInvited = false;
		isError = false;
	};
</script>

<h2 class="text-center font-Josefin text-4xl font-normal text-amber-100">Invite family members</h2>
{#if userInvited}
	<p class="block text-amber-100 text-center" >User was invited!</p>
	<button class="ml-36 rounded bg-[#b9f6ca] px-4 py-2" on:click={inviteAgain}
		>Invite another user?</button
	>
{:else if isError}
	<p class="block text-amber-100 text-center">There was an error trying to invite your family member!</p>
	<button class="ml-36 rounded bg-[#b9f6ca] px-4 py-2" on:click={inviteAgain}>Try again?</button>
{:else}

	<form class="text-center p-2" on:submit|preventDefault={handleSubmit}>
		<label class="block text-amber-100 text-center p-2" for="email">Enter email</label>
		<input
			class="mb-6 rounded bg-amber-100 p-2"
			bind:value={email}
			type="email"
			id="email"
			placeholder="owly@hootmail.com"
			required
		/>
		<button class="ml-36 rounded bg-[#b9f6ca] px-4 py-2" type="submit">Invite!</button>
	</form>
{/if}