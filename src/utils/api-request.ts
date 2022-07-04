import { createUserWithEmailAndPassword, type UserCredential } from 'firebase/auth';
import { auth } from './admin';
import { userId, familyId } from '../store';
import axios from 'axios';

const apiCall = axios.create({ baseURL: 'http://127.0.0.1:5000' });

export const fetchStories = (familyId: string) => {
	return apiCall.get(`/stories/${familyId}`).then((res) => {
		return res.data;
	});
};

export const fetchStory = (storyId: string) => {
	return apiCall.get(`/stories/${storyId}`).then((res) => {
		return res.data;
	});
};

export const postStory = (story: any) => {
	return apiCall.post('/stories', story).then((res) => {
		return res.data;
	});
};

export const fetchUserStatus = async (email: string) => {
	//this needs to return user id - and return family name
	let isInvited: boolean = false;
	let familyId: string = '';
	let userId: string = '';

	try {
		const { data } = await apiCall.get(`/users/email/${email}`);
		userId = Object.keys(data)[0];
		familyId = Object.keys(data[userId]['families'])[0];
		isInvited = data[userId]['invited'];
		if (isInvited) {
			return 'invited';
		} else {
			return 'registered';
		}
	} catch (error: any) {
		return 'new user';
	}
};

export const createNewUserAndFamily = async (
	email: string,
	fullName: string,
	displayName: string,
	password: string,
	familyName: string
) => {
	try {
		//create user directly in Firebase database
		const userCredential: UserCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);

		// save user data via python api to Firebase database
		interface User {
			email: string;
			fullName: string;
			displayName: string;
			familyName: string;
			userId: string;
		}

		const user: User = {
			email: email,
			fullName: fullName,
			displayName: displayName,
			familyName: familyName,
			userId: userCredential.user.uid
		};

		const postUserToDatabase = await apiCall.post('/users', user);

		return postUserToDatabase.data.family_id;
	} catch (error) {
		console.error(error);
		// temp rejecting until api endpoint is available (ask andy if this doesn't make sense)
		return Promise.reject();
	}
};

export const inviteUser = async (email: string, familyId: string) => {
	// may need to check if user has already been invited(?)
	// POST to /users
	// should create a new user and store the family id + store the user in the families object

	// temporary return
	return Promise.resolve({
		uid: email
	});
};
