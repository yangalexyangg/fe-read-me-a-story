<script lang="ts">
	import { createNewUserAndFamily, fetchUserStatus } from '../utils/api-request';
	import { page } from '$app/stores';
	import { userId, familyId } from '../store';

	import Header from '../components/Header.svelte';

	let isExistingUser: boolean = false;
	let isNewUser: boolean = false;
	let accountCreated: boolean = false;

	interface Family {
		familyName: string;
	}

	const family: Family = {
		familyName: ''
	};

	interface User {
		email: string;
		fullName: string;
		displayName: string;
		password: string;
	}

	const user: User = {
		email: '',
		fullName: '',
		displayName: '',
		password: ''
	};

	const handleSubmit = async () => {
		const status = await fetchUserStatus(user.email);

		if (status === 'not found') {
			isNewUser = true;
		}
	};

	const handleRegister = async () => {
		//call to faked api call in api-requests
		try {
			const { uid, fid } = await createNewUserAndFamily(
				user.email,
				user.fullName,
				user.displayName,
				user.password,
				family.familyName
			);
			accountCreated = true;
			isNewUser = false;

			userId.set(uid);
			familyId.set(fid);
		} catch (error) {
			console.error(error);
		}
	};
</script>

<Header />

{#if accountCreated}
	<h2>Your account has been created and you have been logged in!</h2>
	<a
		class:active={$page.url.pathname === '/'}
		sveltekit:prefetch
		href="/"
		class="underline decoration-amber-100 decoration-solid decoration-2 underline-offset-4"
		><p class="text-center font-Josefin font-normal text-amber-100">Go to homepage</p></a
	>
{/if}

{#if !accountCreated && !isExistingUser && !isNewUser}
	<h2 class="text-center font-Josefin text-4xl font-normal text-amber-100">Register</h2>

	<div class="flex justify-center">
		<form on:submit|preventDefault={handleSubmit}>
			<label for="email" class="block text-amber-100">Email address</label>
			<input
				bind:value={user.email}
				type="email"
				class="mb-6 rounded bg-amber-100 p-2"
				placeholder="owly@hootmail.com"
			/>
			<button type="submit" class="ml-36 rounded bg-[#b9f6ca] px-4 py-2">Register</button>
		</form>
	</div>
{:else if isNewUser}
	<p class="text-amber-100">Please fill in these details to create a new account</p>
	<form on:submit|preventDefault={handleRegister}>
		<label for="fullName">Full name</label><br />
		<input
			bind:value={user.fullName}
			type="text"
			class="mb-6 rounded bg-amber-100 p-2"
			required
		/><br />
		<label for="nickname">Your role</label><br />
		<input
			bind:value={user.displayName}
			type="text"
			placeholder="Grampy"
			class="mb-6 rounded bg-amber-100 p-2"
			required
		/><br />
		<label for="familyName">Your family's name</label><br />
		<input
			bind:value={family.familyName}
			type="text"
			placeholder="Hamilton Family"
			class="mb-6 rounded bg-amber-100 p-2"
			required
		/><br />
		<label for="password">Password</label><br />
		<input bind:value={user.password} type="password" class="mb-6 rounded bg-amber-100 p-2" /><br />
		<button type="submit" class="ml-36 rounded bg-[#b9f6ca] px-4 py-2 text-black">Register</button>
	</form>
{/if}
