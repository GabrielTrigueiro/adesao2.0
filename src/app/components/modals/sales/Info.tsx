import React from "react";
import { InfoColumn, InfoRow } from "./styles";
import { Typography } from "@mui/material";

export interface Item {
  value: string | number;
}

export interface ItemColumn {
  title?: string;
  items: Item[];
}

interface InfoProps {
  startIcon?: React.ReactNode;
  column: ItemColumn[];
  endMenu?: React.ReactNode;
  isPix?: boolean;
}

const Info = (props: InfoProps) => {
  const indexDashItem = props.column.findIndex((col) => col.title === "--");

  return (
    <InfoRow $PIX={props.isPix}>
      <div style={{ display: "flex", alignItems: "center" }}>
        {props.startIcon}
        {indexDashItem !== -1 && (
          <InfoColumn>
            {props.column[indexDashItem].items.map((item, index) => (
              <div key={index}>
                <Typography fontSize={"80%"} fontWeight={"bold"}>{item.value}</Typography>
              </div>
            ))}
          </InfoColumn>
        )}
      </div>

      {props.column.map((column, index) => (
        index !== indexDashItem && (
          <InfoColumn key={index}>
            {column.title && (
              <Typography fontWeight={"bold"}>{column.title}</Typography>
            )}
            {column.items.map((item, index) => (
              <div key={index}>
                <Typography fontSize={"80%"}>{item.value}</Typography>
              </div>
            ))}
          </InfoColumn>
        )
      ))}

      {props.endMenu && props.endMenu}
    </InfoRow>
  );
};

export default Info;
