import { faCapsules } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
    return (
        <footer className="linear-bg p-4 text-center">
            <header className="hover-color flex text-4xl justify-center">
                <FontAwesomeIcon icon={faCapsules} className="my-1 ml-2 w-10"/>
                <h1>دواء</h1>
            </header>
            <p className="text-md mt-3">بتبرعك تخفف عنهم ما أصابهم وتكون خير عونٍ لهم</p>
            
            <section className="mt-4 border-t border-[#ADE8F4] pt-3 text-sm">
                <p><a className="hover:text-[#023E8A]" href="https://d7mi-b.github.io/abdulrahman/">عبدالرحمن بهيان</a> &copy; 2023</p>
            </section>
        </footer>
    )
}

export default Footer;