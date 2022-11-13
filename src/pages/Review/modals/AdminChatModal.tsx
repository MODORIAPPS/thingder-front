import api from "@/api";
import Spacing from "@/components/Spacing";
import { BottomChat, ChatBody, WhiteGradient } from "@/pages/Chat";
import CounterpartChat from "@/pages/Chat/components/CounterpartChat";
import MinepartChat from "@/pages/Chat/components/MinepartChat";
import TopBar from "@/pages/Chat/components/TopBar";
import Button from "@/pages/Home/fragments/Chat/components/Button";
import styled from "@emotion/styled";
import React from "react";
import Modal from 'react-modal';
import { ReportReasonView } from "./AdminItemDetailModal";

interface Props {
    chatRoomUid: string;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    description: string;
}

const AdminChatModal: React.FC<Props> = ({
    chatRoomUid,
    open,
    setOpen,
    description,
}) => {

    const handleClickClose = () => setOpen(false);

    const handleClickNegativeButton = async () => {
        await api.main.post(`/admin/report/chat/${chatRoomUid}`, {
            status: "BAN"
        });
        alert("계정이 비공개처리되었습니다.")
    };

    const handleClickPositiveButton = () => setOpen(false);


    return (
        <Modal isOpen={open} style={styles}>
            <TopBar onClickBack={handleClickClose} title={"미야오옹"} />

            {
                description &&
                <ReportReasonView>
                    {description}
                </ReportReasonView>
            }

            <ChatBody>
                <CounterpartChat
                    thumbnail_src={"https://mblogthumb-phinf.pstatic.net/20120515_230/sm72351_1337060427810Gv8Ib_JPEG/1.jpg?type=w2"}
                    thumbnail_srcSet={"https://mblogthumb-phinf.pstatic.net/20120515_230/sm72351_1337060427810Gv8Ib_JPEG/1.jpg?type=w2"}
                    text={"HEllo ihddd fdsfwefewfewfewfewfe ddddddddddddwfwefwefwefewfewa"} />

                <MinepartChat text={"sdfs"} />
                <CounterpartChat
                    thumbnail_src={"https://mblogthumb-phinf.pstatic.net/20120515_230/sm72351_1337060427810Gv8Ib_JPEG/1.jpg?type=w2"}
                    thumbnail_srcSet={"https://mblogthumb-phinf.pstatic.net/20120515_230/sm72351_1337060427810Gv8Ib_JPEG/1.jpg?type=w2"}
                    text={"HEllo ihdd ddfdsfwefewfewfewfewfewfwefwefwefewfewa"} />

                <MinepartChat text={"YO what animal do you want to meet tonight? YO what animal do you."} />

                <MinepartChat text={"sdfs"} />
                <MinepartChat text={"sdfs"} />
                <MinepartChat text={"sdfs"} />
                <CounterpartChat
                    thumbnail_src={"https://mblogthumb-phinf.pstatic.net/20120515_230/sm72351_1337060427810Gv8Ib_JPEG/1.jpg?type=w2"}
                    thumbnail_srcSet={"https://mblogthumb-phinf.pstatic.net/20120515_230/sm72351_1337060427810Gv8Ib_JPEG/1.jpg?type=w2"}
                    text={"HEllo ihdd ddfdsfwefewfewfewfewfewfwefwefwefewfewa"} />
                <CounterpartChat
                    thumbnail_src={"https://mblogthumb-phinf.pstatic.net/20120515_230/sm72351_1337060427810Gv8Ib_JPEG/1.jpg?type=w2"}
                    thumbnail_srcSet={"https://mblogthumb-phinf.pstatic.net/20120515_230/sm72351_1337060427810Gv8Ib_JPEG/1.jpg?type=w2"}
                    text={"HEllo ihdd ddfdsfwefewfewfewfewfewfwefwefwefewfewa"} />
                <CounterpartChat
                    thumbnail_src={"https://mblogthumb-phinf.pstatic.net/20120515_230/sm72351_1337060427810Gv8Ib_JPEG/1.jpg?type=w2"}
                    thumbnail_srcSet={"https://mblogthumb-phinf.pstatic.net/20120515_230/sm72351_1337060427810Gv8Ib_JPEG/1.jpg?type=w2"}
                    text={"HEllo ihdd ddfdsfwefewfewfewfewfewfwefwefwefewfewa"} />
                <CounterpartChat
                    thumbnail_src={"https://mblogthumb-phinf.pstatic.net/20120515_230/sm72351_1337060427810Gv8Ib_JPEG/1.jpg?type=w2"}
                    thumbnail_srcSet={"https://mblogthumb-phinf.pstatic.net/20120515_230/sm72351_1337060427810Gv8Ib_JPEG/1.jpg?type=w2"}
                    text={"HEllo ihdd ddfdsfwefewfewfewfewfewfwefwefwefewfewa"} />
                <CounterpartChat
                    thumbnail_src={"https://mblogthumb-phinf.pstatic.net/20120515_230/sm72351_1337060427810Gv8Ib_JPEG/1.jpg?type=w2"}
                    thumbnail_srcSet={"https://mblogthumb-phinf.pstatic.net/20120515_230/sm72351_1337060427810Gv8Ib_JPEG/1.jpg?type=w2"}
                    text={"HEllo ihdd ddfdsfwefewfewfewfewfewfwefwefwefewfewa"} />

            </ChatBody>

            <BottomChat>
                <WhiteGradient />
                <InputWrapper>
                    <ButtonWrapper>
                        <Button
                            onClick={handleClickNegativeButton}
                            backgroundColor="#FF5100"
                            textColor="white">BAN!</Button>
                        <Spacing.Horizontal width={24} />
                        <Button
                            onClick={handleClickPositiveButton}
                            backgroundColor="#26C485"
                            textColor="black">DISMISS!</Button>
                    </ButtonWrapper>
                </InputWrapper>
            </BottomChat>
        </Modal>
    );
};

const styles = {
    overlay: {

    },
    content: {
        padding: 0,
        margin: 0,
        inset: 0,
        width: '100%',
        height: 'calc(100%-70px)',
    }
};

const InputWrapper = styled.div`
    display: flex;
    flex-direction: row;
    background-color: white;
    width: 100%;
    padding-bottom: 24px;
`;

const ButtonWrapper = styled.div`
    margin: 0 auto;
    display: flex;
    flex-direction: row;
`;

export default AdminChatModal