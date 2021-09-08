import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ListHeader from '../../src/components/ListHeader';

const clickHandler = jest.fn();

describe('ListHeader', () => {
    test('render and click on button', () => {
        const headerText = 'header';
        const buttonText = 'Button text';
        const { asFragment } = render(
            <ListHeader title={headerText} buttonText={buttonText} onButtonClick={clickHandler} />
        );

        expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <h2
    class="header"
  >
    header
    <button
      class="btn btn-outline-dark"
      type="button"
    >
      Button text
    </button>
  </h2>
</DocumentFragment>
`);

        const button = screen.getByText(buttonText);
        fireEvent.click(button);
        expect(clickHandler).toHaveBeenCalled();
    });
});
