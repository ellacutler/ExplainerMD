import { useState } from 'react';
import {Navbar} from "../components/Navbar";
import { isNotEmpty, useForm } from '@mantine/form';
import { addSymptomTrackerData } from '../config/firebaseconfig';
import { all } from 'axios';
import { Button, UnstyledButton } from '@mantine/core';


const Assistant = ( {user, allUsers} ) => {
  // const [count, setCount] = useState(0);

  const [messages, setMessages] = useState([]);
  const [loadingResponse, setLoadingResponse] = useState(false);

  const form = useForm({
    initialValues: {
      message: "",
    },
    validate: {
      message: isNotEmpty('Please enter a message.')
    }
  });

  const handleReset = () => {
    console.log("resetting assistant")
    return fetch("http://127.0.0.1:5000/resetassistant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        },
      }).then((response) => response.json())
      .then((data) => {
        console.log(data)
        setMessages([])
      })
      .catch((error) => {
        console.log(error);
        let newAssistantMessage = { message: "**Sorry, an error has occurred. Please try again later.**", isAssistant: true }
      }
    )
  };

  const handleSendMessage = async (message) => {
    if (message === "") {
      return;
    }
    setMessages([...messages, { message: message, isAssistant: false }]);
    setLoadingResponse(true);
    return fetch("http://127.0.0.1:5000/assistant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message,
          }),
        })
        .then((response) => response.json())
        .then((data) => {
          let newAssistantMessage = { message: data.message, isAssistant: true };
          setMessages((messages) => [...messages, newAssistantMessage]);
          setLoadingResponse(false);
        })
        .catch((error) => {
          console.log(error);
          let newAssistantMessage = { message: "**Sorry, an error has occurred. Please try again later.**", isAssistant: true }
          setMessages((messages) => [...messages, newAssistantMessage]);
        });
  }

  const handleAddSymptoms = (message) => {
    let updatedUserSymptoms;
    if (!allUsers[user.uid].symptoms) {
      updatedUserSymptoms = [message];
    } else {
      updatedUserSymptoms = [...allUsers[user.uid].symptoms, message];
    }
    addSymptomTrackerData(user.uid, updatedUserSymptoms);
    console.log(`added ${message} to symptoms`);
  }


  return (
    <div>
      <Navbar tab={'assistant'}/>
      {/* <button onClick={() => setCount(count + 1)}>Increment</button> */}
      <div className="flex h-screen antialiased text-gray-800">
        <div className="flex flex-row h-full w-full overflow-x-hidden">
          <div className="flex flex-col flex-auto h-full p-6">
            <div
              className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4"
            >
              <div className="flex flex-col h-full overflow-x-auto mb-4">
                <div className="flex flex-col h-full">
                  <div className="grid flex-col gap-y-2">
                    <ChatBubble 
                      key="welcome"
                      message="Hi there! I'm an AI symptom diagnosis assistant. Please tell me how you're feeling today, and I'll track these symptoms and do my best to provide an accurate assessment of them."
                      isAssistant={true}
                      // To receive an assessment of your symptoms, please enter the word 'Diagnosis.'
                    />
                    {/* {allUsers && allUsers[user.uid] && allUsers[user.uid].symptoms && allUsers[user.uid].symptoms
                      .filter((symptom) => {
                        return new Date(symptom.date) <= new Date();
                      })
                      .map((message, index) => (
                        <ChatBubble
                          message={message.message}
                          isAssistant={message.isAssistant}
                        />
                      ))
                    } */}
                    {messages.map((message, index) => (
                      <ChatBubble
                        key={index}
                        message={message.message}
                        isAssistant={message.isAssistant}
                        addSymptoms={handleAddSymptoms}
                      />
                    ))}
                    {loadingResponse && (
                      <ChatBubble 
                        key="loading"
                        message="..."
                        isAssistant={true}
                      />
                    )}
                    {/* <ChatBubble 
                      message="Hi there! I'm an AI symptom diagnosis assistant. Please tell me how you're feeling today, and I'll track these symptoms and do my best to provide an accurate assessment of your symptoms. To receive an assessment of your symptoms, please enter the word 'Diagnosis.'"
                      isAssistant={true}
                    />
                    <ChatBubble
                      message="I'm feeling a little sick today. I have a headache, and I'm feeling a little nauseous. I also have a sore throat."
                      isAssistant={false}
                    />
                    <ChatBubble 
                      message="I'm feeling great! I'm glad you're feeling better."
                      isAssistant={true}
                    /> */}
                  </div>
                </div>
              </div>
              <div
                className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
              >
                <div>
                  {/* <button
                    className="flex items-center justify-center text-gray-400 hover:text-gray-600"
                  > */}
                    {/* <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                      ></path>
                    </svg> */}
                    <Button
                      variant="subtle" 
                      gradient={{ from: 'indigo', to: 'cyan' }}
                      color="blue"
                      onClick={() => {
                        handleReset();
                      }}
                    >
                      Reset
                    </Button>
                  {/* </button> */}
                </div>
                <div className="flex-grow ml-4">
                  <div className="relative w-full">
                    <form id="chat-input" onSubmit={form.onSubmit((values) => {
                        console.log(values);
                        let newUserMessage = { message: values.message, isAssistant: false }
                        setMessages([...messages, newUserMessage]);
                        handleSendMessage(values.message);
                        form.reset();
                    })}>
                      <input
                        type="text"
                        className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                        {...form.getInputProps("message")}
                      />
                    </form>
                    {/* <button
                      className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                    </button> */}
                  </div>
                </div>
                <div className="ml-4">
                  <button
                    className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                    type="submit"
                    form='chat-input'
                  >
                    <span>Send</span>
                    <span className="ml-2">
                      <svg
                        className="w-4 h-4 transform rotate-45 -mt-px"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        ></path>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    
  );

}

