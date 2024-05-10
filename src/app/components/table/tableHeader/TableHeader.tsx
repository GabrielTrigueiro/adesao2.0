import { Button, IconButton, Tooltip, Typography } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

import {
  ActionLeftSection,
  ActionRightSection,
  ActionSection,
  Container,
  FilterSection,
} from "./styles";
import DefaultChipList from "app/components/chip/defaultChipList";
import theme from "core/theme/theme";

interface TableHeaderProps {
  mainActionLabel?: string;
  mainIcon?: any;
  mainActionFunction?: () => void;
  mainActionDisabled?: boolean;
  secondaryActionLabel?: string;
  secondaryActionFunction?: () => void;

  filterBtn?: boolean;
  filterBtnAction?: () => void;
  filter?: any;
  remove?: (fiter: string) => void;
  extraComponents?: any;
}

function TableHeader({
  mainActionFunction,
  mainActionLabel,
  extraComponents,
  filterBtn,
  filterBtnAction,
  secondaryActionFunction,
  secondaryActionLabel,
  filter,
  remove,
  mainActionDisabled,
  mainIcon,
}: Readonly<TableHeaderProps>) {
  return (
    <Container>
      <ActionSection>
        <ActionLeftSection>
          {filterBtn && filterBtnAction && (
            <Tooltip title="Filtros">
              <IconButton
                sx={{ width: 30, height: 30 }}
                onClick={() => filterBtnAction()}
              >
                <FilterListIcon
                  sx={{
                    fontSize: "20px",
                    color: theme.COLORS.BLUE3,
                  }}
                />
              </IconButton>
            </Tooltip>
          )}
          {extraComponents}
        </ActionLeftSection>
        <ActionRightSection>
          {secondaryActionLabel && secondaryActionFunction && (
            <Button onClick={() => secondaryActionFunction()}>
              {secondaryActionLabel}
            </Button>
          )}
          {!mainActionDisabled && (mainActionLabel && mainActionFunction) && (
            <IconButton
              sx={{
                display: 'flex',
                gap: 1,
                borderRadius: 1,
                '&:hover': {
                  borderRadius: 1,
                },
              }}
              onClick={() => mainActionFunction()}
              edge="start"
            >
              {mainIcon}
              <Typography color={theme.COLORS.BLUE3}>{mainActionLabel}</Typography>
            </IconButton>
          )}
        </ActionRightSection>
      </ActionSection>
      {
        filterBtn && filter && remove && (
          <FilterSection>
            <DefaultChipList filters={filter} onRemoveFitler={remove} />
          </FilterSection>
        )
      }
    </Container >
  );
}

export default TableHeader;
