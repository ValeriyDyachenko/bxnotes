import React from 'react'
import styled from 'styled-components'
import img404 from '../assets/404.jpg'

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`

const Page404 = () => (
  <>
    <h1>404: кот страницы не найден</h1>
    <Image src={img404} alt="page not found" />
  </>
)

export default Page404
