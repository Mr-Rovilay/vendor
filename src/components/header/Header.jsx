import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Search, X, Store, Menu,  } from 'lucide-react';
import { cn } from "@/lib/utils";
import { loadSeller, loadUser } from "@/redux/actions/user";
import { DropdownMenu } from "../ui/dropdown-menu";
import { categoriesData, productData } from "@/static/data";
import { Input } from "../ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import WishlistSidebar from "../wishList/WishlistSidebar";
import CartSidebar from "../cart/CartSidebar";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "../ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Dropdown from "../dropdown/DropDown";
const Header = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { authenticateShop } = useSelector((state) => state.seller);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    dispatch(loadUser());
    dispatch(loadSeller()); 
  }, [dispatch]);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filteredProducts = productData.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
    setSearchData(filteredProducts);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSearchData(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 70);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isLinkActive = (path) => location.pathname === path;

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-pad-container sm:px-6 lg:px-8">
        {/* Top Navigation */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold sm:text-2xl text-primary">
            MultiVendor
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="relative hidden w-1/2 md:block">
            <div className="flex items-center">
              <Input
                type="text"
                placeholder="Search products, sellers, categories..."
                className="flex-grow"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              {searchTerm ? (
                <X
                  className="absolute w-4 h-4 text-gray-500 cursor-pointer right-3"
                  onClick={clearSearch}
                />
              ) : (
                <Search className="absolute w-4 h-4 text-gray-500 right-3" />
              )}
            </div>

            {searchData && searchData.length !== 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
                {searchData.map((product, index) => (
                  <Link
                    key={index}
                    to={`/product/${product.name.replace(/\s+/g, "-")}`}
                    className="block hover:bg-gray-100"
                  >
                    <div className="flex items-center p-2">
                      <img
                        src={product.image_Url[0].url}
                        alt={product.name}
                        className="object-cover w-10 h-10 mr-3"
                      />
                      <span>{product.name}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle - Visible on mobile */}
          <div className="flex items-center space-x-2 md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(true)}>
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[400px]">
                <SheetHeader>
                  <SheetTitle>
                    <Link to="/" className="text-xl font-bold text-primary">MultiVendor</Link>
                  </SheetTitle>
                </SheetHeader>
                
                {/* Mobile Search */}
                <div className="relative my-4">
                  <Input
                    type="text"
                    placeholder="Search products..."
                    className="w-full"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  {searchTerm ? (
                    <X
                      className="absolute w-4 h-4 text-gray-500 -translate-y-1/2 cursor-pointer right-3 top-1/2"
                      onClick={clearSearch}
                    /> 
                  ) : (
                    <Search className="absolute w-4 h-4 text-gray-500 -translate-y-1/2 right-3 top-1/2" />
                  )}
                  {searchData && searchData.length !== 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
                      {searchData.map((product, index) => (
                        <Link
                          key={index}
                          to={`/product/${product.name.replace(/\s+/g, "-")}`}
                          className="block hover:bg-gray-100"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <div className="flex items-center p-2">
                            <img
                              src={product.image_Url[0].url}
                              alt={product.name}
                              className="object-cover w-10 h-10 mr-3"
                            />
                            <span>{product.name}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Mobile Navigation Links */}
                <div className="space-y-4">
                  {[
                    { path: "/", label: "Home" },
                    { path: "/best-selling", label: "Best Selling" },
                    { path: "/products", label: "Products" },
                    { path: "/about-us", label: "About Us" },
                    { path: "/faq", label: "FAQ" }
                  ].map(({ path, label }) => (
                    <Link
                      key={path}
                      to={path}
                      className={cn(
                        "block py-2 text-lg",
                        isLinkActive(path) && "text-green-500 font-semibold"
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {label}
                    </Link>
                  ))}
                </div>

                {/* Mobile Additional Actions */}
                <div className="mt-6 space-y-4">
                  <Button 
                    asChild 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Link
                      to={`${authenticateShop ? "/dashboard" : "/shop-create"}`}
                      className="flex items-center justify-center"
                    >
                      <Store className="mr-2" />{authenticateShop ? "Go To Dashboard" : "Become a Seller"}
                    </Link>
                  </Button>

                  <div className="flex items-center justify-between">
                    <WishlistSidebar />
                    <CartSidebar />
                    {isAuthenticated ? (
                      <NavigationMenu>
                        <NavigationMenuList>
                          <NavigationMenuItem>
                            <NavigationMenuTrigger>
                              <Avatar>
                              <AvatarImage src={user?.avatar.url} className="object-cover"/>
                                <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                              </Avatar>
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                              <ul className="p-2">
                                <li>
                                  <NavigationMenuLink href="/profile">Profile</NavigationMenuLink>
                                </li>
                              </ul>
                            </NavigationMenuContent>
                          </NavigationMenuItem>
                        </NavigationMenuList>
                      </NavigationMenu>
                    ) : (
                      <Button asChild>
                        <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                          Login
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Become Seller & Icons - Adjust for responsiveness */}
          <div className="items-center hidden space-x-4 md:flex">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="hidden md:ml-3 md:flex"
            >
              
              <Link  to={`${authenticateShop ? "/dashboard" : "/shop-create"}`} className="flex items-center">
              <Store className="mr-2" />{authenticateShop ? "Go To Dashboard" : "Become a Seller"}
              </Link>
            </Button>

            <div className="flex space-x-3">
              <WishlistSidebar/>
              <CartSidebar/>
              {isAuthenticated ? (
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>
                        <Avatar>
                          <AvatarImage src={user?.avatar.url} className="object-cover"/>
                          <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="p-2">
                          <li>
                            <NavigationMenuLink href="/profile">Profile</NavigationMenuLink>
                          </li>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              ) : (
                <Button asChild>
                  <Link to="/login">Login</Link>
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <nav
          className={cn(
            "transition-all duration-300 py-3",
            active &&
              "fixed top-0 left-0 right-0 z-50 bg-white shadow-lg max-pad-container"
          )}
        >
          {/* Desktop Navigation */}
          <div className="items-center justify-between mx-auto md:flex">
            {/* Categories Dropdown */}
            <div className="mb-3 md:mb-0">
              <DropdownMenu>
                <Dropdown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              </DropdownMenu>
            </div>

            {/* Navigation Links */}
            <div className="flex space-x-5 md:space-x-6">
              {[
                { path: "/", label: "Home" },
                { path: "/best-selling", label: "Best Selling" },
                { path: "/products", label: "Products" },
                { path: "/about-us", label: "About us" },
                { path: "/faq", label: "FAQ" }
              ].map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={cn(
                    "hover:text-green-500",
                    isLinkActive(path) && "text-green-500 font-semibold"
                  )}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;