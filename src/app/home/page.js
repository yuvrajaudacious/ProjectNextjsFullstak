import React from "react";
import { Carousel } from "antd";
import Image from "next/image";
import profile from "../../../public/Image/ads.png";
import profile1 from "../../../public/Image/ads2.webp";
import profile2 from "../../../public/Image/ads3.webp";

const Home = () => {
  const contentStyle = {
    height: "160px",
  };

  return (
    <div>
      <Carousel autoplay>
        <div>
          <Image src={profile} alt="Virat Kohli" width={1310} height={140} />
        </div>
        <div>
          <Image src={profile1} alt="Virat Kohli" width={1310} height={140} />
        </div>
        <div>
          <Image src={profile2} alt="Virat Kohli" width={1310} height={140} />
        </div>
      </Carousel>
    </div>
  );
};

export default Home;
