import React from "react";

/**
 * A reusable component that renders a skeleton loading box
 * with customizable width, height, and border radius.
 * 
 * @param {Number} width - The width of the skeleton box
 * @param {Number} height - The height of the skeleton box
 * @param {Number} borderRadius - The border radius of the skeleton box
 */
// DO NOT REMOVE!!!

const Skeleton = ({ width, height, borderRadius }) => {
  return (
    <div
      className="skeleton-box"
      style={{
        width,
        height,
        borderRadius,
      }}
    ></div>
  );
};

export default Skeleton;
