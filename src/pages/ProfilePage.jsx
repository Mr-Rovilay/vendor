import Header from "@/components/header/Header";
import ProfileContent from "@/components/profile/ProfileContent";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import { useState } from "react";

const ProfilePage = () => {
  const [active, setActive] = useState(1);

  return (
    <div>
      {/* Navbar */}
      <Header />
      {/* Main Container */}
      <div className="flex py-10 mx-auto sm:px-6 lg:px-8 mt-[34px]">
        {/* Sidebar */}
        <div className="w-[60px] md:w-[335px] mr-2">
          <div className="sticky top-16">
            <ProfileSidebar active={active} setActive={setActive} />
          </div>
        </div>
        {/* Content */}
        <div className="flex-1">
          <ProfileContent active={active} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
