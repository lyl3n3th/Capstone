// components/student/Header.tsx
import { useState } from "react";
import "../Stud.css";

interface HeaderProps {
  title: string;
  onMenuClick: () => void;
  userName?: string;
  userId?: string;
  notificationCount?: number;
}

function Header({
  title,
  onMenuClick,
  userName = "John Doe",
  userId = "2024-0001",
  notificationCount = 3,
}: HeaderProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <header className="portal-header">
      <div className="header-left">
        <button className="menu-toggle" onClick={onMenuClick}>
          ☰
        </button>
        <h1 className="page-title">{title}</h1>
      </div>

      <div className="header-right">
        <div className="notification-icon">
          <span>🔔</span>
          {notificationCount > 0 && (
            <span className="notification-badge">{notificationCount}</span>
          )}
        </div>

        <div
          className="user-profile"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <div className="user-avatar">{getInitials(userName)}</div>
          <div className="user-details">
            <span className="user-name">{userName}</span>
            <span className="user-id">ID: {userId}</span>
          </div>
        </div>

        {showDropdown && (
          <div className="user-dropdown">
            <a href="/student/profile">Profile</a>
            <a href="/student/settings">Settings</a>
            <a href="/logout">Logout</a>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
