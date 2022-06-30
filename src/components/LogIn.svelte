<script lang="ts">
	import {
        onAuthStateChanged,
		signInWithEmailAndPassword,
		type UserCredential
	} from 'firebase/auth';
	import { auth } from '../utils/admin';
    import {userId} from '../store'

    export let userLoggedIn:boolean = false;

	interface Credential {
		username: string;
		password: string;
	}

	const credential: Credential = {
		username: '',
		password: ''
	};

    onAuthStateChanged(auth, (user) => {
        if(user) {
            userLoggedIn = true;
        } else {
            userLoggedIn = false;
        }
    })

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

<form on:submit|preventDefault={handleSubmit}>
	<label for="username" class="text-amber-100">Username:</label>
	<input type="text" id="username" bind:value={credential.username} required class="mb-6" /><br />
	<label for="password" class="text-amber-100">Password:</label>
	<input type="password" id="password" bind:value={credential.password} required /><br />
	<button type="submit" class="mx-1.5 my-4 rounded bg-[#b9f6ca] px-3 py-1">Log in</button>
</form>
