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
	<p class="block text-center text-amber-100">User was invited!</p>
	<button class="ml-36 rounded bg-[#b9f6ca] px-4 py-2" on:click={inviteAgain}
		>Invite another user?</button
	>
{:else if isError}
	<p class="my-4 block text-center text-amber-100">
		There was an error trying to invite your family member!
	</p>
	<button
		class="delay-5 m-auto block rounded bg-[#b9f6ca] px-4 py-2 transition duration-100 ease-in-out hover:-translate-y-1 hover:scale-95 hover:bg-indigo-500"
		on:click={inviteAgain}>Try again?</button
	>
{:else}
	<form class="p-2 text-center" on:submit|preventDefault={handleSubmit}>
		<label class="block p-2 text-center text-amber-100" for="email">Enter email</label>
		<input
			class="mb-6 rounded bg-amber-100 p-2"
			bind:value={email}
			type="email"
			id="email"
			placeholder="owly@hootmail.com"
			required
		/>
		<button
			class="delay-5 m-auto block rounded bg-[#b9f6ca] px-4 py-2 transition duration-100 ease-in-out hover:-translate-y-1 hover:scale-95 hover:bg-indigo-500"
			type="submit">Invite!</button
		>
	</form>
{/if}
