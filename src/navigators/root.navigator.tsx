import { useEffect, lazy, Suspense } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { signInUser } from "@/store/user/user.reducer";

import { Route, Routes, useNavigate } from "react-router-dom";
import Welcome from "../pages/Welcome";
import { getMessaging, getToken } from "firebase/messaging";
import DetailFragment from "@/pages/RegisterItem/fragments/DetailFragment";
import MatchModal from "@/pages/Home/fragments/Home/modals/MatchModal";
import CancelMatchModal from "@/pages/Home/fragments/Chat/modals/CancelMatchModal";
import Chat from "@/pages/Chat";
import Report from "@/pages/Chat/Report";

const AdminNavigator = lazy(() => import("./admin.navigator"));
const AuthNavigator = lazy(() => import("./auth.navigator"));
const HomeNavigator = lazy(() => import("./home.navigator"));

const RootNavigator = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { data } = useAppSelector(state => state.user);

    const printToken = async () => {
        const messaging = getMessaging();
        const token = await getToken(messaging, { vapidKey: import.meta.env.VITE_API_MESSAGING_TOKEN })
        if (token) {
            console.log('token!', token);
        }

        // 토큰 못받아왔을 때 처리
    };

    useEffect(() => {
        dispatch(signInUser());
        printToken();
    }, []);

    useEffect(() => {
        if (data) {
            data.type === "ADMIN" ? navigate("admin") : navigate("home")
        } else {
            navigate("/");
        }
    }, [data]);

    return (
        <Suspense fallback={<></>}>
            <Routes>

                {/* 앱 시작점 */}
                <Route index element={<Welcome />} />

                {/* <Route path="hello" element={<Chat />} /> */}

                {/* 로그인, 회원가입, 비밀번호 찾기 */}
                <Route path="auth/*" element={<AuthNavigator />} />

                {/* 홈 화면 */}
                <Route path="home/*" element={<HomeNavigator />} />

                {/* 어드민 화면 */}
                <Route path="admin/*" element={<AdminNavigator />} />

                {/* 테스트 라우팅 */}
                <Route path="test/*" element={<DetailFragment onClickBackButton={() => { }} />} />
            </Routes>
        </Suspense>
    );
};

export default RootNavigator;