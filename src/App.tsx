import { useRef } from 'react';
import {
  Navigation,
  Hero,
  About,
  Gallery,
  Availability,
  Services,
  Contact,
  Footer
} from './components';

// Import animations
import './styles/animations.css';

function App() {
  const messageRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="min-h-screen bg-warmGray-900 text-white">
      <Navigation />
      <Hero />
      <About />
      <Gallery />
      <Availability messageRef={messageRef} />
      <Services />
      <Contact ref={messageRef} />
      <Footer />
    </div>
  );
}

export default App;
