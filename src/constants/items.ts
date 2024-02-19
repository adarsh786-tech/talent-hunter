interface NavItemInterface {
  id: Number;
  name: String;
  url: String;
}

export const NavLinks: NavItemInterface[] = [
  { id: 1, name: "Home", url: "/" },
  { id: 2, name: "About Us", url: "/" },
  { id: 3, name: "Login", url: "/" },
  { id: 4, name: "Register", url: "/" },
];
