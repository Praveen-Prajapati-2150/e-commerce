import React from 'react';
import styled from "styled-components";
import {Link, useNavigate} from 'react-router-dom'
import {Box, Button, CenterDiv, Heading} from "../components/styles/Auth.styled";
import {Input} from "../components/styles/Input.styled";
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import LoadingSpinner from "../components/styles/LoadingSpinner";
import {toast} from 'react-toastify'
import {createProduct} from "../redux/featuers/productSlice";


const Dashboard_ = styled.div`
  height: 90vh;
  width: 100%;
  display: flex;
`
const AdminSideBar = styled.div`
  height: 100%;
  width: 20%;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
  padding: 20px 0;
  //background-color: darkblue;

  a {
    color: darkblue;
    text-decoration: none;
    font-size: 1.2rem;
    padding: 6px 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50px;
    transition: 0.4s;
    background-color: rgba(176, 176, 255, 0.58);

    &:hover {
      background-color: rgba(176, 176, 255, 0.58);
      background-color: darkblue;
      color: white;
    }
  }
`
const DashboardRight = styled.div`
  height: 100%;
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;

  select {
    outline: none;
    border: 1px solid lightgray;
    border-radius: 4px;
    margin: 4px 0 8px 0;
    padding: 8px 8px;
    color: grey;
  }
`


// const initialState = {
//   title: "",
//   description: "",
//   price: "",
//   category: "",
//   imageFile: "",
// }


const Dashboard = () => {
  // const [formData, setFormData] = useState(initialState);
  // const {title, description, price, category, imageFile} = formData;
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {loading, error} = useSelector((state) => ({...state.product}))
  const {user} = useSelector((state) => ({...state.auth}))
  const userId = user?.result?._id;

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  // const [imageFile, setImageFile] = useState(null)

  // console.log(formData)
  const [productFormData, setProductFormData] = useState(null)

  useEffect(() => {
    error && console.log(error)
  }, [error])

  useEffect(() => {
    setProductFormData(new FormData())
  }, [])

  useEffect(() => {
    if (!productFormData) return;
    productFormData.set('title', title);
    productFormData.set('description', description);
    productFormData.set('price', price);
    productFormData.set('category', category);
  }, [title, description, price, category, productFormData])

  const imageUpload = (e) => {
    // productFormData.set('imageFile', e?.target?.files[0])
    // setProductFormData(productFormData)
    console.log(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createProduct({productFormData, toast, navigate}))
    for (let pair of productFormData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }
  }

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   console.log("called")
  //   if (title && description && price && category) {
  //     const formValue = new FormData();
  //     formValue.append('imageFile', formData.imageFile, formData.imageFile.name)
  //     formValue.append('title', formData.title)
  //     formValue.append('description', formData.description)
  //     formValue.append('price', formData.price)
  //     formValue.append('category', formData.category)
  //
  //     dispatch(createProduct({formValue, toast, navigate}))
  //     // console.log("formValue", formValue)
  //
  //     //////////////////
  //     // for (let key in formValue) {
  //     //   console.log(key);
  //     // }
  //     //////////////////
  //     for (let pair of formValue.entries()) {
  //       console.log(pair[0] + ', ' + pair[1]);
  //     }
  //     //////////////////
  //
  //   }
  // }


  return (
    <Dashboard_>

      <AdminSideBar>
        <Link to={"/dashboard/add_product"}>Add Product</Link>
      </AdminSideBar>

      <DashboardRight>
        <Box>
          <Heading>Add Product</Heading>

          <label>Title</label>
          <Input type={"text"} value={title} label={"title"} name={"title"} onChange={(e) => setTitle(e.target.value)}
                 placeholder={"enter your username"}/>

          <label>Description</label>
          <Input type={"text"} value={description} name={"description"} onChange={(e) => setDescription(e.target.value)}
                 placeholder={"enter your username"}/>

          <label>Price</label>
          <Input type={"number"} value={price} name={"price"} onChange={(e) => setPrice(e.target.value)}
                 placeholder={"enter your username"}/>

          <label>Category</label>
          <select name={"category"} onChange={(e) => setCategory(e.target.value)}>
            <option hidden disabled>Category</option>
            <option value={"Grocery"}>Grocery</option>
            <option value={"Mobiles"}>Mobiles</option>
            <option value={"Fashion"}>Fashion</option>
            <option value={"Electronics"}>Electronics</option>
            <option value={"Home"}>Home</option>
            <option value={"Appliances"}>Appliances</option>
            <option value={"Travel"}>Travel</option>
            <option value={"Beauty"}>Beauty</option>
          </select>


          <label>ImageFile</label>
          <Input type={"file"} name={"imageFile"} onChange={imageUpload}/>

          <CenterDiv>
            <Button onClick={handleSubmit}>
              {
                loading ? <LoadingSpinner/> : "Add Product"
              }
            </Button>
          </CenterDiv>

          {/*<CenterDiv>*/}
          {/*  <label>Already Registered, click to go <Link to={"/login"}>Login</Link> page</label>*/}
          {/*</CenterDiv>*/}

        </Box>
      </DashboardRight>

    </Dashboard_>
  );
};

export default Dashboard;