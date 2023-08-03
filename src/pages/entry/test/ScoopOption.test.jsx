import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvnet from "@testing-library/user-event";
import ScoopOption from "../ScoopOption";

test("indicate if scoop count is non-int or out of range", async () => {
  const user = userEvnet.setup();
  render(<ScoopOption />);

  const vanillaInput = screen.getByRole("spinbutton");
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "-1");
  expect(vanillaInput).toHaveClass("is-invalid");

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "2.5");
  expect(vanillaInput).toHaveClass("is-invalid");

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "11");
  expect(vanillaInput).toHaveClass("is-invalid");

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "3");
  expect(vanillaInput).not.toHaveClass("is-invalid");
});
