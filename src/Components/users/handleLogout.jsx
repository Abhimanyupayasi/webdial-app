import { Account, Client } from "appwrite";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import conf from "../../conf/conf";
import { setEmailVerified, logout } from "../../store/authSlice"; // Ensure logout is imported from your slice
import { FaSignOutAlt } from "react-icons/fa";

const HandleLogout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const client = new Client().setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
    const account = new Account(client);

    const logoutHandler = async () => {
        try {
            // Delete the current session
            await account.deleteSession("current");

            // Clear localStorage and reset necessary states
            localStorage.clear();
            dispatch(setEmailVerified(false));
            dispatch(logout()); // Dispatch the logout action to reset Redux state

            // Redirect to the login page
            navigate("/login");
            window.location.reload();
        } catch (error) {
            console.error("Logout failed:", error);

            // In case of failure, ensure localStorage is cleared and redirect to login
            localStorage.clear();
            dispatch(logout()); // Dispatch logout to reset Redux state
            navigate("/login");
        }
    };

    return (
        <button
            onClick={logoutHandler}
            className="btn btn-primary w-full bg-red-600 hover:bg-red-700 text-white font-semibold flex items-center justify-center gap-2"
        >
            <FaSignOutAlt />
            <span className="text-sm">Logout</span>
        </button>
    );
};

export default HandleLogout;
