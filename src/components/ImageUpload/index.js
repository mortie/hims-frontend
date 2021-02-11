import React from "react";
import PropTypes from "prop-types";

export default function ImageUpload(props) {
  const { id, className, onDone } = props;
  const handleChange = (event) => {
    if (event.target.files.length <= 0) {
      console.log("No file selected");
      return;
    }
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const fileInfo = {
        name: file.name,
        type: file.type,
        size: Math.round(file.size / 1000) + " kB",
        base64: reader.result,
        file: file,
      };

      onDone(fileInfo);
    };
  };

  return (
    <input
      id={id}
      accept="image/*"
      type="file"
      onChange={(e) => handleChange(e)}
      className={className}
    />
  );
}

ImageUpload.propTypes = {
  onDone: PropTypes.func,
  className: PropTypes.string,
  id: PropTypes.string
};
