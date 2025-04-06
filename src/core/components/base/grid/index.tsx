import { Grid as BaseGrid } from "antd";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";

export const Grid = BaseGrid;

Grid.useBreakpoint = useBreakpoint;

export { useBreakpoint };
