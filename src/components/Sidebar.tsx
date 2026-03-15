// components/student/Sidebar.tsx
import { FaHome, FaGraduationCap } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { BsCardList } from "react-icons/bs";
import { IoBookSharp } from "react-icons/io5";
import { MdOutlineNoteAlt } from "react-icons/md";
import "../Stud.css";

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
  activePage?: string;
}

function Sidebar({ isOpen, onClose, activePage = "home" }: SidebarProps) {
  const menuItems = [
    { id: "home", icon: <FaHome />, label: "Home", path: "/student/dashboard" },
    {
      id: "profile",
      icon: <IoPersonSharp />,
      label: "Profile",
      path: "/student/profile",
    },
    {
      id: "grades",
      icon: <BsCardList />,
      label: "Grades",
      path: "/student/grades",
    },
    {
      id: "subjects",
      icon: <IoBookSharp />,
      label: "Subjects",
      path: "/student/subjects",
    },
    {
      id: "enrollment",
      icon: <FaGraduationCap />,
      label: "Enrollment",
      path: "/student/enrollment",
    },
    {
      id: "evaluation",
      icon: <MdOutlineNoteAlt />,
      label: "Evaluation",
      path: "/student/evaluation",
    },
  ];

  const handleItemClick = (path: string) => {
    window.location.href = path;
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className={`portal-sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <div className="school-name">Asian Institute of Computer Studies</div>
        <div className="branch-name">Bacoor Branch</div>
      </div>

      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={activePage === item.id ? "active" : ""}
            >
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleItemClick(item.path);
                }}
              >
                {item.icon} {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <p>© 2026 AICS</p>
      </div>
    </div>
  );
}

export default Sidebar;
