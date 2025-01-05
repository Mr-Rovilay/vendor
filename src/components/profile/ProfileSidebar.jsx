import { 
  User, 
  ShoppingBag, 
  RefreshCcw, 
  MessageCircle, 
  MapPin, 
  RailSymbol,
  LockKeyhole, 
  LogOut, 
  CreditCard,
  LayoutDashboard,
  ChevronRight
} from "lucide-react";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "@/utils/server";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const ProfileSidebarItem = ({ 
  icon: Icon, 
  label, 
  active, 
  activeNumber, 
  onClick,
  className = ""
}) => (
  <Button
    variant="ghost"
    className={`
      w-full items-center justify-center gap-3 py-3 px-4 transition-all duration-200
      ${active === activeNumber ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' : 'hover:bg-gray-50'}
      ${className}
    `}
    onClick={onClick}
  >
    <Icon className={`
      w-5 h-5
      ${active === activeNumber ? 'text-emerald-600' : 'text-gray-500'}
    `} />
    
    <span className={`
      flex-grow text-sm font-medium hidden md:inline-block
      ${active === activeNumber ? 'text-emerald-600' : 'text-gray-700'}
    `}>
      {label}
    </span>

    <ChevronRight className={`
      w-4 h-4 ml-auto hidden md:inline-block transition-transform
      ${active === activeNumber ? 'text-emerald-600 opacity-100' : 'text-gray-400 opacity-0'}
      ${active === activeNumber ? 'translate-x-0' : '-translate-x-2'}
    `} />
  </Button>
);

const ProfileSidebar = ({ setActive, active }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const logoutHandler = () => {
    api
      .get(`/auth/logout`)
      .then((res) => {
        toast.success(res.data.message);
        navigate("/");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  const sidebarItems = [
    { 
      icon: User, 
      label: "Profile", 
      activeNumber: 1, 
      action: () => setActive(1) 
    },
    { 
      icon: ShoppingBag, 
      label: "Orders", 
      activeNumber: 2, 
      action: () => setActive(2) 
    },
    { 
      icon: RefreshCcw, 
      label: "Refunds", 
      activeNumber: 3, 
      action: () => setActive(3) 
    },
    { 
      icon: MessageCircle, 
      label: "Inbox", 
      activeNumber: 4, 
      action: () => {
        setActive(4);
        navigate("/inbox");
      }
    },
    { 
      icon: RailSymbol, 
      label: "Track Order", 
      activeNumber: 5, 
      action: () => setActive(5) 
    },
    { 
      icon: LockKeyhole, 
      label: "Change Password", 
      activeNumber: 6, 
      action: () => setActive(6) 
    },
    { 
      icon: MapPin, 
      label: "Address", 
      activeNumber: 7, 
      action: () => setActive(7) 
    },
    { 
      icon: CreditCard, 
      label: "Payment Methods", 
      activeNumber: 8, 
      action: () => setActive(8) 
    }
  ];

  return (
    <div className="w-full bg-white shadow-sm">
      <CardHeader className="hidden border-b border-gray-100 md:block">
        <CardTitle className="text-lg font-semibold text-gray-900">
          Account Settings
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-3">
        <div className="flex flex-col space-y-1">
          {sidebarItems.map((item) => (
            <ProfileSidebarItem
              key={item.activeNumber}
              icon={item.icon}
              label={item.label}
              active={active}
              activeNumber={item.activeNumber}
              onClick={item.action}
            />
          ))}

          {user && user?.role === "Admin" && (
            <Link to="/admin/dashboard" className="w-full">
              <ProfileSidebarItem
                icon={LayoutDashboard}
                label="Admin Dashboard"
                active={active}
                activeNumber={9}
                onClick={() => setActive(9)}
                className="text-purple-600 hover:bg-purple-50"
              />
            </Link>
          )}

          <div className="pt-2 mt-2 border-t border-gray-100">
            <ProfileSidebarItem
              icon={LogOut}
              label="Log out"
              active={active}
              activeNumber={10}
              onClick={logoutHandler}
              className="text-red-600 hover:bg-red-50"
            />
          </div>
        </div>
      </CardContent>
    </div>
  );
};

export default ProfileSidebar;