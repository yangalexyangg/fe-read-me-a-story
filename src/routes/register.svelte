<script lang="ts">
	import { createNewUserAndFamily, fetchUserStatus } from '../utils/api-request';
	import { page } from '$app/stores';
	import { userId, familyId } from '../store';

	let src = '/images/owl-logo.png';
	

	let isInvitedUser: boolean = false;
	let isNewUser: boolean = false;
	let accountCreated: boolean = false;
	let error: boolean = false;
	let isAlreadyRegistered: boolean = false;

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
		const response = await fetchUserStatus(user.email);

		if (response.new_user === 'new user') {
			isNewUser = true;
		} else if (response.isInvited === false) {
			isAlreadyRegistered = true;
		} else {
			isInvitedUser = true;
		}

		if (response.resUserId) {
			userId.set(response.resUserId);
		}

		if (response.resFamilyId) {
			familyId.set(response.resFamilyId);
		}
	};

	const handleRegister = async () => {
		//needs updating on the basis of backend patch request
		try {
			const response = await createNewUserAndFamily(
				user.email,
				user.fullName,
				user.displayName,
				user.password,
				family.familyName
			);
			accountCreated = true;
			isNewUser = false;
			familyId.set(response);
		} catch (error) {
			error = true;
		}
	};
</script>

<header class="mb-16">
	<a href="/">
		<div class="flex items-center p-4">
			<img class="w-3/12" {src} alt="owly" />
			<h1 class="font-Amatic text-6xl text-amber-100">Read Me A Story</h1>
		</div>
	</a>
</header>

{#if isAlreadyRegistered}
	<p class="text-center font-Josefin text-4xl font-normal text-amber-100">
		You are already registered
	</p>
	<a
		class:active={$page.url.pathname === '/'}
		sveltekit:prefetch
		href="/"
		class="underline decoration-amber-100 decoration-solid decoration-2 underline-offset-4"
		><p class="text-center font-Josefin font-normal text-amber-100 mt-4">Log in?</p></a
	>
{/if}

{#if error}
	<p class="text-center font-Josefin text-4xl font-normal text-amber-100">
		There was an error please try again
	</p>
	<a
		class:active={$page.url.pathname === '/register'}
		sveltekit:prefetch
		href="/register"
		class="underline decoration-amber-100 decoration-solid decoration-2 underline-offset-4"
		><p class="text-center font-Josefin font-normal text-amber-100">Try again?</p></a
	>
{/if}

{#if accountCreated}
	<p class="text-center font-Josefin text-4xl font-normal text-amber-100">
		Your account has been created and you have been logged in!
	</p>
	<a
		class:active={$page.url.pathname === '/'}
		sveltekit:prefetch
		href="/"
		class="underline decoration-amber-100 decoration-solid decoration-2 underline-offset-4"
		><p class="text-center font-Josefin font-normal text-amber-100">Continue</p></a
	>
{/if}

{#if !accountCreated && !isInvitedUser && !isNewUser && !isAlreadyRegistered}
	<h2 class="text-center font-Josefin text-4xl font-normal text-amber-100">Register</h2>
	<p class="text-center text-amber-100 mx-4 mt-2">Register now to create your account and start sharing stories with your family.</p>

	<form on:submit|preventDefault={handleSubmit} class="m-auto pt-4 text-center">
		<label for="email" class="block text-amber-100">Email address</label>
		<input
			bind:value={user.email}
			type="email"
			class="mb-4 rounded bg-amber-100 p-2"
			placeholder="owly@hootmail.com"
		/>
		<button type="submit" class="m-auto block rounded bg-[#b9f6ca] px-4 py-2">Register</button>
	</form>
{:else if isNewUser || isInvitedUser}
	{#if isInvitedUser}
		<p class="mx-1 text-center text-amber-100">
			You've been invited by your family! Please fill in these details to create your account.
		</p>
	{/if}

	{#if isNewUser}
		<p class="mx-1 text-center text-amber-100">Please fill in these details to create an account</p>
	{/if}

	<form on:submit|preventDefault={handleRegister} class="m-auto pt-4 text-center">
		<label for="fullName" class="text-amber-100">Full name</label><br />
		<input
			bind:value={user.fullName}
			type="text"
			class="mb-4 rounded bg-amber-100 p-2"
			required
		/><br />
		<label for="nickname" class="text-amber-100">Your role</label><br />
		<input
			bind:value={user.displayName}
			type="text"
			placeholder="Grampy"
			class="mb-4 rounded bg-amber-100 p-2"
			required
		/><br />

		{#if isNewUser}
			<label for="familyName" class="text-amber-100">Your family's name</label><br />
			<input
				bind:value={family.familyName}
				type="text"
				placeholder="Hamilton Family"
				class="mb-4 rounded bg-amber-100 p-2"
				required
			/><br />
		{/if}

		<label for="password" class="text-amber-100">Password</label><br />
		<input bind:value={user.password} type="password" class="mb-4 rounded bg-amber-100 p-2" /><br />
		<button type="submit" class="rounded bg-[#b9f6ca] px-4 py-2 text-black">Register</button>
	</form>
{/if}
