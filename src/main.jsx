import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RouteChangeLoader from "./components/RouteChangeLoader";
import PageTransition from "./components/PageTransition.jsx";
import HomePage from "./pages/HomePage";
import AccountPage from "./pages/AccountPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Payment from "./pages/Payment";
import Events from "./pages/Events";
import GalleryPage from "./pages/GalleryPage";
import Plans from "./pages/Plans";
import RequireAuth from "./components/RequireAuth";
import LoginRequired from "./pages/LoginRequired";
import RedirectionPage from "./pages/RedirectionPage";
import { AuthProvider } from "./contexts/AuthContext";
import "./styles/main.css";
//import {Auth} from "./components/Auth";
//import { db } from "./config/firebase";
//import { collection, getDocs } from "firebase/firestore";

//const usersCollectionRef = collection(db, "users");
//const usersSnapshot = await getDocs(usersCollectionRef);
//const users = usersSnapshot.docs.map((doc) => doc.data());

//useEffect(() => {
//const getUserList = async () => {
//try {
//const data = await getDocs(usersCollectionRef);
//const filteredData = data.docs.map((doc)) => ({
//...doc.data(),
//id:doc.id,
//})
//setUserList(filteredData);

//}catch(err){
//console.log(err);
//}
//};
//}, []);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <RouteChangeLoader>
          <PageTransition>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/payment/:planId" element={<Payment />} />
              <Route
                path="/events"
                element={
                  <RequireAuth>
                    <Events />
                  </RequireAuth>
                }
              />
              <Route
                path="/gallery"
                element={
                  <RequireAuth>
                    <GalleryPage />
                  </RequireAuth>
                }
              />
              <Route
                path="/plans"
                element={
                  <RequireAuth>
                    <Plans />
                  </RequireAuth>
                }
              />
              <Route path="/login-required" element={<LoginRequired />} />
              <Route path="/redirection" element={<RedirectionPage />} />
            </Routes>
          </PageTransition>
        </RouteChangeLoader>
      </AuthProvider>
    </Router>
  </StrictMode>
);
