import React, {useCallback, useState, useEffect} from 'react'
import {useDropzone} from 'react-dropzone'
import { Body } from 'ui/texts/body';
import {imgUrlState} from "atoms/atoms"
import { useSetRecoilState, useRecoilState, useRecoilValue } from 'recoil';
import css from "./index.css"

type props = {
  imgUrl?: string
}

export function MyDropzone(p: props) {
  const [files, setFiles] = useState([]);
  const [imgUrl, setImgUrl] = useRecoilState(imgUrlState)
  const [imgBase64State, setImgBase64State] = useState("")
  const [propImgUrl, setpropImgUrl] = useState("")
  // const propImgUrlAtomValue = useRecoilValue(propImgUrlAtom)
  const setImgUrlState = useSetRecoilState(imgUrlState)

    useEffect(()=>{
      if (p.imgUrl) {
        setImgUrl(p.imgUrl)
      }
    }, [])
  
    useEffect(()=>{
      setImgUrl(imgBase64State)
    }, [imgBase64State])

    useEffect(()=>{
      setpropImgUrl(p.imgUrl)
      setImgUrlState(p.imgUrl)
      // console.log(p.imgUrl);
       
    }, [p.imgUrl])

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
  }, onDrop: useCallback(async acceptedFiles => {
    setFiles(acceptedFiles.map(file => {      
      setpropImgUrl("")
      return Object.assign(file, {
        preview: URL.createObjectURL(file)
      })
    }));
    
    const imgBase64 = await getBase64(acceptedFiles[0])
    setImgBase64State(imgBase64 as any)
  }, [])})

  const thumbs = propImgUrl == ""?
  files.map(file => (
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
  )) : 
  <div style={thumb}>
      <div style={thumbInner}>
        <img
          src={propImgUrl}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => { URL.revokeObjectURL(p.imgUrl) }}
        />
      </div>
    </div> ;


  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
        <Body className={css["dropzone-text"]}>Arrastrá una foto o haz click aquí para seleccionar un archivo</Body>       
      <aside style={thumbsContainer as any}>
        {thumbs}
      </aside>
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
  