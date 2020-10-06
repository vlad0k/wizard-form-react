import React from "react";
import classNames from "./index.module.css";
import { Formik, Form } from "formik";
import Select from "../../form/Select";
import TextArea from "../../form/TextArea";
import Checkbox from "../../form/CheckBox";

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
        <div
          className={[classNames.column, classNames.checkBoxGroup].join(" ")}
        >
          <label>My Hobbies</label>
          <Checkbox
            name={"sport"}
            label={"Sport, fitness, aerobica and staff like that"}
          />
        </div>
      </Form>
    </Formik>
  );
};

export default Step4Form;
