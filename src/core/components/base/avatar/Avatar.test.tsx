import { render, fireEvent } from "@testing-library/react";
import { Avatar } from "@/core/components/base";

beforeAll(() => {
  // Mocking window.matchMedia
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => vi.fn(), // Deprecated
      removeListener: () => vi.fn(), // Deprecated
      addEventListener: () => vi.fn(),
      removeEventListener: () => vi.fn(),
      dispatchEvent: () => false,
    }),
  });
});

describe("Avatar Component", () => {
  it("renders with default props", () => {
    render(<Avatar>U</Avatar>);
    const avatar = document.querySelector(".ant-avatar");

    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveTextContent("U");
  });

  it("renders with custom props", () => {
    render(<Avatar shape="square" size="large" />);
    const avatar = document.querySelector(".ant-avatar-square");

    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveClass("ant-avatar-lg");
  });

  it("renders with an image src", () => {
    render(<Avatar src="https://via.placeholder.com/150" alt="Avatar" />);
    const img = document.querySelector(".ant-avatar-image img");

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "https://via.placeholder.com/150");
    expect(img).toHaveAttribute("alt", "Avatar");
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();

    render(<Avatar onClick={handleClick}>U</Avatar>);
    const avatar = document.querySelector(".ant-avatar");

    fireEvent.click(avatar!);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("handles onError when image fails to load", () => {
    const handleError = vi.fn();

    render(
      <Avatar
        src="https://invalid-url.com/avatar.png"
        alt="Invalid Avatar"
        onError={handleError}
      />,
    );

    // Mocking image element
    const img = document.querySelector(".ant-avatar-image img");

    expect(img).toBeInTheDocument();

    // Simulate error manually
    if (img) {
      fireEvent(img, new Event("error"));
    }

    expect(handleError).toHaveBeenCalledTimes(1);
  });

  it("renders Avatar.Group", () => {
    render(
      <Avatar.Group>
        <Avatar>U1</Avatar>
        <Avatar>U2</Avatar>
      </Avatar.Group>,
    );
    const group = document.querySelector(".ant-avatar-group");

    expect(group).toBeInTheDocument();

    const avatars = group?.querySelectorAll(".ant-avatar");

    expect(avatars?.length).toBe(2);

    expect(avatars?.[0]).toHaveTextContent("U1");
    expect(avatars?.[1]).toHaveTextContent("U2");
  });
});
