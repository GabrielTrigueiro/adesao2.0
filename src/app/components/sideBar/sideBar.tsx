import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DiscountIcon from "@mui/icons-material/Discount";
import { Divider, IconButton, useMediaQuery } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { CSSObject, Theme, styled } from "@mui/material/styles";
import useSideBarHook from "core/hooks/sideBarHook";
import { useAppSelector } from "core/hooks/reduxHooks";
import theme from "theme";
import COLORS from "core/theme/theme"
import SideBarItem from "../sideBarItem/sideBarItem";
import { IconList, IconWrapper, LogoSidebarMax, LogoSidebarMin, SideBarBody, SideBarToggle } from "./styles";
import { Link } from "react-router-dom";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';

const drawerWidth = 200;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  ...transitionMixin(theme, theme.transitions.duration.enteringScreen),
  [theme.breakpoints.down("sm")]: {
    width: "100svw",
  },
});

const closedMixin = (theme: Theme): CSSObject => ({
  ...transitionMixin(theme, theme.transitions.duration.leavingScreen),
  width: `calc(${theme.spacing(8)} + 1px)`,
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
});

const transitionMixin = (theme: Theme, duration: number): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration,
  }),
  overflowX: "hidden",
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...((open && openedMixin(theme)) || (!open && closedMixin(theme))),
  "& .MuiDrawer-paper": {
    ...((open && openedMixin(theme)) || (!open && closedMixin(theme))),
    border: "none",
  },
}));

function SideBar() {
  const { isOpen, onClose, onOpen } = useSideBarHook();
  const basicUserInfo = useAppSelector((state) => state.auth.userInfo);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const logoRedirectUrl = basicUserInfo?.group === "CLIENT" ? "/aulas" : "/dashboard";

  return (
    <Drawer
      sx={{
        textAlign: "center",
        overflow: "hidden"
      }}
      variant={"permanent"}
      open={isOpen}
      onClose={onClose}
    >
      {isMobile && <IconButton sx={{ position: 'absolute', top: '10px', left: '10px' }} onClick={() => onClose()}>
        <MenuIcon sx={{ color: COLORS.COLORS.BLUE3, fontSize: '30px' }} />
      </IconButton>}
      <Link to={logoRedirectUrl}>
        {isOpen ? <LogoSidebarMax /> : <LogoSidebarMin />}
      </Link>
      <IconList $isOpen={isOpen}>
        <SideBarItem
          icon={PersonSearchIcon}
          link="/pesquisas"
          label="Pesquisar"
          acepptRoles={["ROLE_ADMIN", "ROLE_CRUD_SELLER", "ROLE_SELLER"]}
        />
      </IconList>
      {!isMobile && (
        <SideBarToggle onClick={isOpen ? onClose : onOpen}>
          {isOpen ? (
            <IconWrapper className="icon">
              <ChevronLeftIcon color="primary" sx={{ border: "2px solid" }} className="icon" />
            </IconWrapper>
          ) : (
            <IconWrapper className="icon">
              <ChevronRightIcon color="primary" sx={{ border: "2px solid" }} className="icon" />
            </IconWrapper>
          )}
        </SideBarToggle>
      )}
    </Drawer>
  );
}

export default SideBar;
