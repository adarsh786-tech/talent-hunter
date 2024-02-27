import { Url } from "next/dist/shared/lib/router/router";

interface NavItemInterface {
  id: Number;
  name: String;
  url: Url;
}

export const NavLinks: NavItemInterface[] = [
  { id: 1, name: "Home", url: "/" },
  { id: 2, name: "About Us", url: "/" },
  { id: 3, name: "Login", url: "/login" },
  { id: 4, name: "Register", url: "/register" },
];
