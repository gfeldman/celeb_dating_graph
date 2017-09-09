import React from 'react'
import styled from 'styled-components'


export const Header = styled.header`
  text-align: center;
  font-size: 1em;
  font-family: 'Roboto',sans-serif;

`

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto',sans-serif;
    margin: auto;
    width: 80%;
    min-height: 80vh;

`
export const Main = (props) => {
  return(
    <Container>
    {props.children}
    </Container>
  )
}
