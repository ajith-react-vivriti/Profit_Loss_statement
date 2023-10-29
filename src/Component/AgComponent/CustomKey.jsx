import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";

const Customkey = (p) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
    if (!isClicked) {
      // Store data in local storage
      if (p.data.P_id !== undefined) {
        localStorage.setItem("P_id", p.data.P_id);
        // localStorage.setItem("P_id", JSON.stringify({ key: p.data.P_id }));
        // console.log(p.data.P_id);
      }
    } else {
      localStorage.setItem("P_id", "");
    }
  };

  return (
    <div onClick={handleClick} style={{ cursor: "pointer" }}>
      {isClicked ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
      {p.value}
    </div>
  );
};

export default Customkey;
