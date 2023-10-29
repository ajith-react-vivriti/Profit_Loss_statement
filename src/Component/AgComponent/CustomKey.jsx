import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";
const Customkey = (p) => {
  const [isClicked, setIsClicked] = useState(false);
  // const [Revenue_Value, setRevenueValue] = useState("");

  const handleClick = () => {
    setIsClicked(!isClicked);

    if (!isClicked) {
      console.log(p.data.P_id);
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
