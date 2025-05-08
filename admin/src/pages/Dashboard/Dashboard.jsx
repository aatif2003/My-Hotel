import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]); // Add navigate here too!

  return (
    <div>
      <h1 className="heading center">Dashboard</h1>
    </div>
  );
};

export default Dashboard;

