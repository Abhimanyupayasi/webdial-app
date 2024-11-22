import React from "react";
import { MdNotificationsOff } from "react-icons/md";

const UserNotification = () => {
  return (
    <div className="flex flex-col h-screen items-center justify-center h-64 bg-base-200 rounded-lg shadow-lg p-4">
      <div className="text-primary text-5xl mb-4">
        <MdNotificationsOff />
      </div>
      <h2 className="text-lg font-semibold text-base-content mb-2">
        No Notifications
      </h2>
      <p className="text-sm text-base-content/70">
        You don’t have any notifications at the moment.
      </p>
    </div>
  );
};

export default UserNotification;
