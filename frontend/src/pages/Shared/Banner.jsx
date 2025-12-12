import Lottie from 'lottie-react';
import LottieHome from "../../assets/lotties/Home.json"

const Banner = () => {
    return (
        <div className="text-center ">
            <h1 className="font-bold text-3xl my-5">Welcome to SmarTemu</h1>
            <Lottie className="mx-auto max-w-[35%]" loop={true}  animationData={LottieHome}></Lottie>
        </div>
    );
};

export default Banner;