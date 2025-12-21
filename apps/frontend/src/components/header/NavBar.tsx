import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import logo from "../../../public/logo.png";
import { Grid } from "@mui/material";
const pages = [
  { name: "Home", path: "/" },
  { name: "Buy", path: "/properties" },
  { name: "Sell", path: "/properties/selling" },
  { name: "Rent", path: "/rent" },
  { name: "New Build", path: "/new-build" },
];

const account = [
  { name: "Profile", path: "/user/profile" },
  { name: "My Listings", path: "/user/properties" },
  { name: "Logout" },
];

function ResponsiveAppBar() {
  const auth = useContext(AuthContext);
  const nameInitials =
    auth?.user?.firstName?.[0]?.toUpperCase() +
    auth?.user?.lastName?.[0]?.toUpperCase();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "transparent", boxShadow: "none" }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box
            component="img"
            src={logo}
            alt="Housen logo"
            sx={{ display: { xs: "none", md: "block" }, width: 200 }}
          />
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: "center" }}>
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "navlink mob active" : "navlink mob"
                      }
                      to={page.path}
                    >
                      {page.name}
                    </NavLink>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            component="img"
            src={logo}
            alt="Housen logo"
            sx={{ display: { xs: "block", md: "none" }, width: 200 }}
          />
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            {pages.map((page) => (
              <NavLink
                key={page.name}
                onClick={handleCloseNavMenu}
                className={({ isActive }) =>
                  isActive ? "navlink active" : "navlink"
                }
                to={page.path}
              >
                {page.name}
              </NavLink>
            ))}
          </Box>
          <Box
            sx={{
              flexGrow: 0,
              display: "flex",
              flexDirection: "row",
              gap: "20px",
              alignItems: "center",
            }}
          >
            {auth?.isLoggedIn ? (
              <Tooltip title="My Account">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    sx={{ backgroundColor: "#0e86e8", color: "#fff" }}
                    alt="account"
                  >
                    {nameInitials}
                  </Avatar>
                </IconButton>
              </Tooltip>
            ) : (
              <Grid container spacing={1}>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "navlink active" : "navlink"
                  }
                  to={"/account"}
                >
                  Login
                </NavLink>
                <NavLink className={"button-primary"} to={"/account/register"}>
                  Sign Up
                </NavLink>
              </Grid>
            )}
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
              onClose={handleCloseUserMenu}
            >
              {account.map((item, index) => (
                <>
                  {item.path ? (
                    <NavLink
                      onClick={handleCloseUserMenu}
                      className={({ isActive }) =>
                        isActive ? "navlink mob active" : "navlink mob"
                      }
                      to={item.path}
                    >
                      <MenuItem key={index} onClick={handleCloseUserMenu}>
                        {item.name}
                      </MenuItem>
                    </NavLink>
                  ) : (
                    <MenuItem
                      key={index}
                      onClick={() => {
                        auth?.logout();
                        handleCloseUserMenu();
                      }}
                    >
                      {item.name}
                    </MenuItem>
                  )}
                </>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
