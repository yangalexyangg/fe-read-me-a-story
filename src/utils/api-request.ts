import axios from 'axios';

const apiCall = axios.create({ baseURL: 'http://127.0.0.1:5000' });

export const fetchStories = () => {
	return apiCall.get('/stories').then((res) => {
		return res.data;
	});
};

export const postStory = (story: any) => {
	return apiCall.post('/stories', story);
};
