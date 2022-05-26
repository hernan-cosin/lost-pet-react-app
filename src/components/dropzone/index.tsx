import React, {useCallback, useState, useEffect} from 'react'
import {useDropzone} from 'react-dropzone'
import { Button } from 'ui/buttons';
import { Body } from 'ui/texts/body';
import {imgUrlState} from "atoms/atoms"
import { useSetRecoilState } from 'recoil';
import css from "./index.css"

export function MyDropzone() {
    const [files, setFiles] = useState([]);
    const setImgUrl = useSetRecoilState(imgUrlState)
    const [imgBase64State, setImgBase64State] = useState("")

    useEffect(()=>{
      setImgUrl(imgBase64State)
      console.log("dropzone img base",imgBase64State);
      
    }, [imgBase64State])


    async function getBase64(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
    }

  const {getRootProps, getInputProps} = useDropzone({ maxFiles:1, accept: {
    'image/*': []
  },  onDrop: useCallback(async acceptedFiles => {
    setFiles(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })));

    const imgBase64 = await getBase64(acceptedFiles[0])
    setImgBase64State(imgBase64 as any)
  }, [])})

  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => { URL.revokeObjectURL(file.preview) }}
        />
      </div>
    </div>
  ));

  function imgButtonHandler (e) {
    e.preventDefault()
  }

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
        <Body className={css["dropzone-text"]}>Arrastrá una foto o utiliza el botón</Body>       
      <aside style={thumbsContainer as any}>
        {thumbs}
      </aside>
        <Button onClick={imgButtonHandler} color='yellow'>Seleccionar foto</Button>
    </div>
  )
}

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row' as 'FlexDirection',
    flexWrap: 'wrap',
    marginTop: 16
  };
  
  const thumb = {
    borderRadius: "4px",
    width: "100%",
    maxWidth: "350px",
    objectFit: "cover",
    border: "solid",
    height: "auto",
    margin: "0 0 20px 0"
  } as any;
  
  const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
  };
  
  const img = {
    display: "block",
    width: "100%",
    maxWidth: "100%",
    height: "100%"
  };
  