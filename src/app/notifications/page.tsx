import { UserRound } from "lucide-react";

function Notifications() {
  return (
    <div className="h-screen w-screen flex flex-col items-start justify-start bg-gray-200 p-6 overflow-x-hidden gap-y-5">
      <header className="text-[#484848] font-bold text-lg">
        <h1>Notifications</h1>
      </header>
      <div className="flex flex-col justify-center gap-y-2">
        <div className="flex flex-col gap-y-4">
          <div className="w-fit p-2 text-[#5D5D5D] bg-[#DFDFDF] rounded-md">
            <p>Today</p>
          </div>
          <div className="w-full flex justify-center items-center gap-3 bg-[#FFFFFF] p-2 rounded-md">
            <UserRound className="bg-[#52B9FF] text-[#FFFFFF] p-2 rounded-lg w-10 h-10" />
            <p>User23jk has sent you a request for a deed.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Notifications;
