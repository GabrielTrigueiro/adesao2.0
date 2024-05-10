import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import {
  Box, useMediaQuery, IconButton,
  Typography,
  Menu,
  Avatar,
  Tooltip,
  MenuItem
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "core/hooks/reduxHooks";
import { logout } from "core/redux/slices/authSlice";
import { NavBarBox, StyledAppBar, StyledToolBar, TypographyNav, UserMenu } from "./styles";
import PositivoTheme from "theme";
import useSideBarHook from "core/hooks/sideBarHook";
import theme from "core/theme/theme";

function Navbar() {
  const navigate = useNavigate();

  // * get user infos
  const dispatch = useAppDispatch();
  const basicUserInfo = useAppSelector((state) => state.auth.userInfo);

  // * menu states
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  // Obtenha a URL atual
  const location = useLocation();

  // Extraia a última parte da URL
  let urlPart = location.pathname.split('/').pop();

  // Verifique se urlPart não é undefined
  if (urlPart) {
    urlPart = urlPart.charAt(0).toUpperCase() + urlPart.slice(1);
  } else {
    urlPart = 'Home';
  }

  // * menu actions
  const handleMenuAction = async (action: "logout" | "editUser") => {
    setAnchorElUser(null);
    switch (action) {
      case "logout":
        await dispatch(logout()).then(() => {
          navigate("/login");
        });
        break;
      case "editUser":
        navigate("/editarUsuario");
        break;
      default:
        break;
    }
  };

  // ? saber se é mobile
  const isMobile = useMediaQuery(PositivoTheme.breakpoints.down("sm"));

  // ? state do sidebar
  const { isOpen, onClose, onOpen } = useSideBarHook();

  return (
    isMobile ? <Box sx={{ display: 'flex', justifyContent: 'space-between', backgroundColor: theme.COLORS.WHITE, padding: '0.5rem', marginBottom: '0.5rem' }}>
      <IconButton onClick={() => onOpen()}>
        <MenuIcon sx={{ color: theme.COLORS.BLUE3, fontSize: '30px' }} />
      </IconButton>
      <NavBarBox>
        <UserMenu>
          <Typography >{basicUserInfo?.name}</Typography>
          <Tooltip title="Opções">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Tooltip>
        </UserMenu>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={() => setAnchorElUser(null)}
        >
          <MenuItem onClick={() => handleMenuAction("editUser")}>
            <Typography alignItems={"center"}>Perfil</Typography>
          </MenuItem>
          <MenuItem onClick={() => handleMenuAction("logout")}>
            <Typography alignItems={"center"}>Sair</Typography>
          </MenuItem>
        </Menu>
      </NavBarBox>
    </Box> : <StyledAppBar>
      <StyledToolBar disableGutters>
        <TypographyNav sx={{ fontSize: "1.1pc", fontWeight: "bold", marginLeft: -33.7 }}>{urlPart}</TypographyNav>
        <NavBarBox>
          <UserMenu>
            <Typography >{basicUserInfo?.name}</Typography>
            <Tooltip title="Opções">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
          </UserMenu>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={() => setAnchorElUser(null)}
          >
            <MenuItem onClick={() => handleMenuAction("editUser")}>
              <Typography alignItems={"center"}>Perfil</Typography>
            </MenuItem>
            <MenuItem onClick={() => handleMenuAction("logout")}>
              <Typography alignItems={"center"}>Sair</Typography>
            </MenuItem>
          </Menu>
        </NavBarBox>
      </StyledToolBar>
    </StyledAppBar>
  );
}
export default Navbar;
