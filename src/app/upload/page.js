"use client"
import { useState } from "react";
import { Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const ImageUploadForm = () => {
  const [fileList, setFileList] = useState([]);

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleUpload = async () => {
    const formData = new FormData();

    fileList.forEach((file) => {
      formData.append("image", file.originFileObj);
    });

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Uploaded file:", data);
        message.success("File uploaded successfully");
        // You can update your UI to display the uploaded image here.
      } else {
        console.error("Upload failed");
        message.error("Upload failed");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      message.error("Error uploading file");
    }
  };

  return (
    <div>
      <Upload
        beforeUpload={() => false}
        fileList={fileList}
        onChange={handleFileChange}
        accept="image/*"
      >
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
      <Button type="primary" onClick={handleUpload}>
        Upload
      </Button>
    </div>
  );
};

export default ImageUploadForm;
