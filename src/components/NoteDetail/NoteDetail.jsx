import "./NoteDetail.css";

import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { getNote } from "../../utilities/coreServiceAPI";


const NoteDetail =({id})=>{
    
    console.log(id);
    const [note, setNote]=useState();

    useEffect(()=>{
        getNote(id).then(res=>console.log(res));
    },[])

    const handleSubmit=async()=>{
        console.log(note);
    }


  return (
    <>
    
    <div className=" flex flex-col w-full px-4 py-16
     ">
        
    <CKEditor
                editor={ ClassicEditor }
                data={note}
                onReady={ editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log( 'Editor is ready to use!', editor );
                } }
                onChange={ ( event, editor ) => {
                    setNote(editor.getData());

                } }
                onBlur={ ( event, editor ) => {

                } }
                onFocus={ ( event, editor ) => {

                } }
            />
    </div>
            <button onClick={()=>handleSubmit()}>submit</button>

   
    </>
       
    
);

}
export default NoteDetail;