"use client";
import { Button, Table, message } from "antd";
const getuser = async () => {
  let data = await fetch("http://localhost:3000/api/products");
  data = await data.json();
  if (data.success) {
    return data.result;
  } else {
    return { success };
  }
};
const update = async () => {
  let productid = props.params.editproduct;
  let data = await fetch("http://localhost:3000/api/products" + productid, {
    method: "PUT",
    body: JSON.stringify({ name, email, number, dob }),
  });
  data = await result.json();
  if (data.result) {
    message.success("mobarakho");
  }
};
export default async function Page() {
  const user = await getuser();

  const columns = [
    {
      title: "name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Number",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "DOB",
      dataIndex: "dob",
      key: "dob",
    },
    {
      title: "Action",
      dataIndex: "Action",
      key: "action",
      render: () => {
        return <Button onClick={update}>edit</Button>;
      },
    },
  ];

  return (
    <div>
      <h1>UserList</h1>
      <Table dataSource={user} columns={columns} />
    </div>
  );
}
