import "./App.css";
import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function App() {
  const [userName, setUserName] = React.useState("");
  const [userMessage, setUserMessage] = React.useState("");
  const [messageList, setMessageList] = React.useState([]);
  const [getMessages, setGetMessages] = React.useState(true);

  const handleSubmitFeedback = () => {
    if (userName == "") {
      document.getElementById("error-message-name").style.display = "block";
      return;
    }
    if (userMessage == "") {
      document.getElementById("error-message-feedback").style.display = "block";
      return;
    }
    fetch(
      "https://materialui-e3fcf-default-rtdb.asia-southeast1.firebasedatabase.app/feedback.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: userName,
          userMessage: userMessage,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUserMessage("");
        setUserName("");
        setGetMessages(true)
      });
      alert(`${userName}, your feedback is received.`);
      userName("");
      userMessage("");
  };

  useEffect(() => {
    if (getMessages) {
      fetch(
        "https://materialui-e3fcf-default-rtdb.asia-southeast1.firebasedatabase.app/feedback.json"
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          const loadedFeedback = [];
          for (const key in data) {
            loadedFeedback.push({
              id: key,
              userName: data[key].userName,
              userMessage: data[key].userMessage,
            });
          }
          console.log(loadedFeedback);
          setMessageList(loadedFeedback);
        });
      setGetMessages(false);
    }
  }, [getMessages]);

  return (
    <>
      <div className="app-container">
        <div className="app-heading">
          <h1>
            Send your <span>Feedback</span> to us
          </h1>
        </div>

        <div className="form-container">
          <TextField
            id="filled-basic"
            label="Name Please"
            value={userName}
            variant="filled"
            required
            sx={{ width: "43%" }}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <div id="error-message-name">Please Enter Your Name</div>

          <TextField
            id="filled-multiline-flexible"
            label="Feedback Please"
            multiline
            maxRows={7}
            variant="filled"
            value={userMessage}
            required
            sx={{ width: "43%" }}
            onChange={(e) => {
              setUserMessage(e.target.value);
            }}
          />
          <div id="error-message-feedback">Please Enter Feedback</div>

          <Button
            variant="outlined"
            color="inherit"
            onClick={handleSubmitFeedback}
          >
            Submit Feedback{" "}
          </Button>
        </div>

        <div className="feedback-container">
          <p>N<span>ame</span></p>
          <p className="feedback">Feed<span>backs</span></p>
          {
            messageList && messageList.map((item, index) => {
              return(
                <TableContainer >
                  <Table sx={{ minWidth: 250 }} size="small" aria-label="a dense table">                    
                    <TableHead>
                      <TableRow>
                        <TableCell>{item.userName}</TableCell>
                        <TableCell align="right">{item.userMessage}</TableCell>
                      </TableRow>
                    </TableHead>
                  </Table>
                </TableContainer>
              )
            })
          }
        
      </div>
      </div>

      
    </>
  );
}

export default App;
