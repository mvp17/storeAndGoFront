import axios from 'axios';
import { derived } from 'svelte/store';
import { jwt } from './sessionStore';
import { baseURL } from '../environment';

export const http = derived(jwt, ($jwt, set) => {
	const instance = axios.create({
		baseURL: baseURL,
		headers: {
			Authorization: `Bearer ${$jwt}`
		}
	});

	set(instance);

	return () => {
		// Cleanup if needed
	};
});
