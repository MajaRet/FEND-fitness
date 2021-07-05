import { render, screen } from '@testing-library/react';

import ProgramHeader from '../ProgramHeader';

const program = {
  difficulty: 'beginner',
  duration: 6,
  id: 3,
  title: '50 Übungen mit 50kg Haar',
  focus: 'Kraft',
};

it('should render correctly', () => {
  render(<ProgramHeader program={program} />);

  //   expect(screen.getByText("50 Übungen mit 50kg Haar"));
  expect(screen.getByText(/50 ÜbuNgen mit 50kg Haar/i));
  expect(screen.getByRole('heading', { name: /50 ÜbuNgen mit 50kg Haar/i }));

  expect(screen.getByText(/Kraft/i));
  expect(screen.getByText(/Anfänger/i));
  expect(screen.getByText(/6 Wochen/i));
});
