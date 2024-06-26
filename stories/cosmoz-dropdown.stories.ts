import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from '@pionjs/pion';
import '../src';

const meta: Meta = {
	title: 'Cosmoz Dropdown',
	component: 'cosmoz-dropdown',
};

export default meta;

export type Story = StoryObj;

export const Dropdown: Story = {
	render: () => {
		return html`<cosmoz-dropdown>
			<div>Item 1</div>
			<div>Item 2</div>
			<div>Item 3</div>
			<div>Item 4</div>
			<div>Item 5</div>
			<button>Item 6</button>
		</cosmoz-dropdown>`;
	},
};

export const DropdownMenu: Story = {
	render: () => {
		return html`<cosmoz-dropdown-menu>
			<div>Item 1</div>
			<div>Item 2</div>
			<div>Item 3</div>
			<div>Item 4</div>
			<div>Item 5</div>
			<a href="#">Achor 1</a>
		</cosmoz-dropdown-menu>`;
	},
};

export const DropdownWithBug: Story = {
	render: () => {
		return html`<style>
				.wrapper-with-bug {
					position: relative;
					z-index: 2;
					width: 300px;
					height: 300px;
					top: 100px;
					left: 100px;
					margin: 0 auto;
					background-color: blueviolet;
					transform: translate3d(0, 0, 0);
				}
			</style>
			<div class="wrapper-with-bug">
				<cosmoz-dropdown>
					<div>Item 1</div>
					<div>Item 2</div>
					<div>Item 3</div>
					<div>Item 4</div>
					<div>Item 5</div>
				</cosmoz-dropdown>
			</div>`;
	},
};
