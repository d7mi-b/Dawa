import { faCapsules } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Login from "~/components/Login";
import Signup from "~/components/Signup";

export default function Home() {

  return (
    <>
      <main className="py-4 px-8 grid grid-cols-2 mb-8 min-h-screen max-lg:grid-cols-1  max-lg:text-center">
        <header className="flex flex-col justify-center">
          <h1 className="header-color flex text-4xl max-lg:justify-center">
            <FontAwesomeIcon icon={faCapsules} className=" ml-2 w-14"/>
            <p>منصة دواء</p>
          </h1>

          <h3 className="text-xl my-4">
            مرضى محتاجون تكالبت عليهم هموم الصحة والمال،
            ما جعلهم يعانون من صعوبةٍ في توفير احتياجاتهم 
            الصحية اللازمة, بتبرعك تخفف عنهم ما أصابهم 
            وتكون خير عونٍ لهم
          </h3>

          <section>
            <button className="btn font-semibold linear-bg max-sm:w-full max-lg:w-96 max-lg:mt-3 max-lg:py-4" id="btnSignupHeroSec">
              تسجيل 
            </button>
          </section>

        </header>

        <section className="grid grid-cols-2 gap-4">
          <section className="translate-y-20">
            <img src="images/image2.png" alt="Dawa" />
          </section>

          <section>
            <img src="images/image1.png" alt="Dawa" />
          </section>
        </section>

      </main>

      <Login />
      <Signup />
    </>
  );
}
