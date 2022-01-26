import logo from './logo.svg';
import './App.css';
import { Button, Container, Row, Col } from "react-bootstrap";
import Header from './screens/Header';
import GetPosts from './screens/GetPosts';
import NewPosts from './screens/NewPosts';

function App() {
  return (
    <div>
      <Container>
        <Header />
        <NewPosts />
        <GetPosts />
      </Container>
    </div>
  );
}

export default App;
