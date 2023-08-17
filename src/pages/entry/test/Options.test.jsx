import { render, screen } from "../../../test-utils/testing-library-utils";
import Options from "../Options";
import userEvent from "@testing-library/user-event";

test("displays image for each scoop option from server", async () => {
  render(<Options optionType={"scoops"} />);

  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  const altText = scoopImages.map((el) => el.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("Display image for each toppings option from server", async () => {
  render(<Options optionType="toppings" />);

  const images = await screen.findAllByRole("img", { name: /topping$/i });
  expect(images).toHaveLength(3);

  const imageTitle = images.map((img) => img.alt);
  expect(imageTitle).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping",
  ]);
});

test("don't update total if scoops input is invalid", async () => {
  const user = userEvent.setup();
  render(<Options optionType={"scoops"} />);
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });

  const scoopsSubtotal = screen.getByText("Scoops total: $0.00");
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "2.5");
  expect(scoopsSubtotal).toHaveTextContent("$0.00");

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "-1");
  expect(scoopsSubtotal).toHaveTextContent("$0.00");

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "100");
  expect(scoopsSubtotal).toHaveTextContent("$0.00");
});
