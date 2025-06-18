import React, { useRef, useState } from "react";
import {
  Camera,
  Github,
  Globe,
  Info,
  Linkedin,
  Twitter,
  Wrench,
} from "lucide-react";

import UserBasicInfoTab from "../components/UserBasicInfoTab";
import UserAccountInfoTab from "../components/UserAccountInfoTab";
import {
  useGetUserQuery,
  useUpdateUserProfileImageMutation,
} from "../querys/useUserQuery";

const UserProfilePage = () => {
  const fileInputRef = useRef();
  const [activeTab, setActiveTab] = useState("basic-info");
  const { data, isPending, isError, error } = useGetUserQuery();
  const user = data?.user;

  const {
    mutateAsync,
    isPending: updateIsPending,
  } = useUpdateUserProfileImageMutation();

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleChange = async (e) => {
    const profileImage = e.target.files[0];
    const formData = new FormData();
    formData.append("profileImage", profileImage);
    await mutateAsync(formData);
  };

  if (isPending) {
    return (
      <div className="w-full flex items-center flex-col justify-center h-[70vh]">
        <span className="loading loading-bars loading-xl" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full flex items-center flex-col justify-center h-[70vh]">
        <h3 className="text-2xl font-bold">{error?.response?.data?.message}</h3>
      </div>
    );
  }

  const RenderTabContent = () => {
    switch (activeTab) {
      case "basic-info":
        return <UserBasicInfoTab />;
      case "account-info":
        return <UserAccountInfoTab />;
      default:
        return null;
    }
  };

  return (
    <div className="w-[60%] mx-auto bg-base-00 min-h-screen space-y-6 py-6">
      <div className="hero bg-base-200 py-12">
        <div className="hero-content flex-col lg:flex-row gap-8 max-w-4xl">
          <div className="avatar relative">
            <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4">
              <img
                src={user?.profileImage || "/default-avatar.png"}
                alt={user?.fullname || "User"}
                className="object-cover"
              />
              <input
                type="file"
                hidden
                ref={fileInputRef}
                onChange={handleChange}
              />
              <button
                disabled={updateIsPending}
                onClick={handleClick}
                className="btn btn-lg btn-circle btn-accent absolute bottom-[7%] right-0"
              >
                {updateIsPending ? (
                  <span className="loading loading-spinner" />
                ) : (
                  <Camera />
                )}
              </button>
            </div>
          </div>

          <div className="text-center lg:text-left space-y-4 flex-1">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-base-content">
                {user?.fullname || "Full Name"}
              </h1>
              <p className="text-xl text-primary font-semibold">
                @{user?.username || "username"}
              </p>
            </div>
            <p className="text-base-content/80 max-w-md">
              {user?.basicInfo?.bio ||
                "Welcome to my coding journey! Passionate about solving problems and building amazing things."}
            </p>
            <div className="flex justify-center lg:justify-start gap-4">
              {user?.basicInfo?.socials?.website && (
                <a
                  href={user.basicInfo.socials.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-circle btn-outline btn-sm hover:btn-primary"
                >
                  <Globe size={16} />
                </a>
              )}
              {user?.basicInfo?.socials?.github && (
                <a
                  href={user.basicInfo.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-circle btn-outline btn-sm hover:btn-primary"
                >
                  <Github size={16} />
                </a>
              )}
              {user?.basicInfo?.socials?.twitter && (
                <a
                  href={user.basicInfo.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-circle btn-outline btn-sm hover:btn-primary"
                >
                  <Twitter size={16} />
                </a>
              )}
              {user?.basicInfo?.socials?.linkedIn && (
                <a
                  href={user.basicInfo.socials.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-circle btn-outline btn-sm hover:btn-primary"
                >
                  <Linkedin size={16} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-base-200 w-full p-8">
        <div className="tabs tabs-lift">
          <label className="tab flex items-center gap-2">
            <input
              type="radio"
              name="my_tabs_4"
              defaultChecked
              onChange={() => setActiveTab("basic-info")}
            />
            <Info size="18" />
            Basic Information
          </label>
          <label className="tab flex items-center gap-2">
            <input
              type="radio"
              name="my_tabs_4"
              onChange={() => setActiveTab("account-info")}
            />
            <Wrench size="18" />
            Account
          </label>
        </div>
        <RenderTabContent />
      </div>
    </div>
  );
};

export default UserProfilePage;
