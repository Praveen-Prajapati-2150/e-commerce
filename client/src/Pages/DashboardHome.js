import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteProduct,
  getProductsByUser,
} from '../redux/featuers/productSlice';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { GrUpdate } from 'react-icons/gr';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';

const excerpt = (str, count) => {
  if (str.length > count) {
    str = str.substring(0, count) + ' ...';
  }
  return str;
};

const DashboardHome = () => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { admin } = useSelector((state) => ({ ...state.admin }));
  const { userProducts, loading } = useSelector((state) => ({
    ...state.product,
  }));
  const dispatch = useDispatch();
  const userId = user?.result?._id;
  const adminId = admin?.result?._id;

  // const [userId, setUserId] = useState(userId_)

  // console.log(userId);
  console.log(adminId);

  // useEffect(() => {
  //   if (userId) {
  //     dispatch(getProductsByUser({ userId, toast }));
  //   }
  // }, [userId]);

  useEffect(() => {
    if (adminId) {
      dispatch(getProductsByUser({ adminId, toast }));
    }
  }, [adminId, dispatch]);

  function handleDelete(id) {
    if (window.confirm('Are you sure you want to delete this Product?')) {
      dispatch(deleteProduct({ id, toast }));
    }
  }

  if (userProducts.length === 0) {
    return <p>You have not added any Product yet.</p>;
  }

  return (
    <Main>
      {userProducts?.map((product, index) => {
        return (
          <Product key={index}>
            <Link key={index} to={`/product/${product._id}`}>
              <div className={'image'}>
                {product.imageFile ? (
                  <img
                    src={process.env.REACT_APP_IMAGE_PATH + product.imageFile}
                    alt={'prod'}
                  />
                ) : (
                  <img src={'/assets/product/no__product.png'} alt={'prod'} />
                )}
              </div>
            </Link>

            <h3>{excerpt(product.title, 20)}</h3>
            <h4>From ₹{product.price}</h4>
            <label>{excerpt(product.description, 30)}</label>
            <div className={'buttons'} onClick={(e) => e.stopPropagation()}>
              <Link to={`/admin/update_tour/${product._id}`}>
                <button title="Update Product">
                  <GrUpdate />
                </button>
              </Link>
              <button
                title="Delete Product"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(product._id);
                }}
              >
                <MdDelete />
              </button>
            </div>
          </Product>
        );
      })}
    </Main>
  );
};
export default DashboardHome;

const Main = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 2% 2% 6% 2%;

  a {
    text-decoration: none;
  }
`;

const Product = styled.div`
  padding: 10px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-decoration: none;
  background-color: white;
  border-radius: 4px;
  box-shadow: 2px 2px 5px #dbdbdb, -2px -2px 5px #ffffff;
  margin: 0 25px 25px 0;

  .image {
    //height: auto;
    max-width: 300px;
    max-height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    //background-color: lightgreen;

    img {
      max-width: 300px;
      max-height: 200px;
      //width: 100%;
      //height: 100%;
    }

    &:hover {
      transform: scale(1.015);
    }
  }

  h3,
  h4,
  label {
    text-align: center;
    white-space: nowrap;
    text-decoration: none;
  }

  h3 {
    font-size: 1rem;
    font-weight: 500;
    padding: 10px 0 0 0;
    text-decoration: none;
  }

  h4 {
    font-size: 1.1rem;
    color: #5db45d;
    font-weight: 400;
    padding: 5px 0 0 0;
  }

  label {
    font-size: 0.9rem;
    color: #a2a2a2;
    padding: 5px 0 0 0;
  }

  .buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0;

    button {
      border: none;
      outline: none;
      background-color: greenyellow;
      color: white;
      padding: 5px 10px;
      font-size: 20px;
      border-radius: 4px;
      cursor: pointer;

      &:nth-child(2) {
        background-color: darkred;
      }
    }
  }
`;
