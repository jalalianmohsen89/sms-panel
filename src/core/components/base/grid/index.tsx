import { default as BaseGrid } from "antd/es/grid";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";

export const Grid = BaseGrid;

Grid.useBreakpoint = useBreakpoint;

export { useBreakpoint };
