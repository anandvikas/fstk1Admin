import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const folderStructure = [
  {
    name: "User Management",
    id: "1",
    type: "folder",
    child: [
      {
        name: "View All",
        id: "1_1",
        type: "file",
        path: "/user",
      },
      {
        name: "Add User",
        id: "1_2",
        type: "file",
        path: "/user/add",
      },
    ],
  },
  {
    name: "Food Management",
    id: "2",
    type: "folder",
    child: [
      {
        name: "View All",
        id: "2_1",
        type: "file",
        path: "/food",
      },
      {
        name: "Add Food",
        id: "2_2",
        type: "file",
        path: "/food/add",
      },
    ],
  },
];

const Micro = ({ element }) => {
  const navigate = useNavigate();
  const [children, setChildren] = useState(null);
  const showChildren = () => {
    if (element.type === "folder") {
      if (children) {
        setChildren(null);
      } else {
        setChildren(<Macro array={element.child} />);
      }
    } else {
      navigate(`${element.path}`);
    }
  };

  return (
    <>
      <div style={{ padding: "10px" }}>
        <span onClick={showChildren}>{element.name}</span>
        {children}
      </div>
    </>
  );
};

const Macro = ({ array = folderStructure }) => {
  return array.map((element) => {
    return <Micro key={element.id} element={element} />;
  });
};

const SideBar = () => {
  return (
    <div>
      <Macro array={folderStructure} />
    </div>
  );
};

export default SideBar;
