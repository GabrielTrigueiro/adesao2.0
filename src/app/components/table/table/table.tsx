import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";
import { IPropsDataTable, ITableHeadCell } from "../../../../core/models/table";
import StyledTableHead from "../tableHead/tableHead";
import {
  formatCurrency,
  formatDateBr,
  formatDocument,
} from "core/utils/globalFunctions";
import theme from "theme";
import { FiberManualRecord } from "@mui/icons-material";

interface ITableRowProps {
  row: Record<string, any>;
  head: ITableHeadCell[];
  menu?: JSX.Element;
}

export const StyledCircle = styled(FiberManualRecord)<{ isActive: boolean }>(
  ({ isActive }) => ({
    color: isActive ? "#83e509" : "#ff000080",
    fontSize: 30,
  })
);

const renderCellContent = (item: any, row: Record<string, any>) => {
  switch (item.name) {
    case "cpforcnpj":
      return formatDocument(row[item.name]);
    case "createdAt":
      return formatDateBr(row[item.name]);
    case "created_at":
      return formatDateBr(row[item.name]);
    case "value":
      return `R$ ${formatCurrency(row[item.name])}`;
    case "isActive":
      return <StyledCircle isActive={row[item.name]} />;
    default:
      return row[item.name];
  }
};

const DynamicTableRow: React.FC<ITableRowProps> = ({ row, head, menu }) => (
  <TableRow key={row.id}>
    {head.map((item) => (
      <TableCell key={item.name} align={item.align || "left"}>
        {item.name === "action" && menu ? (
          <>{menu}</>
        ) : (
          renderCellContent(item, row)
        )}
      </TableCell>
    ))}
  </TableRow>
);

export default function DataTable(props: IPropsDataTable) {
  const rows = props.data;
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {}, [rows]);

  function handleSort(value: string) {
    if (value !== undefined) {
      if (props.orderBy === value) {
        props.order === "asc" ? props.setOrder("desc") : props.setOrder("asc");
      } else {
        props.setOrder("asc");
        props.setOrderBy(value);
      }
    }
  }

  return (
    <Table stickyHeader>
      <StyledTableHead
        head={props.head}
        orderBy={props.orderBy}
        order={props.order}
        onRequestSort={handleSort}
      />
      <TableBody>
        {rows ? (
          rows.map((row) => (
            <DynamicTableRow
              key={row.id}
              row={row}
              head={props.head}
              menu={props.menu}
            />
          ))
        ) : (
          <Typography m="auto">Nenhum resultado encontrado</Typography>
        )}
      </TableBody>
    </Table>
  );
}
