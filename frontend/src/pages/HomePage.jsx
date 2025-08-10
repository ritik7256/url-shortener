import UrlForm from "../components/UrlForm";
import UrlList from "../components/UrlList";
import { useState, useEffect } from "react";
import {useDispatch} from "react-redux"
import { setUrls } from "../redux/slices/urlSlice";
export default function HomePage() {
  
  const dispatch=useDispatch()
  const fetchUrls = async () => {
    const res = await fetch("http://localhost:5000/api/urls");
    const data = await res.json();
    dispatch(setUrls(data))
    
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  return (
    <div className="space-y-6">
      <UrlForm onUrlCreated={fetchUrls} />
      <UrlList/>
    </div>
  );
}
