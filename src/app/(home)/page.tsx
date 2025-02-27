
import Image from "next/image";

const Home = () => {
  return (
    <div>
   <Image src={"/you.svg"}  height={50 } width={50} alt="Logo"/>
   <p className="text-xl font-semibold tracking-tight">NewTub22e</p>
    </div>
  );
};

export default Home;