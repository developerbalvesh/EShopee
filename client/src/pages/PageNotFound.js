import React from 'react'
import Layout from '../components/Layout/Layout'
import { Link } from 'react-router-dom'
import { TbShoppingBagX } from "react-icons/tb";

const PageNotFound = () => {
  return (
    <>
      <Layout title={"EShopee | Page not found"}>
        <div className='container not-found animate__animated animate__fadeIn'>
          <h1><TbShoppingBagX /> 404 <TbShoppingBagX /></h1>
          <p>Oops ! Page Not Found</p>
          <Link to="/">Go Home</Link>
        </div>
      </Layout>
    </>
  )
}

export default PageNotFound
