import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { signInUser } from "@/store/user/user.reducer";
import { lazy, Suspense, useEffect, useState } from "react";

import PolicyErrorDialog from "@/components/PolicyErrorDialog";
import DetailFragment from "@/pages/RegisterItem/fragments/DetailFragment";
import { getMessaging, getToken } from "firebase/messaging";
import { Route, Routes, useNavigate } from "react-router-dom";
import Welcome from "../pages/Welcome";
import Share from "@/pages/Share/Share";
import MyPage from "@/pages/MyPage/MyPage";

const AdminNavigator = lazy(() => import("./admin.navigator"));
const AuthNavigator = lazy(() => import("./auth.navigator"));
const HomeNavigator = lazy(() => import("./home.navigator"));

const RootNavigator = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { data } = useAppSelector(state => state.user);

    const [policyDialog, setPolicyDialog] = useState(false);

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
            const pathname = window.location.pathname;
            if(pathname === "/auth"){
                data.type === "ADMIN" ? navigate("admin") : navigate("home")
            }
        }
    }, [data]);

    const handleClickEditProfile = () => {
        navigate("home/mypage")
    }

    return (
        <>
            <Suspense fallback={<></>}>
                <Routes>

                    {/* 앱 시작점 */}
                    <Route path="/" element={<Welcome />} />

                    {/* 마이페이지 */}
                    <Route path="mypage" element={<MyPage />} />

                    {/* 로그인, 회원가입, 비밀번호 찾기 */}
                    <Route path="auth/*" element={<AuthNavigator />} />

                    {/* 홈 화면 */}
                    <Route path="home/*" element={<HomeNavigator />} />

                    {/* 어드민 화면 */}
                    <Route path="admin/*" element={<AdminNavigator />} />

                    {/* 공유 화면 */}
                    <Route path="share/:id" element={<Share />} />

                    {/* 테스트 라우팅 */}
                    <Route path="test/*" element={<DetailFragment onClickBackButton={() => { }} />} />

                </Routes>
            </Suspense>
            <PolicyErrorDialog
                open={policyDialog}
                handleClickLeft={handleClickEditProfile}
                handleClickRight={() => setPolicyDialog(false)}
            />
        </>
    );
};

export default RootNavigator;