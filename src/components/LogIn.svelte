<script lang="ts">
	import {
		onAuthStateChanged,
		signInWithEmailAndPassword,
		type UserCredential
	} from 'firebase/auth';
	import { auth } from '../utils/admin';
	import { userId } from '../store';

	export let userLoggedIn: boolean = false;
    let src:string = 'images/owl-logo.png';

	interface Credential {
		username: string;
		password: string;
	}

	const credential: Credential = {
		username: '',
		password: ''
	};

	onAuthStateChanged(auth, (user) => {
		if (user) {
			userLoggedIn = true;
		} else {
			userLoggedIn = false;
		}
	});

	const handleSubmit = async () => {
		try {
			const userCredential: UserCredential = await signInWithEmailAndPassword(
				auth,
				credential.username,
				credential.password
			);
			$userId = userCredential.user.uid;
		} catch (error) {
			console.error(error);
		}
	};
</script>

<h1 class="font-Amatic text-7xl text-amber-100 text-center mt-24">Read Me A Story</h1>
<img class="w-4/12 m-auto mt-4 mb-4" {src} alt="owly" />

<div class="flex justify-center">
    <form on:submit|preventDefault={handleSubmit} class="text-2xl">
        <label for="username" class="text-amber-100 block">Username:</label>
        <input type="text" id="username" bind:value={credential.username} required class="mb-4 bg-amber-100 rounded p-2" /><br />
        <label for="password" class="text-amber-100 block">Password:</label>
        <input type="password" id="password" bind:value={credential.password} required class="mb-6 bg-amber-100 rounded p-2"/><br />
        <button type="submit" class="rounded bg-[#b9f6ca] px-4 py-2 ml-36">Log in</button>
    </form>
</div>
