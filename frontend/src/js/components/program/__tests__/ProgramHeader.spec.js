import { render, screen } from "@testing-library/react";

import ProgramHeader from "../ProgramHeader";

const program = {
  difficulty: "Leicht",
  duration: 40,
  id: 3,
  status: "completed",
  title: "50 Übungen mit 50kg Haar",
  type: "Kraft",
};

it("should render correctly", () => {
  render(<ProgramHeader program={program} />);

  //   expect(screen.getByText("50 Übungen mit 50kg Haar"));
  expect(screen.getByText(/50 ÜbuNgen mit 50kg Haar/i));
  expect(screen.getByRole("heading", { name: /50 ÜbuNgen mit 50kg Haar/i }));

  expect(screen.getByText(/Kraft/i));
  expect(screen.getByText(/Leicht/i));
  expect(screen.getByText(/6 Wochen/i));
});
