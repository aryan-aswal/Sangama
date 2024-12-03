import React, { useState, useEffect } from "react";
import logo from '../../assets/logo.png';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  DropdownItem,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu
} from "@nextui-org/react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../services/operations/AUTH_API";

export default function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Use useLocation hook to get the current path
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);

  const menuItems = [
    "Home",
    "Features",
    "Downloads",
    "Plan & Pricing",
  ];

  // Derive active page from location pathname
  const getActivePage = () => {
    const currentRoute = location.pathname.split("/")[1] || "Home";
    return currentRoute.charAt(0).toUpperCase() + currentRoute.slice(1);
  };

  const logoutHandler = () => {
    dispatch(signOut(navigate));
  }

  const activePage = getActivePage();

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} shouldHideOnScroll isBordered>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand className="relaive">
          <img src={logo} className="h-12 w-36" />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={activePage === "Home"}>
          <RouterLink
            to="/"
            className={`link ${activePage === "Home" ? "text-[#1657FF]" : ""}`}
          >
            Home
          </RouterLink>
        </NavbarItem>
        <NavbarItem isActive={activePage === "Features"}>
          <RouterLink
            to="/features"
            className={`link ${activePage === "Features" ? "text-[#1657FF]" : ""}`}
          >
            Features
          </RouterLink>
        </NavbarItem>
        <NavbarItem isActive={activePage === "Downloads"}>
          <RouterLink
            to="/downloads"
            className={`link ${activePage === "Downloads" ? "text-[#1657FF]" : ""}`}
          >
            Downloads
          </RouterLink>
        </NavbarItem>
        <NavbarItem isActive={activePage === "Plan-and-pricing"}>
          <RouterLink
            to="/plan-and-pricing"
            className={`link ${activePage === "Plan-and-pricing" ? "text-[#1657FF]" : ""}`}
          >
            Plan & Pricing
          </RouterLink>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          {token ? (
            <NavbarContent as="div" justify="end">
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    color="secondary"
                    name="Jason Hughes"
                    size="sm"
                    src={user.image}
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold">{user.username}</p>
                  </DropdownItem>
                  <DropdownItem key="meeting" color="danger" onClick={() => navigate('/meeting')}>
                    Start Meeting
                  </DropdownItem>
                  <DropdownItem key="logout" color="danger" onClick={logoutHandler}>
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarContent>
          ) : (
            <Button as={RouterLink} color="primary" to="/auth" variant="flat">
              Log In
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <RouterLink
              to={`/${item != 'Home' ? item.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-") : ""}`}
              className="w-full"
            >
              {item}
            </RouterLink>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
