import About from "./Components/About_section"
import TechStack from "./Components/About_section"
import Footer from "./Components/Footer"
import Hero from "./Components/Hero_section"
import Navbar from "./Components/NavBar"
import Projects from "./Components/Project_section"
import PortfolioStats from "./Components/State_section"
import { ThemeProvider } from "./Components/Themecontext";

const App = () => {

    return (
        <>
            <ThemeProvider>
                <Navbar />
                <Hero />
                <About />
                <Projects />
                <PortfolioStats />
                <Footer />
            </ThemeProvider>





        </>
    )
}

export default App