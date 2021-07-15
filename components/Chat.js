import { Avatar } from "@material-ui/core";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { auth, db } from "../firebase";
import getRecipientEmail from "../utils/getRecipientEmail";
import { ThreeBounce } from "better-react-spinkit";
import { useRouter } from "next/router";
const Chat = ({ id, users }) => {

  const route = useRouter()
  const [user] = useAuthState(auth);
  const [resipientSnapShot] = useCollection(db.collection('users').where('email', '==', getRecipientEmail(users, user)))

  const enterChat = () => {
    route.push(`/chat/${id}`)
  }

  const RCE = getRecipientEmail(users, user);
  const recipient = resipientSnapShot?.docs?.[0]?.data(); 

  return (
    <Container onClick={enterChat} key={id}>
      {RCE ? (
        <>
          {recipient ? (
            <UserAvatar src={recipient?.photoURL}/>
          ): (
            <UserAvatar>{RCE[0]}</UserAvatar>
          )}
          <p> {RCE} </p>
        </>
      ) : (
        <ThreeBounce />
      )}
    </Container>
  );
};

export default Chat;

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  word-break: break-word;
  cursor: pointer;

  :hover {
    background-color: #e9eaeb;
  }
`;

const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
`;
