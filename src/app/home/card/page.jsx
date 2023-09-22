import { Card, Carousel } from "antd";
import Image from "next/image";
import Img1 from "../../../../public/Image/virat1.jpg";
import "./style.css";

const Cards = () => {
  return (
    <div>
      <Carousel autoplay>
        <div>
          <Card   className="cardimg" title="Card 1">
            <Image  className=""  src={Img1} />
          </Card>
        </div>
        <div>
          <Card title="Card 1">
            <Image src={Img1} />
          </Card>
        </div>
        <div>
          <Card title="Card 1">
            <Image src={Img1} />
          </Card>
        </div>
      </Carousel>
    </div>
  );
};

export default Cards;
