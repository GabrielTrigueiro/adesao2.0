import { useEffect, useState } from 'react'
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

import theme from 'core/theme/theme';
import { CircularProgress } from '@mui/material';

interface Props {
  onChange: any;
  searchPlaceHolder?: string;
  querrySearching?: boolean;
}

function Search({ onChange, searchPlaceHolder, querrySearching }: Readonly<Props>) {

  const [query, setQuery] = useState<string | undefined>();

  useEffect(() => {
    const timeOutId = setTimeout(() => onChange(query), 500);
    return () => clearTimeout(timeOutId);
  }, [onChange, query]);

  const clearSearch = () => {
    setQuery("");
    onChange("")
  }

  return (
    <SearchContainer>
      <SearchIcon
        sx={{
          color: theme.COLORS.BLUE3,
          width: 20,
          height: 20,
        }}
      />
      <SearchInput
        type="text"
        value={query}
        onChange={event => setQuery(event.target.value)}
        autoComplete="off"
        placeholder={searchPlaceHolder ?? "Pesquisar..."}
      />

      {querrySearching && query &&
        <div>
          <CircularProgress size={10} />
        </div>
      }

      {query &&
        <CloseIcon
          onClick={() => clearSearch()}
          sx={{
            color: theme.COLORS.BLACK,
            width: 20,
            height: 20,
            cursor: 'pointer',
            ":hover": {
              color: theme.COLORS.BLUE2
            }
          }}
        />
      }
    </SearchContainer>
  )
}

export default Search

const SearchContainer = styled.div`
  background-color: ${({ theme }) => theme.COLORS.GRAY7};
  border: 2px solid ${({ theme }) => theme.COLORS.GRAY6};
  border-radius: 5px;
  height: min-content;
  width: 190px;
  padding: 2px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  &:hover {
    background-color: ${({ theme }) => theme.COLORS.GRAY6};
    border: 2px solid ${({ theme }) => theme.COLORS.BLUE3};
  }
`

const SearchInput = styled.input`
  width: 100%;
  border-color: transparent;
  background-color: transparent;
  outline-style: none;
`;