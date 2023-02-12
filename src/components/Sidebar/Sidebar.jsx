import React, { useContext, useEffect, useState } from "react";

import { RadioGroup } from "@headlessui/react";
import { getTitles, getNote, noteAdd, noteDelete, noteUpdate } from "../../utilities/coreServiceAPI";
import formatDistance from "date-fns/formatDistanceToNow";




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
  const [note, setNote] = useState();
  const [content, setContent]=useState();
  const [title, setTitle]=useState('');
  const [noteTitles, setNoteTitles] = useState([]);

  const theme=useContext(themeContext);
  const darkMode=theme.state.darkMode;



  useEffect(() => {
    const getTitles = async () => {
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
    getTitles();


  }, []);

  async function handleGetNote(id) {
    let getNotePromise = getNote(id);
    getNotePromise
      .then((res) => {
        setNote(res);
        setContent(res.data.content)
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function handleAdd() {
    const today = Date.now();
    validateInput(title).then(res=>{
      if(res){
        const data={
          title:title?title:"null",
          content:content?content:"null",
          createdAt:new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(today),
          updateAt:new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(today),
        }
        let noteAddPromise=noteAdd(data);
        toast.promise(noteAddPromise,{
        loading:'please wait',
        success:<b>note successfully added</b>,
        error:<b>note could not be added</b>
        })
        setTitle('');
      }
      else{
        toast.error("f*cking shit")
      }
    })
  }

  async function handleClear(){
    setContent('');
  }

  async function handleDelete(id){
    let noteDeletePromise=noteDelete(id);
    toast.promise(noteDeletePromise,{
      loading:'please wait',
      success:<b>note successfully deleted</b>,
      error:<b>note could not be deleted</b>
    })

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
                  noteTitles?.sort((noteDetail)=>noteDetail.data.updateAt?noteDetail.data.updateAt:noteDetail.data.createdAt).map((noteDetail) => (
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
                              <div className="shrink-0 text-white flex flex-row">
                                 <button onClick={()=>handleDelete(noteDetail.id)} class="inline-flex items-center px-3 py-2 bg-red-500 hover:bg-red-700 text-white text-sm font-medium rounded-md">
                                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                  </button>
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
        <div className="border-dashed border-2 space-x-2 border-sky-500 mb-2 flex items-center border-b border-teal-500 py-2">
          <input value={title} onChange={(e)=>setTitle(e.target.value)}
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="input note title"
            aria-label="Full name"
          />
          <button onClick={()=>handleAdd()}
            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="button"
          >
            Add to note
          </button>
          {/* <button onClick={()=>handleSave(note.id,note.data.title)}
            className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="button"
          >
            Save
          </button> */}
          <button onClick={()=>handleClear()}
            className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded"
            type="button"
          >
            Clear
          </button>
          
        </div>
        <CKEditor
          editor={ClassicEditor}
          data={content && content ? content : ""}
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
          }}
          onChange={(event, editor) => {
            setContent(editor.getData())
          }}
          onBlur={(event, editor) => {}}
          onFocus={(event, editor) => {}}
        />
        
      </div>
    </>
  );
};
export default Sidebar;
