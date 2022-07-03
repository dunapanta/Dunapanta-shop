import { useContext, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Input,
  InputAdornment,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  ClearOutlined,
  SearchOutlined,
  ShoppingCart,
} from "@mui/icons-material";
import { UiContext } from "context";

export const Navbar = () => {
  const { asPath, push } = useRouter();
  const { toggleSideMenu } = useContext(UiContext);
  const [isDesktopSearchVisible, setIsDesktopSearchVisible] = useState(false);
  const [serachTerm, setSerachTerm] = useState("");

  let textFieldProps = { inputRef: textFieldInputFocused };

  const onSearchTerm = () => {
    if (serachTerm.trim().length === 0) return;
    push(`/search/${serachTerm}`);
  };

  function textFieldInputFocused(inputRef: any) {
    if (inputRef && inputRef.node !== null) {
      setTimeout(() => {
        inputRef.focus();
      }, 100);
    }
    return inputRef;
  }

  return (
    <AppBar>
      <Toolbar>
        <NextLink href="/" passHref>
          <Link display="flex" alignItems="center">
            <Typography variant="h6">Dunapanta</Typography>
            <Typography sx={{ ml: 0.5 }}>Shop</Typography>
          </Link>
        </NextLink>

        <Box flex={1} />

        <Box
          className="fadeIn"
          sx={{
            display: isDesktopSearchVisible
              ? "none"
              : { xs: "none", sm: "block" },
          }}
        >
          <NextLink href="/category/men" passHref>
            <Link>
              <Button color={asPath === "/category/men" ? "primary" : "info"}>
                Hombres
              </Button>
            </Link>
          </NextLink>
          <NextLink href="/category/women" passHref>
            <Link>
              <Button color={asPath === "/category/women" ? "primary" : "info"}>
                Mujeres
              </Button>
            </Link>
          </NextLink>
          <NextLink href="/category/kid" passHref>
            <Link>
              <Button color={asPath === "/category/kid" ? "primary" : "info"}>
                Niños
              </Button>
            </Link>
          </NextLink>
        </Box>

        <Box flex={1} />
        {/* Search Mobile*/}
        <IconButton
          sx={{ display: { xs: "flex", sm: "none" } }}
          onClick={toggleSideMenu}
        >
          <SearchOutlined />
        </IconButton>

        {/* Search Desktop */}

        {isDesktopSearchVisible ? (
          <Input
            //autoFocus
            {...textFieldProps}
            sx={{
              display: { xs: "none", sm: "flex" },
            }}
            className="fadeIn"
            value={serachTerm}
            onChange={(e) => setSerachTerm(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && onSearchTerm()}
            type="text"
            placeholder="Buscar..."
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  sx={{ display: { xs: "none", sm: "flex" } }}
                  onClick={() => setIsDesktopSearchVisible(false)}
                >
                  <ClearOutlined />
                </IconButton>
              </InputAdornment>
            }
          />
        ) : (
          <IconButton
            className="fadeIn"
            onClick={() => setIsDesktopSearchVisible(true)}
          >
            <SearchOutlined />
          </IconButton>
        )}

        {/* Cart */}
        <NextLink href="/cart" passHref>
          <Link>
            <IconButton>
              <Badge badgeContent={2} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </Link>
        </NextLink>

        {/* Menu */}
        <Button onClick={toggleSideMenu}>Menú</Button>
      </Toolbar>
    </AppBar>
  );
};
