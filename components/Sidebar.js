// Import Lib & Tools
import styled from "styled-components";
import { Avatar, IconButton, Button } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVerIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import * as EmailValidator from "email-validator";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

// Import Component
import Chat from "./Chat";
// Return Page

const Sidebar = () => {
  const [user] = useAuthState(auth);
  const userChatRef = db
    .collection("chat")
    .where("users", "array-contains", user.email);
  const [chatSnapShot] = useCollection(userChatRef);
  const createChat = () => {
    const input = prompt(
      "رجاءاً ادخل البريد الإلكتروني للمستخدم المُراد التحدث له"
    );

    if (!input) return null;

    if (
      EmailValidator.validate(input) &&
      !chatAlreadyExist(input) &&
      input !== user.email
    ) {
      db.collection("chat").add({
        users: [user.email, input],
      });
    }
  };

  const chatAlreadyExist = (resptionEmail) =>
    !!chatSnapShot?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === resptionEmail)?.length > 0
    );
  return (
    <>
      <Container>
        <Header>
          <UserAvatar src={user.photoURL} onClick={() => auth.signOut()} />
          <IconContainer>
            <IconButton>
              <ChatIcon />
            </IconButton>
            <IconButton>
              <MoreVerIcon />
            </IconButton>
          </IconContainer>
        </Header>
        <Search>
          <SearchIcon />
          <SearchInput placeholder="بحث في الرسائل" />
        </Search>
        <ButtonSetNewChat>
          <TextInButtonSetNewChat onClick={createChat}>
            بدء محادثة جديدة
          </TextInButtonSetNewChat>
        </ButtonSetNewChat>
        {chatSnapShot?.docs.map((chat) => {
          return <Chat key={chat.id} id={chat.id} users={chat.data().users} />;
        })}
      </Container>
    </>
  );
};

export default Sidebar;

// Styled Component

const Container = styled.div`
  direction: rtl;
  border-right: 1px solid whitesmoke;
  height: 100vh;
  min-width: 300px;
  max-width: 350px;
  overflow: scroll;

  ::-webkit-scrollbar{
    display:none;
  }

  -ms-overflow-style:none;
  scrollbar-width: none;
`;

const Header = styled.header`
  display: flex;
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 1;
  justify-content: space-between;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
`;

const SearchInput = styled.input`
  font-size: 15px;
  outline-width: 0;
  border: none;
  flex: 1;
  font-family: "Cairo", sans-serif;
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;

const ButtonSetNewChat = styled(Button)`
  width: 100%;
  &&& {
    border-bottom: 1px solid whitesmoke;
    border-top: 1px solid whitesmoke;
  }
`;

const TextInButtonSetNewChat = styled.span`
  font-size: 16px;
  font-weight: 700;
  font-family: "Cairo", sans-serif;
`;

const IconContainer = styled.div``;
