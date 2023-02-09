import React, { useContext, useEffect, useState } from "react";

import { RadioGroup } from "@headlessui/react";
import { getTitles, getNote, noteAdd } from "../../utilities/coreServiceAPI";
import formatDistance from "date-fns/formatDistanceToNow";
import NoteDetail from "../NoteDetail/NoteDetail";

import Datetime from 'react-datetime';

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import {
  collection,
  /* getDocs, where, */ query,
  /* orderBy, */ onSnapshot /* getDoc, doc */,
} from "firebase/firestore";
import { db } from "../../firebase-config";
import toast, { Toaster } from "react-hot-toast";
import { themeContext } from "../../context/useThemeContext";

import { validateInput } from "../../utilities/validate";

const plans = [
  {
    name: "Startup",
  },
  {
    name: "Business",
  },
  {
    name: "Enterprise",
  },
];

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
const Sidebar = () => {
  const [selected, setSelected] = useState(plans[0]);
  const [note, setNote] = useState({});
  const [title, setTitle]=useState('');
  const [noteTitles, setNoteTitles] = useState([]);

  const theme=useContext(themeContext);
  const darkMode=theme.state.darkMode;

  useEffect(() => {
    const getTitlesinfirebase = async () => {
      const q = query(collection(db, "notes"));
      onSnapshot(q, (querySnapshot) => {
        setNoteTitles(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    };
    getTitlesinfirebase();

    // getTitles().then(res=>{
    //   setNoteTitles(res.data.notesApp);
    //   console.log(res.data.notesApp);
    // }).catch(error=>console.log(error));
    // loadingbar
  }, []);

  async function handleGetNote(id) {
    let getNotePromise = getNote(id);
    getNotePromise
      .then((res) => {
        if (res && res.error) {
          console.error(res.error);
        } else {
          setNote(res);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function handleAdd() {
    const today = Date.now();
    const data={
      title:title?title:"null",
      content:note.data.content?note.data.content:"null",
      createdAt:new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(today),
    }
    validateInput(title).then(res=>{
      if(res){
        let nodeAddPromise=noteAdd(data);
        toast.promise(nodeAddPromise,{
        loading:'please wait',
        success:<b>note successfully added</b>,
        error:<b>note could not be saved</b>
        })
      }
      else{
        toast.error("f*cking shit")
      }
    })
  }

  async function handleClear(){
    setNote("");
  }
  async function handleDelete(id){

  }
  async function handleController(){
    
  }
  return (
    <>
      <div className="row-span-3 flex flex-col">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
        <div className="w-full px-4 py-16">
          <div className="mx-auto w-full max-w-md">
            <RadioGroup value={selected} onChange={setSelected}>
              <div className="space-y-2">
                {noteTitles &&
                  noteTitles?.sort((noteDetail)=>noteDetail.data.updateBy?noteDetail.data.updateBy:noteDetail.data.createdAt).map((noteDetail) => (
                    <RadioGroup.Option
                      onClick={() => handleGetNote(noteDetail.id)}
                      key={noteDetail.id}
                      value={noteDetail.id}
                      className={({ active, checked }) =>
                        `${
                          active
                            ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300"
                            : ""
                        }
                  ${
                    checked ? "bg-sky-900 bg-opacity-75 text-white" : "bg-white"
                  }
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                      }
                    >
                      {({ active, checked }) => (
                        <>
                          <div className="flex w-full items-center justify-between">
                            <div className="flex items-center">
                              <div className="text-sm">
                                <RadioGroup.Label
                                  as="p"
                                  className={`font-medium  ${
                                    checked ? "text-white" : "text-gray-900"
                                  }`}
                                >
                                  {!noteDetail.data.title
                                    ? null
                                    : noteDetail.data.title}
                                </RadioGroup.Label>
                                <RadioGroup.Description
                                  as="span"
                                  className={`inline ${
                                    checked ? "text-sky-100" : "text-gray-500"
                                  }`}
                                >
                                  <span aria-hidden="true">
                                    {!noteDetail.data.updatedAt
                                      ? formatDistance(
                                        new Date(noteDetail.data.createdAt),
                                        { addSuffix: true }
                                      )
                                      : formatDistance(
                                          new Date(noteDetail.data.updatedAt),
                                          { addSuffix: true }
                                        )}
                                  </span>{" "}
                                </RadioGroup.Description>
                              </div>
                            </div>
                            {checked && (
                              <div className="shrink-0 text-white">
                                <CheckIcon className="h-6 w-6" />
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </RadioGroup.Option>
                  ))}
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>
      <div
        className=" flex flex-col w-full px-4 py-16
     "
      >
        <div className="flex items-center border-b border-teal-500 py-2">
          <input onChange={(e)=>setTitle(e.target.value)}
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Note title"
            aria-label="Full name"
          />
          <button onClick={()=>handleAdd()}
            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="button"
          >
            Add to note
          </button>
          <button onClick={()=>handleClear()}
            className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded"
            type="button"
          >
            Clear
          </button>
          <button onClick={()=>handleDelete(note.data.id)}
            className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded"
            type="button"
          >
            Delete
          </button>
        </div>
        <CKEditor
          editor={ClassicEditor}
          data={note.data && note.data.content ? note.data.content : ""}
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
          }}
          onChange={(event, editor) => {
            setNote({ data: { content: editor.getData() } });
          }}
          onBlur={(event, editor) => {}}
          onFocus={(event, editor) => {}}
        />
        <button onClick={()=>handleController()} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Button
</button>
      </div>
    </>
  );
};
export default Sidebar;
