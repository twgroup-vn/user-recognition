import React from 'react';
import Container from 'react-bootstrap/Container';
import './sass/main.scss';
import Home from './pages/Home';
import NavigationBar from './components/NavigationBar';

function App() {
  return (
    <>
        <NavigationBar />
        <main className="main-content">
            <section>
                <Home />
            </section>
        </main>
        {/* <footer className="footer">
            <Container>
                <h4 style={{textAlign: 'center'}}>TWG 2020</h4>
            </Container>
        </footer> */}
    </>
  );
}

export default App;
