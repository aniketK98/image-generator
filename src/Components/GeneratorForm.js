import React, { useState } from "react";
import axios from "../Axios";
import Spinner from "./Spinner";
import { v4 } from "uuid";

function GeneratorForm() {
  const [formData, setFormData] = useState({
    prompt: "",
    n: "2",
    size: "medium",
  });
  const [isLoading, setIsLoading] = useState(false);

  const [imagedata, setImageData] = useState([]);
  const { prompt, n, size } = formData;

  const onChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const getData = async () => {
      const data = {
        nString: n,
        size: size,
        prompt: prompt,
      };
      setIsLoading(true);
      const res = await axios.post("openai/imagegenerator", data);
      setImageData(res.data);
      setIsLoading(false);
      return res;
    };

    getData();
  };

  return (
    <>
      {isLoading ? (
        <>
          <Spinner />
        </>
      ) : (
        <div className="generatorForm">
          <h1>Describe an Image</h1>

          <form className="form" onSubmit={onSubmit}>
            <div className="form-group">
              <label>Describe an image: </label>

              <input
                type="text"
                className="input"
                value={prompt}
                onChange={onChange}
                placeholder="Enter Text"
                name="prompt"
                id="prompt"
                required
              />
            </div>
            <div className="form-group">
              <label>Select image size: </label>
              <select name="size" value={size} onChange={onChange}>
                <option value="small">Small(256x256)</option>
                <option value="medium">Medium(512x512)</option>
                <option value="large">Large(1024x1024)</option>
              </select>
            </div>
            <div className="form-group">
              <label>Select number of images: </label>
              <select name="n" value={n} onChange={onChange}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
            <div className="form-group">
              <button>Generate Image</button>
            </div>
          </form>
          <div className="imageContainer">
            {imagedata.map((image) => (
              <img src={image.url} className="image" key={v4()} alt="img" />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default GeneratorForm;
