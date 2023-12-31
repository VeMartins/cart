// components
import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";
import { useAppContext } from "./context";

function App() {
  const { isLoading } = useAppContext();
  if (isLoading) {
    return (
      <main>
        <div className="loading"></div>
      </main>
    );
  }
  return (
    <main>
      <Navbar />
      <CartContainer />
    </main>
  );
}

export default App;
