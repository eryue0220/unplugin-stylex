import { mount } from 'svelte';
import App from "./app.svelte";

const app = mount(App, { target: document.getElementById('app') as HTMLElement });

export default app;
