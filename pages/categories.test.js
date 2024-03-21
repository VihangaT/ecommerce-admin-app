import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Categories from "./categories";

test("should render Categories component", () => {
  render(<Categories />);
  const categoriesElement = screen.getByText(/Categories/i);
  expect(categoriesElement).toBeInTheDocument();
});

test("should fetch categories data and display them", async () => {
  const mockCategories = [
    { id: 1, name: "Electronics" },
    { id: 2, name: "Clothing" },
  ];

  jest.spyOn(axios, "get").mockResolvedValueOnce({ data: mockCategories });

  render(<Categories />);

  const categoriesElement = await screen.findByText(/Electronics/i);
  expect(categoriesElement).toBeInTheDocument();
});

test("should show success message when category is added", async () => {
  const mockCategory = { id: 3, name: "Books" };

  jest.spyOn(axios, "post").mockResolvedValueOnce({ data: mockCategory });

  render(<Categories />);

  const addCategoryButton = screen.getByRole("button", {
    name: /Add Category/i,
  });
  userEvent.click(addCategoryButton);

  const categoryNameInput = screen.getByLabelText(/Category Name/i);
  userEvent.type(categoryNameInput, "Books");

  const saveButton = screen.getByRole("button", { name: /Save/i });
  userEvent.click(saveButton);

  const successMessage = await screen.findByText(
    /Category added successfully/i
  );
  expect(successMessage).toBeInTheDocument();
});
