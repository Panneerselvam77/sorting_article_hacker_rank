import { useState, type JSX } from "react";
import Card from "react-bootstrap/Card";
import { HiHandThumbUp, HiHandThumbDown } from "react-icons/hi2";
import { mock_data } from "../mock/mockData.js";

interface mockDataType {
  title: string;
  id: number;
  upVote: number;
  downVote: number;
}
export default function FeedbackSystemCard(): JSX.Element {
  const [data, setData] = useState<mockDataType[]>(mock_data);

  const handleUpVote = (id: number): void => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, upVote: item.upVote + 1 } : item,
      ),
    );
  };

  const handleDownVote = (id: number): void => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, downVote: item.downVote + 1 } : item,
      ),
    );
  };

  return (
    <div className="container">
      <h1>Feedback System Card</h1>
      {data.map((item) => (
        <Card style={{ width: "18rem" }} key={item.id}>
          <Card.Body>
            <Card.Title>Readability</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              <div className="hand-box-container">
                <div
                  className="hand-box up"
                  style={{ backgroundColor: "green" }}
                  onClick={() => handleUpVote(item.id)}
                >
                  <HiHandThumbUp />
                </div>
                <div
                  className="hand-box down"
                  style={{ backgroundColor: "red" }}
                  onClick={() => handleDownVote(item.id)}
                >
                  <HiHandThumbDown />
                </div>
              </div>
            </Card.Subtitle>
            <Card.Text>
              <p>Up vote: {item.upVote}</p>
              <p>Down vote: {item.downVote}</p>
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
