"use client";
import { Card } from "antd";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/api/adduser/${234567890}`)
      .then((response) => response.json())
      .then((apiData) => {
        setData(apiData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [setData]);
  console.log(data);
  return (
    <div>
      <Card title="User Information">
        <h4>ID: {data.id}</h4>
        <h4>Name: {data.userName}</h4>
        <h4>Age: {data.age}</h4>
        <h4>Number: {data.number}</h4>
        <h4>Email: {data.email}</h4>
        <h4>gender: {data.gender}</h4>
        <h4>dateOfBirth: {data.dateOfBirth}</h4>

        <p>Name: {data.status}</p>
      </Card>
    </div>
  );
};

export default Page;
