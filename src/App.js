import { Button, Container, Row, Col } from "react-bootstrap";
import Header from './screens/Header';
import GetPosts from './screens/GetPosts';
import NewPosts from './screens/NewPosts';
import Footer from "./screens/Footer";

function App() {
  return (
    <div>
      <Container>
        <Header />
        <NewPosts />
        <GetPosts />
        <Footer />
      </Container>
    </div>
  );
}

export default App;
