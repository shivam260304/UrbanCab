import { useContext} from "react";
import { CaptainDataContext } from "../context/CaptainContext";
const CaptainDetails = () => {
  const { captain } = useContext(CaptainDataContext);
  return (
    <div>
      <div className="flex items-center justify-between">
          <div className="flex items-center justify-start gap-3">
            <img className="h-10 w-10 rounded-full object-cover" src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/35af6a41332353.57a1ce913e889.jpg" alt="" />
            <h4 className="text-lg font-medium">{captain.fullname.firstname + " " + captain.fullname.lastname}</h4>
          </div>
          <div>
            <h4 className="text-xl font-semibold">4.8⭐</h4>
          </div>
        </div>

        <div className="mt-5 p-4 border-l-4 border-blue-500 bg-blue-50 rounded-lg">
        <p className="text-xl text-blue-700">
          Dear Captain, please drive safely, follow traffic rules, and ensure a
          courteous, comfortable journey for all.
        </p>
      </div>
    </div>
  )
}

export default CaptainDetails
