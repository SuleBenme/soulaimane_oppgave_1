import { render, screen, userEvent, fireEvent } from "@testing-library/react";
import App from "./App";

test("Få feil melding hvis passordene er ikke like", () => {
  render(<App />);
  fireEvent.change(screen.getByTestId("passord"), {
    target: { value: "new" },
  });
  fireEvent.change(screen.getByTestId("gjentaPassord"), {
    target: { value: "new value" },
  });
  fireEvent.click(screen.getByTestId("submit"));
  expect(screen.getByTestId("feilGjentaPassord")).toHaveTextContent(
    "Passordene må være like"
  );
});

test("Ikke få feil melding hvis passordene er like", () => {
  render(<App />);
  fireEvent.change(screen.getByTestId("passord"), {
    target: { value: "hello343" },
  });
  fireEvent.change(screen.getByTestId("gjentaPassord"), {
    target: { value: "hello343" },
  });
  fireEvent.click(screen.getByTestId("submit"));
  expect(screen.getByTestId("feilGjentaPassord")).toHaveTextContent("");
});
