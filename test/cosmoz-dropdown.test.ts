import '../src/cosmoz-dropdown';
import { expect, html, fixture, nextFrame, aTimeout } from '@open-wc/testing';

describe('cosmoz-dropdown', () => {
	it('render', async () => {
		const el = await fixture(
			html`<cosmoz-dropdown><a href="#">Test</a></cosmoz-dropdown>`,
		);
		el.shadowRoot!.querySelector<HTMLButtonElement>('button')!.focus();
		await nextFrame();
		expect(el.shadowRoot!.querySelector('cosmoz-dropdown-content')).to.be.ok;
	});

	it('should auto-close when clicking on dropdown items', async () => {
		const el = await fixture(
			html`<cosmoz-dropdown>
				<div id="item1">Item 1</div>
				<div id="item2">Item 2</div>
				<button id="item3">Item 3</button>
			</cosmoz-dropdown>`,
		);

		// Open the dropdown
		const button = el.shadowRoot!.querySelector<HTMLButtonElement>('button')!;
		button.click();
		await nextFrame();

		// Verify dropdown is open
		const content = el.shadowRoot!.querySelector('cosmoz-dropdown-content');
		expect(content).to.be.ok;

		// Click on a dropdown item
		const item1 = el.querySelector('#item1') as HTMLElement;
		expect(item1).to.be.ok;
		item1.click();

		// Wait for the dropdown to close
		await aTimeout(50);
		await nextFrame();

		// Verify dropdown is closed
		const contentAfterClick = el.shadowRoot!.querySelector(
			'cosmoz-dropdown-content',
		);
		expect(contentAfterClick).to.be.null;
	});

	it('should handle anchor tags', async () => {
		const el = await fixture(
			html`<cosmoz-dropdown>
				<a href="#" id="anchor-item">Anchor Item</a>
				<div id="div-item">Div Item</div>
			</cosmoz-dropdown>`,
		);

		// Open the dropdown
		const button = el.shadowRoot!.querySelector<HTMLButtonElement>('button')!;
		button.click();
		await nextFrame();

		// Verify dropdown is open
		expect(el.shadowRoot!.querySelector('cosmoz-dropdown-content')).to.be.ok;

		// Click on anchor element in dropdown
		const anchorItem = el.querySelector('#anchor-item') as HTMLAnchorElement;
		anchorItem.click();

		// Wait for the dropdown to close
		await aTimeout(50);
		await nextFrame();

		// Verify dropdown is closed
		expect(el.shadowRoot!.querySelector('cosmoz-dropdown-content')).to.be.null;
	});

	it('should not require double-click to re-open after auto-close', async () => {
		const el = await fixture(
			html`<cosmoz-dropdown>
				<div id="item1">Item 1</div>
				<div id="item2">Item 2</div>
			</cosmoz-dropdown>`,
		);

		const button = el.shadowRoot!.querySelector<HTMLButtonElement>('button')!;

		// First interaction: open dropdown by clicking
		button.click();
		await nextFrame();
		expect(el.shadowRoot!.querySelector('cosmoz-dropdown-content')).to.be.ok;

		// Click on item to auto-close
		const item1 = el.querySelector('#item1') as HTMLElement;
		item1.click();
		await aTimeout(50);
		await nextFrame();
		expect(el.shadowRoot!.querySelector('cosmoz-dropdown-content')).to.be.null;

		// Second interaction: click button again - should open immediately (not require double-click)
		button.click();
		await nextFrame();

		// Verify dropdown opens on first click after auto-close
		expect(el.shadowRoot!.querySelector('cosmoz-dropdown-content')).to.be.ok;
	});
});
