<script>
	import { Card } from 'flowbite-svelte';
	import AuthGuard from './signin/AuthGuard.svelte';
	import { page } from '$app/stores';
</script>

<AuthGuard>
	<span slot="authed">
		<div class="grid md:grid-cols-2">
			<Card href="/warehouse">
				<p class="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
					Warehouse
				</p>
			</Card>
			<Card href="/offices">
				<p class="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Offices</p>
			</Card>
		</div>
	</span>
</AuthGuard>

<AuthGuard>
	<span slot="not_authed">
		<nav>
			<svg viewBox="0 0 2 3" aria-hidden="true">
				<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
			</svg>
			<ul>
				<li aria-current={$page.url.pathname === '/signup' ? 'page' : undefined}>
					<a href="/signup">Sign up</a>
				</li>
				<li aria-current={$page.url.pathname === '/signin' ? 'page' : undefined}>
					<a href="/signin">Sign in</a>
				</li>
			</ul>
			<svg viewBox="0 0 2 3" aria-hidden="true">
				<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
			</svg>
		</nav>
	</span>
</AuthGuard>

<style>
	nav {
		display: flex;
		justify-content: center;
		--background: rgba(255, 255, 255, 0.7);
	}

	svg {
		width: 2em;
		height: 3em;
		display: block;
	}

	path {
		fill: var(--background);
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li[aria-current='page']::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--color-theme-1);
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--color-theme-1);
	}
</style>
