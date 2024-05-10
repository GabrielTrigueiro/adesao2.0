import { Typography, TextField } from "@mui/material";
import { FiltersPartition, Section, TitleSection, IconSection } from "./styles";
import SearchIcon from "@mui/icons-material/Search";
import BackspaceIcon from "@mui/icons-material/Backspace";
import SourceOutlinedIcon from "@mui/icons-material/SourceOutlined";
import ContentPasteSearchOutlinedIcon from "@mui/icons-material/ContentPasteSearchOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

function SearchFilters() {
  return (
    <FiltersPartition>
      <Section>
        <TitleSection>
          <SourceOutlinedIcon fontSize="large" />
          <Typography fontWeight={"bold"}>CPF/CNPJ</Typography>
        </TitleSection>
        <TextField variant="standard" />
      </Section>
      <Section>
        <TitleSection>
          <SourceOutlinedIcon fontSize="large" />
          <Typography fontWeight={"bold"}>NOME</Typography>
        </TitleSection>
        <TextField variant="standard" />
      </Section>
      <Section>
        <TitleSection>
          <ContentPasteSearchOutlinedIcon fontSize="large" />
          <Typography fontWeight={"bold"}>SITUAÇÕES</Typography>
        </TitleSection>
        <TextField variant="standard" />
      </Section>
      <Section>
        <TitleSection>
          <ModeEditOutlineOutlinedIcon fontSize="large" />
          <Typography fontWeight={"bold"}>CÓD. INDICAÇÃO</Typography>
        </TitleSection>
        <TextField variant="standard" />
      </Section>
      <IconSection>
        <BackspaceIcon
          sx={{
            ":hover": {
              color: (theme) => theme.palette.primary.main,
            },
            cursor: "pointer",
          }}
          fontSize="large"
        />
        <SearchIcon
          sx={{
            ":hover": {
              color: (theme) => theme.palette.primary.main,
            },
            cursor: "pointer",
          }}
          fontSize="large"
        />
      </IconSection>
    </FiltersPartition>
  );
}

export default SearchFilters;

