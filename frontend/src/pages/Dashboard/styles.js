import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;
  max-width: 920px;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 50px;

    h1 {
      color: #fff;
      font-size: 32px;
      font-family: 'Roboto';
      opacity: 0.9;
    }

    button {
      max-width: 175px;
    }
  }
`

export const MeetUp = styled.li`
  list-style: none;
  background: rgba(0, 0, 0, 0.1);
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  border-radius: 5px;
  padding: 20px 50px;
  cursor: pointer;

  strong {
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    font-family: 'Roboto';
    opacity: 0.9;
  }

  div {
    display: flex;
    align-items: center;
  }

  time {
    color: rgba(255, 255, 255, 0.6);
    font-size: 16px;
    font-family: 'Roboto';
    margin: 0 10px;
  }
`

export const Alert = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    max-width: 520px;
    color: #fff;
    text-align: center;
    margin-top: 20px;
  }
`
