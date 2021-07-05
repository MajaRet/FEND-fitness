import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CloseButton from '../CloseButton';

it('should render correctly', () => {
  render(<CloseButton />);

  expect(screen.getByRole('button'));
});

it('should handle clicks correctly', async () => {
  const mockFunction = jest.fn();

  render(<CloseButton onClick={mockFunction} />);

  expect(mockFunction).not.toHaveBeenCalled();
  userEvent.click(screen.getByRole('button'));
  expect(mockFunction).toHaveBeenCalledTimes(1);
});
