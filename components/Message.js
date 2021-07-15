import styled from "styled-components";
import moment from "moment";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
const Message = ({ user, message }) => {
  const [userLoggedIn] = useAuthState(auth);
  const TypeOfMessage = user === userLoggedIn.email ? Sender : Reciever;
  console.log(message.message);
  return (
    <Container>
      <TypeOfMessage>
        {message.message}{" "}
        <TimesTamp>
          {message.timestamp ? moment(message.timestamp).format("LT") : "..."}
        </TimesTamp>
      </TypeOfMessage>
    </Container>
  );
};

export default Message;

const Container = styled.div``;

const MessageElement = styled.p`
  width: fit-content;
  padding: 15px;
  border-radius: 8px;
  margin: 10px;
  min-width: 60px;
  padding-bottom: 26px;
  position: relative;
  text-align: right;
  position: relative;
`;

const Sender = styled(MessageElement)`
  margin-left: auto;
  background-color: #dcf8c6;
`;
const Reciever = styled(MessageElement)`
  background-color: whitesmoke;
  text-align: left;
`;

const TimesTamp = styled.div`
  right: 6px;
  font-size: 6px;
  background: inherit;
  color: #6c6c6c;
  position: absolute;
  bottom: 5px;
  text-transform: lowercase;
`;