const ChatBubble = ({ message, isAssistant, addSymptoms }) => {
  const [showNotif, setShowNotif] = useState(false);
  

  const handleShowAddSymptomSign = (show) => {
    console.log(`show add symptoms button: ${show}`);
    setShowNotif(show);
  }

  return (
    <UnstyledButton
      style={isAssistant ? {pointerEvents: "none"} : {}}
      onClick={() => {
        if (!isAssistant) {
          addSymptoms({
            SYMPTOM: message,
            TIME: new Date().toLocaleString(),
          });
        }
      }}
      onMouseEnter={() => {
        if (!isAssistant) {
          handleShowAddSymptomSign(true);
        }
      }}
      onMouseLeave={() => {
        if (!isAssistant) {
          handleShowAddSymptomSign(false);
        }
      }}
    >
      
      <div
      className={`col-start-${isAssistant ? 1 : 6} col-end-${isAssistant ? 8 : 13} p-3 rounded-lg ${
        isAssistant ? "justify-start" : "justify-end"
      }`}
      >
        <div
          className={`flex flex-row items-center ${
            isAssistant ? "flex-row" : "flex-row-reverse"
          }`}
        >
          <div
            className={`flex items-center justify-center h-10 w-10 rounded-full ${isAssistant ? "bg-indigo-500" : "bg-blue-300"} flex-shrink-0`}
          >
            {isAssistant ? "A" : "U"}
          </div>
          <div
            className={`relative ${
              isAssistant ? "ml-3" : "mr-3"
            } text-sm bg-${isAssistant ? "white" : "indigo-100"} py-2 px-4 shadow rounded-xl`}
          >
            <div>{message}</div>
          </div>
          {showNotif && !isAssistant && ( 
            <div>
              <p classname="text-xs">
                Add Symptoms to Log
              </p>
            </div>
          )}
        </div>
      </div>
    </UnstyledButton>
  );
};

export default Assistant;