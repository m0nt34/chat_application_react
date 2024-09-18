import React, { useEffect ,useState} from "react";
import Input from "../../../components/UI/Input";
import SearchIcon from "../../../assets/icons/SearchIcon";
import { useUser } from "../../../store/userStore";
import { filterValidation } from "../../../utils/validation";
import { useRoom } from "../../../store/currentRomm";
import AvatarImg from "../AvatarImg";

const UserList = ({currentRoom}) => {
  const [roomPrts, setRoomPrts] = useState([]);
  const { user } = useUser();
  const {room} = useRoom()
  const handleSearch = (e) => {
    const searchWord = e.target.value;
    if (searchWord.trim() === "") {
      setRoomPrts(currentRoom.participants);
    } else {
      setRoomPrts((prev) => {
        return currentRoom.participants.filter((prt) =>
          filterValidation(prt, searchWord)
        );
      });
    }
  };
  useEffect(()=>{
    setRoomPrts(currentRoom.participants)
  },[currentRoom.participants])
  return (
    <div>
      <div className="my-5">
        <p className="text-white text-lg select-none my-1 ml-1">Members</p>
        <Input
          name="searchWord"
          type="text"
          placeholder="search..."
          Icon={SearchIcon}
          onChange={handleSearch}
        />
      </div>
      <div className="flex flex-col max-h-[400px] overflow-auto h-fit gap-5 users-box">
        {roomPrts.map((prt) => {
          return (
            <div key={prt.email} className="flex items-center">
              <div className="flex gap-4 items-center">
                <AvatarImg prv={true} className="h-11" />
                <div className="flex flex-col">
                  <span className="flex text-white text-[19px] h-full items-start ">
                    {prt.name}&nbsp;{prt.lastName}{" "}
                    {prt._id === user._id && (
                      <div className="flex text-sm ml-2 p-2 py-1 rounded-md bg-[#3c404b]">
                        You
                      </div>
                    )}
                    {room.admins.some((admin) => admin === prt._id) &&
                      !room.private && (
                        <div className="flex text-sm ml-2 p-2 py-1 rounded-md bg-[#3c404b]">
                          Admin
                        </div>
                      )}
                  </span>
                  <span className="text-[#ccc]">{prt.email}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserList;
