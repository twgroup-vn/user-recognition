import React from 'react';
import './sass/main.scss';
import Home from './pages/Home';
// import NavigationBar from './components/NavigationBar';

function App() {
  return (
    <>
        {/* <NavigationBar /> */}
        <main className="main-content">
            <section>
                <Home />
            </section>
        </main>
    </>
  );
}

export default App;
