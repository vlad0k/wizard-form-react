import React from "react";
import classNames from "./index.module.css";
import { Formik, Form } from "formik";
import Select from "../../form/Select";
import TextArea from "../../form/TextArea";

const options = [
  "HTML",
  "CSS",
  "Javascript",
  "React",
  "Angular",
  "jQuery",
  "NodeJS",
  "Python",
  "PHP",
  "Ruby On Rails",
  "SQL",
  " BackboneJS",
  "Web Design",
  "Project management",
  "Git",
  "Docker",
  "AWS Lambda",
  "Firebase",
].map((el: string) => ({ value: el.toLowerCase(), label: el }));

const Step4Form = () => {
  return (
    <Formik
      initialValues={{ skills: "", additionalInfo: "", hobbies: "" }}
      onSubmit={(v) => console.log(v)}
    >
      <Form className={classNames.form}>
        <div className={classNames.column}>
          <Select name={"skills"} isMulti options={options} label={"Skills"} />
          <TextArea
            name={"additionalInfo"}
            label={"Additional Info"}
            maxlength={300}
          />
        </div>
      </Form>
    </Formik>
  );
};

export default Step4Form;
