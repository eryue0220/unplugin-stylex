import { mount } from 'svelte';
import App from "./app.svelte";

const app = mount(App, { target: document.getElementById('root') as HTMLElement });

export default app;
