import React, {useRef, useState} from 'react';
import {toast} from 'sonner';
import {useDragAndDrop} from "../hooks/useDragAndDrop.js";
import HorizontalArrow from "./Icons/HorizontalArrow.jsx";
import validateFile from "../utils/validate-file.js";
import convertToCSV from "../utils/convert-array.js";
import FileOutput from "./FileOutput.jsx";

const API_URL = '/api/split-name';

function MyReactComponent({inputName, title}) {
  const [output, setOutput] = useState({url: '', data: []})
  const [hasFile, setHasFile] = useState(false);
  const fileInputRef = useRef(null);
  const {isDragActive, handleDragOver, handleDragLeave, handleDragEnter, handleDrop} = useDragAndDrop(afterDrop)

  function afterDrop(e) {
    const files = e.dataTransfer.files;
    if (files.length && validateFile(files[0])) {
      fileInputRef.current.files = e.dataTransfer.files;
      setHasFile(true)
      setOutput({url: '', data: []})
    } else {
      toast.error('Please upload a valid file (csv or json).', {
        position: 'top-center',
        className: '!text-red-800',
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fileInput = e.target.elements[inputName]
    const file = fileInput.files[0];
    if (!file) return

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(API_URL, {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    if (!Array.isArray(result)) return

    const isCSV = file.type === 'text/csv'
    const data = isCSV ? convertToCSV(result) : result
    const blob = new Blob([data], {type: isCSV ? 'text/csv;charset=utf-8;' : 'application/json'});
    const url = URL.createObjectURL(blob);
    setOutput(() => ({url: url, data: result.slice(0, 3)}))
  }

  // revoke the URL when the component unmounts
  React.useEffect(() => {
    return () => {
      if (output.url) {
        URL.revokeObjectURL(output.url);
      }
    };
  }, [output]);

  const handleInputOnChange = (e) => {
    if (!!e.target.files.length && !hasFile) {
      setHasFile(true)
    }
  }

  return (
    <section className="container flex flex-col gap-10">
      <form onSubmit={handleSubmit} id="convert-file"
            className={`h-box ${isDragActive ? '!bg-gray-600' : ''} ${hasFile ? 'text-gray-500' : ''}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
      >
        <label htmlFor="input-file" className="mb-5">{hasFile ? 'Now, convert the file!' : title}</label>
        <div className="flex flex-col items-center gap-8 justify-center mt-7 md:flex-row md:gap-5">
          <input onChange={handleInputOnChange} ref={fileInputRef} name={inputName} required id="input-file" type="file"
                 className={`file-input file-input-bordered w-full max-w-xs ${hasFile ? 'text-white' : ''}`}
                 accept=".json,.csv"/>
          <button className={`btn text-xl btn-outline ${hasFile ? 'text-white' : ''}`} disabled={!hasFile}>Convert
          </button>
          {
            (hasFile && !output.data.length) &&
            <div className='relative'>
              <HorizontalArrow className='absolute w-10 h-[50px] h-arrow-bounce text-white'/>
            </div>
          }
        </div>
      </form>
      <FileOutput data={output}/>
    </section>
  );
}

export default MyReactComponent;
