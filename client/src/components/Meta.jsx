import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta
        http-equiv="Content-Security-Policy"
        content="upgrade-insecure-requests"
      />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Tuition System",
  keywords:
    "apu, student, education, performance system, tuition, spis, student performance improvement system",
};

export default Meta;
