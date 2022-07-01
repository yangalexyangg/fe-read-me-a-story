<script lang="ts">
	import { inviteUser } from '../utils/api-request';
	import { familyId } from '../store';

	let email: string = '';
	let userInvited: boolean = false;

	const handleSubmit = async () => {
		const { uid } = await inviteUser(email, $familyId);
		userInvited = true;
	};

	const inviteAgain = async () => {
		email = '';
		userInvited = false;
	};
</script>

<h2>Invite family members</h2>

{#if userInvited}
	<p>User was invited!</p>
	<button on:click={inviteAgain}>Invite another user?</button>
{:else}
	<form on:submit|preventDefault={handleSubmit}>
		<label for="email">Enter email</label>
		<input bind:value={email} type="email" id="email" required />
		<button type="submit">Invite!</button>
	</form>
{/if}
