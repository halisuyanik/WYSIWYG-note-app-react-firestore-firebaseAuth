import "./Loading.css";

import { BounceLoader } from "react-spinners";
import ClipLoader from "react-spinners/ClipLoader";

export default function Loading() {
  return (
    <>
      <div className=" spinner">
        <ClipLoader  color="#36d7b7" />
      </div>
    </>
  );
}