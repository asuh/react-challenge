import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import App from './App';

test('App Renders', async () => {
  const screen = render(<App />);
  const heading = screen.getByRole('heading', { name: /pokemon list/i });
  await expect.element(heading).toBeVisible();
});
