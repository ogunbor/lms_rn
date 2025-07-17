import { useSelector } from "react-redux";

function useUserData() {
    const user = useSelector((state) => state.user);
    return user?.user_id;
}

export default useUserData;
