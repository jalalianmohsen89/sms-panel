import { render } from "@testing-library/react";
import { Typography } from "@/core/components/base/typography";

describe("Typography Component", () => {
  describe("Text", () => {
    it("renders basic text correctly", () => {
      const { container } = render(
        <Typography.Text>Sample Text</Typography.Text>,
      );

      expect(container.firstChild).toHaveClass("ant-typography");
      expect(container.firstChild).toHaveTextContent("Sample Text");
    });

    it("renders with different types", () => {
      const types = ["secondary", "success", "warning", "danger"] as const;

      types.forEach((type) => {
        const { container } = render(
          <Typography.Text type={type}>Text</Typography.Text>,
        );

        expect(container.firstChild).toHaveClass(`ant-typography-${type}`);
      });
    });

    it("renders with disabled state", () => {
      const { container } = render(
        <Typography.Text
          disabled
          className="custom-class"
          style={{ color: "red" }}
        >
          Disabled
        </Typography.Text>,
      );

      expect(container.firstChild).toHaveClass("ant-typography-disabled");
    });
  });

  describe("Title", () => {
    it("renders with different levels", () => {
      ([1, 2, 3, 4, 5] as const).forEach((level) => {
        const { container } = render(
          <Typography.Title level={level}>Title {level}</Typography.Title>,
        );

        expect(container.firstChild?.nodeName.toLowerCase()).toBe(`h${level}`);
        expect(container.firstChild).toHaveClass("ant-typography");
      });
    });

    it("applies custom className and style", () => {
      const { container } = render(
        <Typography.Title
          level={1}
          className="custom-class"
          style={{ color: "red" }}
        >
          Custom Title
        </Typography.Title>,
      );

      expect(container.firstChild).toHaveClass("custom-class");
      expect(container.firstChild).toHaveStyle({ color: "rgb(255, 0, 0)" });
    });
  });

  describe("Paragraph", () => {
    it("renders paragraph correctly", () => {
      const { container } = render(
        <Typography.Paragraph>Test Paragraph</Typography.Paragraph>,
      );

      expect(container.firstChild?.nodeName.toLowerCase()).toBe("div");
      expect(container.firstChild).toHaveClass("ant-typography");
    });

    it("applies custom props", () => {
      const { container } = render(
        <Typography.Paragraph
          type="warning"
          className="custom-paragraph"
          style={{ marginBottom: "20px" }}
        >
          Warning Paragraph
        </Typography.Paragraph>,
      );

      expect(container.firstChild).toHaveClass("ant-typography-warning");
      expect(container.firstChild).toHaveClass("custom-paragraph");
      expect(container.firstChild).toHaveStyle({ marginBottom: "20px" });
    });
  });
});
