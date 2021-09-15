import React from 'react';
import { render, screen } from '@testing-library/react';
import { Difficulty, Program } from '../../../../types/ProgramTypes';

import ProgramHeader from '../ProgramHeader';

const program: Program = {
  _id: 'program_id',
  difficulty: 'beginner' as Difficulty,
  duration: 6,
  title: '50 Übungen mit 50kg Haar',
  focus: 'Kraft',
  isActive: false,
  isCompleted: false,
  currentWorkout: null,
  description: 'Beschreibung hier',
  workouts: [],
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
