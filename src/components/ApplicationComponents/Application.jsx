import { useState, useEffect, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import SignaturePad from "react-signature-canvas";

import styles from "./Application.module.css";

import FigletsIcon from "../../assets/icons/figlets-icon.png";

const Application = () => {
  const [formData, setFormData] = useState({});
  const [step, setStep] = useState(1);
  const sigPadRef = useRef();
  const formikRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const baseURL = import.meta.env.DEV ? "/api" : import.meta.env.VITE_API_URL;

  const nextStep = async (values) => {
    setFormData({ ...formData, ...values });
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((preVal) => preVal - 1);
  };

  const finalSubmission = async (values) => {
    setStep((preVal) => preVal + 1);
    const signatureDataURL = sigPadRef.current.toDataURL();

    const completedApplication = {
      ...formData,
      ...values,
      signature: signatureDataURL,
    };

    console.log("Application submitted on frontend");

    fetch(`${baseURL}/submit-application`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(completedApplication),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Server responded with ${res.status}`);
        console.log("Application submitted to backend");
      })
      .catch((err) => {
        console.error("ERROOOOOR:", err);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  return (
    <section className={styles["application-form-container"]}>
      {step === 1 && (
        <>
          <div className={styles["application-header-content"]}>
            <div>
              <h1>Job Application</h1>
              <h2>Figlet's Construction LLC</h2>
              <h3>166 Parlin Ln, Parlin, NJ 08859</h3>
              <h3>732-486-9760</h3>
            </div>
            {/* <img src={FigletsIcon} alt="Figlet's Construction LLC Icon" /> */}
          </div>
          <p className={styles["application-intro-text"]}>
            Figlet’s Construction LLC is an equal opportunity employer. This
            application will not be used for limiting or excluding any applicant
            from consideration for employment on a basis prohibited by local,
            state, or federal law.
            <br />
            <br />
            Should an applicant need reasonable accommodation in the application
            process, he or she should contact a company representative.
          </p>
        </>
      )}

      {step <= 5 && (
        <>
          <p className={styles["step-count"]}>Step {step}/5</p>
          <p>
            All fields marked with <span style={{ color: "red" }}>*</span> are
            required.
          </p>
        </>
      )}

      {step === 1 && (
        <Formik
          innerRef={formikRefs[0]}
          initialValues={{
            formDate: new Date().toLocaleDateString("en-CA"),
            fullName: formData.fullName || "",
            ssn: formData.ssn || "",
            address: formData.address || "",
            cityStateZip: formData.cityStateZip || "",
            phone: formData.phone || "",
            age: formData.age || "",
            dob: formData.dob || "",
            smoker: formData.smoker || "",
            citizenship: formData.citizenship || "",
            proofOfCitizenship: formData.proofOfCitizenship || "",
            drugTest: formData.drugTest || "",
            accommodations: formData.accommodations || "",
            accommodationsExplain: formData.accommodationsExplain || "",
            criminalHistory: formData.criminalHistory || "",
            criminalHistoryExplain: formData.criminalHistoryExplain || "",
            backgroundCheck: formData.backgroundCheck || "",
            medicalConditions: formData.medicalConditions || "",
            medicalConditionsExplain: formData.medicalConditionsExplain || "",
          }}
          validationSchema={Yup.object({
            fullName: Yup.string().required("Required"),
            ssn: Yup.string().required("Required"),
            address: Yup.string().required("Required"),
            cityStateZip: Yup.string().required("Required"),
            phone: Yup.string().required("Required"),
            age: Yup.number().required("Required"),
            dob: Yup.date().required("Required"),
            smoker: Yup.string().required("Please select an option"),
            citizenship: Yup.string().required("Please select an option"),
            proofOfCitizenship: Yup.string().required(
              "Please select an option"
            ),
            drugTest: Yup.string().required("Please select an option"),
            accommodations: Yup.string().required("Please select an option"),
            accommodationsExplain: Yup.string().when("accommodations", {
              is: "yes",
              then: () =>
                Yup.string().required("Please explain your accommodations"),
              otherwise: () => Yup.string(),
            }),
            criminalHistory: Yup.string().required("Please select an option"),
            criminalHistoryExplain: Yup.string().when("criminalHistory", {
              is: "yes",
              then: () =>
                Yup.string().required("Please explain your criminal history"),
              otherwise: () => Yup.string(),
            }),
            backgroundCheck: Yup.string().required("Please select an option"),
            medicalConditions: Yup.string().required("Please select an option"),
            medicalConditionsExplain: Yup.string().when("medicalConditions", {
              is: "yes",
              then: () =>
                Yup.string().required("Please specify any medical conditions"),
              otherwise: () => Yup.string(),
            }),
          })}
          onSubmit={(values) => nextStep(values)}
        >
          <Form className={styles["application-form"]}>
            <Field name="formDate" type="hidden" />

            <h2 className={styles["education-training-header"]}>
              Applicant Information
            </h2>

            <label>
              Full Name <span style={{ color: "red" }}>*</span>
            </label>
            <Field name="fullName" type="text" />
            <ErrorMessage
              name="fullName"
              component="div"
              style={{ color: "red" }}
            />

            <label>
              SSN/TIN <span style={{ color: "red" }}>*</span>
            </label>
            <Field name="ssn" type="text" />
            <ErrorMessage name="ssn" component="div" style={{ color: "red" }} />

            <label>
              Address <span style={{ color: "red" }}>*</span>
            </label>
            <Field name="address" type="text" />
            <ErrorMessage
              name="address"
              component="div"
              style={{ color: "red" }}
            />

            <label>
              City, State & Zip Code <span style={{ color: "red" }}>*</span>
            </label>
            <Field name="cityStateZip" type="text" />
            <ErrorMessage
              name="cityStateZip"
              component="div"
              style={{ color: "red" }}
            />

            <label>
              Telephone Number <span style={{ color: "red" }}>*</span>
            </label>
            <Field name="phone" type="text" />
            <ErrorMessage
              name="phone"
              component="div"
              style={{ color: "red" }}
            />

            <label>
              Age <span style={{ color: "red" }}>*</span>
            </label>
            <Field name="age" type="number" />
            <ErrorMessage name="age" component="div" style={{ color: "red" }} />

            <label>
              Date of Birth <span style={{ color: "red" }}>*</span>
            </label>
            <Field name="dob" type="date" />
            <ErrorMessage name="dob" component="div" style={{ color: "red" }} />

            <label>
              Smoker? <span style={{ color: "red" }}>*</span>
            </label>
            <label>
              <Field
                name="smoker"
                type="radio"
                value="yes"
                style={{ display: "inline" }}
              />{" "}
              Yes
            </label>
            <label>
              <Field
                name="smoker"
                type="radio"
                value="no"
                style={{ display: "inline" }}
              />{" "}
              No
            </label>
            <ErrorMessage
              name="smoker"
              component="div"
              style={{ color: "red" }}
            />

            <label>
              Are you a U.S. citizen or approved to work in the United States?{" "}
              <span style={{ color: "red" }}>*</span>
            </label>
            <label>
              <Field
                name="citizenship"
                type="radio"
                value="yes"
                style={{ display: "inline" }}
              />{" "}
              Yes
            </label>
            <label>
              <Field
                name="citizenship"
                type="radio"
                value="no"
                style={{ display: "inline" }}
              />{" "}
              No
            </label>
            <ErrorMessage
              name="citizenship"
              component="div"
              style={{ color: "red" }}
            />

            <label>
              Can you provide proof of citizenship or legal status?{" "}
              <span style={{ color: "red" }}>*</span>
            </label>
            <label>
              <Field
                name="proofOfCitizenship"
                type="radio"
                value="yes"
                style={{ display: "inline" }}
              />{" "}
              Yes
            </label>
            <label>
              <Field
                name="proofOfCitizenship"
                type="radio"
                value="no"
                style={{ display: "inline" }}
              />{" "}
              No
            </label>
            <ErrorMessage
              name="proofOfCitizenship"
              component="div"
              style={{ color: "red" }}
            />

            <label>
              Will you consent to a mandatory controlled substance test?{" "}
              <span style={{ color: "red" }}>*</span>
            </label>
            <label>
              <Field
                name="drugTest"
                type="radio"
                value="yes"
                style={{ display: "inline" }}
              />{" "}
              Yes
            </label>
            <label>
              <Field
                name="drugTest"
                type="radio"
                value="no"
                style={{ display: "inline" }}
              />{" "}
              No
            </label>
            <ErrorMessage
              name="drugTest"
              component="div"
              style={{ color: "red" }}
            />

            <label>
              Do you have any condition(s) which would require job
              accommodations? <span style={{ color: "red" }}>*</span>
            </label>
            <label>
              <Field
                name="accommodations"
                type="radio"
                value="yes"
                style={{ display: "inline" }}
              />{" "}
              Yes
            </label>
            <label>
              <Field
                name="accommodations"
                type="radio"
                value="no"
                style={{ display: "inline" }}
              />{" "}
              No
            </label>
            <ErrorMessage
              name="accommodations"
              component="div"
              style={{ color: "red" }}
            />

            <label>If yes, please describe accommodations required:</label>
            <Field name="accommodationsExplain" as="textarea" />
            <ErrorMessage
              name="accommodationsExplain"
              component="div"
              style={{ color: "red" }}
            />

            <label>
              Have you ever been convicted of a criminal offense (felony or
              misdemeanor)? <span style={{ color: "red" }}>*</span>
            </label>
            <label>
              <Field
                name="criminalHistory"
                type="radio"
                value="yes"
                style={{ display: "inline" }}
              />{" "}
              Yes
            </label>
            <label>
              <Field
                name="criminalHistory"
                type="radio"
                value="no"
                style={{ display: "inline" }}
              />{" "}
              No
            </label>
            <ErrorMessage
              name="criminalHistory"
              component="div"
              style={{ color: "red" }}
            />

            <label>
              If yes, please state the nature of the crime(s), when and where
              convicted, and disposition of the case:
            </label>
            <Field name="criminalHistoryExplain" as="textarea" />
            <ErrorMessage
              name="criminalHistoryExplain"
              component="div"
              style={{ color: "red" }}
            />

            <label>
              Do you consent to a background check?{" "}
              <span style={{ color: "red" }}>*</span>
            </label>
            <label>
              <Field
                name="backgroundCheck"
                type="radio"
                value="yes"
                style={{ display: "inline" }}
              />{" "}
              Yes
            </label>
            <label>
              <Field
                name="backgroundCheck"
                type="radio"
                value="no"
                style={{ display: "inline" }}
              />{" "}
              No
            </label>
            <ErrorMessage
              name="backgroundCheck"
              component="div"
              style={{ color: "red" }}
            />

            <label>
              Do you have any medical conditions past or present?{" "}
              <span style={{ color: "red" }}>*</span>
            </label>
            <label>
              <Field
                name="medicalConditions"
                type="radio"
                value="yes"
                style={{ display: "inline" }}
              />{" "}
              Yes
            </label>
            <label>
              <Field
                name="medicalConditions"
                type="radio"
                value="no"
                style={{ display: "inline" }}
              />{" "}
              No
            </label>
            <ErrorMessage
              name="medicalConditions"
              component="div"
              style={{ color: "red" }}
            />

            <label>If yes, please specify any medical conditions:</label>
            <Field name="medicalConditionsExplain" as="textarea" />
            <ErrorMessage
              name="medicalConditionsExplain"
              component="div"
              style={{ color: "red" }}
            />

            <p style={{ marginTop: "25px" }}>
              (Note: No applicant will be denied employment solely on the
              grounds of conviction of a criminal offense. However, the date of
              the offense, the nature of the offense, including any significant
              details that affect the description of the event, and the
              surrounding circumstances and the relevance of the offense to the
              position(s) applied for may be considered){" "}
            </p>

            <button type="submit" className={styles["next-step-button"]}>
              Next
            </button>
          </Form>
        </Formik>
      )}

      {step === 2 && (
        <Formik
          innerRef={formikRefs[1]}
          initialValues={{
            positionApplyingFor: formData.positionApplyingFor || "",
            heardFrom: formData.heardFrom || "",
            monThroughFri: formData.monThroughFri || "",
            overtime: formData.overtime || "",
            oddExtensiveHours: formData.oddExtensiveHours || "",
            weekends: formData.weekends || "",
            startDate: formData.startDate || "",
            reliableTransportation: formData.reliableTransportation || "",
            liftWeight: formData.liftWeight || "",
            machineryExperience: formData.machineryExperience || "",
            yearsWithMachineryExperience:
              formData.yearsWithMachineryExperience || "",
            faceMasks: formData.faceMasks || "",
          }}
          validationSchema={Yup.object({
            positionApplyingFor: Yup.string().required("Required"),
            heardFrom: Yup.string().required("Required"),
            monThroughFri: Yup.string().required("Required"),
            overtime: Yup.string().required("Required"),
            oddExtensiveHours: Yup.string().required("Required"),
            weekends: Yup.string().required("Required"),
            startDate: Yup.date().required("Required"),
            reliableTransportation: Yup.string().required("Required"),
            liftWeight: Yup.string().required("Required"),
            machineryExperience: Yup.string().required("Required"),
            yearsWithMachineryExperience: Yup.number().when(
              "machineryExperience",
              {
                is: "yes",
                then: () =>
                  Yup.number().required(
                    "Please submit your years of machinery experience"
                  ),
                otherwise: () => Yup.number(),
              }
            ),
            faceMasks: Yup.string().required("Required"),
          })}
          onSubmit={(values) => nextStep(values)}
        >
          <Form className={styles["application-form"]}>
            <h2 className={styles["education-training-header"]}>
              Employment Position
            </h2>
            <label>
              Position Applying For <span style={{ color: "red" }}>*</span>
            </label>
            <Field name="positionApplyingFor" type="text" />
            <ErrorMessage
              name="positionApplyingFor"
              component="div"
              style={{ color: "red" }}
            />

            <label>
              How did you hear about us? <span style={{ color: "red" }}>*</span>
            </label>
            <Field name="heardFrom" type="text" />
            <ErrorMessage
              name="heardFrom"
              component="div"
              style={{ color: "red" }}
            />

            <label>
              Are you able to work Monday-Friday?{" "}
              <span style={{ color: "red" }}>*</span>
            </label>
            <label>
              <Field
                name="monThroughFri"
                type="radio"
                value="yes"
                style={{ display: "inline" }}
              />{" "}
              Yes
            </label>
            <label>
              <Field
                name="monThroughFri"
                type="radio"
                value="no"
                style={{ display: "inline" }}
              />{" "}
              No
            </label>
            <ErrorMessage
              name="monThroughFri"
              component="div"
              style={{ color: "red" }}
            />

            <label>
              If needed, are you available to work overime?{" "}
              <span style={{ color: "red" }}>*</span>
            </label>
            <label>
              <Field
                name="overtime"
                type="radio"
                value="yes"
                style={{ display: "inline" }}
              />{" "}
              Yes
            </label>
            <label>
              <Field
                name="overtime"
                type="radio"
                value="no"
                style={{ display: "inline" }}
              />{" "}
              No
            </label>
            <ErrorMessage
              name="overtime"
              component="div"
              style={{ color: "red" }}
            />

            <label>
              Are you available to work odd and extensive hours?{" "}
              <span style={{ color: "red" }}>*</span>
            </label>
            <label>
              <Field
                name="oddExtensiveHours"
                type="radio"
                value="yes"
                style={{ display: "inline" }}
              />{" "}
              Yes
            </label>
            <label>
              <Field
                name="oddExtensiveHours"
                type="radio"
                value="no"
                style={{ display: "inline" }}
              />{" "}
              No
            </label>
            <ErrorMessage
              name="oddExtensiveHours"
              component="div"
              style={{ color: "red" }}
            />

            <label>
              Are you available to work weekends?{" "}
              <span style={{ color: "red" }}>*</span>
            </label>
            <label>
              <Field
                name="weekends"
                type="radio"
                value="yes"
                style={{ display: "inline" }}
              />{" "}
              Yes
            </label>
            <label>
              <Field
                name="weekends"
                type="radio"
                value="no"
                style={{ display: "inline" }}
              />{" "}
              No
            </label>
            <ErrorMessage
              name="weekends"
              component="div"
              style={{ color: "red" }}
            />

            <label>
              Available start date? <span style={{ color: "red" }}>*</span>
            </label>
            <Field name="startDate" type="date" />
            <ErrorMessage
              name="startDate"
              component="div"
              style={{ color: "red" }}
            />

            <label>
              Do you have reliable transportation to and from work?{" "}
              <span style={{ color: "red" }}>*</span>
            </label>
            <label>
              <Field
                name="reliableTransportation"
                type="radio"
                value="yes"
                style={{ display: "inline" }}
              />{" "}
              Yes
            </label>
            <label>
              <Field
                name="reliableTransportation"
                type="radio"
                value="no"
                style={{ display: "inline" }}
              />{" "}
              No
            </label>
            <ErrorMessage
              name="reliableTransportation"
              component="div"
              style={{ color: "red" }}
            />

            <label>
              Are you able to lift up to 80 pounds alone?{" "}
              <span style={{ color: "red" }}>*</span>
            </label>
            <label>
              <Field
                name="liftWeight"
                type="radio"
                value="yes"
                style={{ display: "inline" }}
              />{" "}
              Yes
            </label>
            <label>
              <Field
                name="liftWeight"
                type="radio"
                value="no"
                style={{ display: "inline" }}
              />{" "}
              No
            </label>
            <ErrorMessage
              name="liftWeight"
              component="div"
              style={{ color: "red" }}
            />

            <label>
              Have any machinery experience?{" "}
              <span style={{ color: "red" }}>*</span>
            </label>
            <label>
              <Field
                name="machineryExperience"
                type="radio"
                value="yes"
                style={{ display: "inline" }}
              />{" "}
              Yes
            </label>
            <label>
              <Field
                name="machineryExperience"
                type="radio"
                value="no"
                style={{ display: "inline" }}
              />{" "}
              No
            </label>
            <ErrorMessage
              name="machineryExperience"
              component="div"
              style={{ color: "red" }}
            />

            <label>If yes, list years of experience:</label>
            <Field name="yearsWithMachineryExperience" type="number" />
            <ErrorMessage
              name="yearsWithMachineryExperience"
              component="div"
              style={{ color: "red" }}
            />

            <label>
              Are you able to wear face masks for long periods of time which may
              exceed up to 4 hours? <span style={{ color: "red" }}>*</span>
            </label>
            <label>
              <Field
                name="faceMasks"
                type="radio"
                value="yes"
                style={{ display: "inline" }}
              />{" "}
              Yes
            </label>
            <label>
              <Field
                name="faceMasks"
                type="radio"
                value="no"
                style={{ display: "inline" }}
              />{" "}
              No
            </label>
            <ErrorMessage
              name="faceMasks"
              component="div"
              style={{ color: "red" }}
            />

            <p style={{ marginTop: "25px" }}>
              (Note: Job requires, when necessary, face masks, safety glasses,
              and gloves are to be worn at all times for long periods of time
              and will be supplied to you. If seen not wearing you may be sent
              home for the day and if repeat offense you will be terminated.){" "}
            </p>

            <div className={styles["step-button-container"]}>
              <button
                onClick={prevStep}
                type="button"
                className={styles["next-step-button"]}
              >
                Back
              </button>
              <button
                type="submit"
                className={styles["next-step-button"]}
              >
                Next
              </button>
            </div>
          </Form>
        </Formik>
      )}

      {step === 3 && (
        <Formik
          innerRef={formikRefs[2]}
          initialValues={{
            jobSkillsQualification: formData.jobSkillsQualification || "",
            highschoolName: formData.highschoolName || "",
            highschoolLocation: formData.highschoolLocation || "",
            highschoolYearGraduated: formData.highschoolYearGraduated || "",
            collegeName: formData.collegeName || "",
            collegeLocation: formData.collegeLocation || "",
            collegeYearGraduated: formData.collegeYearGraduated || "",
            collegeDegreeEarned: formData.collegeDegreeEarned || "",
            specializedtrainingName: formData.specializedtrainingName || "",
            specializedtrainingLocation:
              formData.specializedtrainingLocation || "",
            specializedtrainingYearGraduated:
              formData.specializedtrainingYearGraduated || "",
            specializedtrainingDegreeEarned:
              formData.specializedtrainingDegreeEarned || "",
            memberOfArmedService: formData.memberOfArmedService || "",
            militaryBranch: formData.militaryBranch || "",
            militaryStillActive: formData.militaryStillActive || "",
            militaryYearsServed: formData.militaryYearsServed || "",
          }}
          validationSchema={Yup.object({
            jobSkillsQualification: Yup.string().required("Required"),
            memberOfArmedService: Yup.string().required(
              "Please select an option"
            ),

            militaryBranch: Yup.string().when("memberOfArmedService", {
              is: "yes",
              then: () =>
                Yup.string().required(
                  "Please include what branch of the military did you enlist"
                ),
              otherwise: () => Yup.string(),
            }),
            militaryStillActive: Yup.string().when("memberOfArmedService", {
              is: "yes",
              then: () => Yup.string().required("Please select an option"),
              otherwise: () => Yup.string(),
            }),
            militaryYearsServed: Yup.string().when("memberOfArmedService", {
              is: "yes",
              then: () =>
                Yup.string().required(
                  "Please include how many years you served"
                ),
              otherwise: () => Yup.string(),
            }),
          })}
          onSubmit={(values) => nextStep(values)}
        >
          <Form className={styles["application-form"]}>
            <h2 className={styles["education-training-header"]}>
              Job Skills/Qualifications
            </h2>
            <label>
              Please list below the skils and qualifications you possess for the
              position for which you are applying{" "}
              <span style={{ color: "red" }}>*</span>
            </label>
            <Field name="jobSkillsQualification" as="textarea" />
            <ErrorMessage
              name="jobSkillsQualification"
              component="div"
              style={{ color: "red" }}
            />

            <p style={{ margin: "10px 0" }}>
              (Note: Figlet’s Construction LLC complies with ADA and considers
              reasonable accommodation measures that may be necessary for
              eligible applicants/employees to perform essential functions.)
            </p>

            <h2 className={styles["education-training-header"]}>
              Education & Training
            </h2>

            <label>Highschool name</label>
            <Field name="highschoolName" type="text" />
            <ErrorMessage
              name="highschoolName"
              component="div"
              style={{ color: "red" }}
            />

            <label>Highschool location (city/state)</label>
            <Field name="highschoolLocation" type="text" />
            <ErrorMessage
              name="highschoolLocation"
              component="div"
              style={{ color: "red" }}
            />

            <label>Highschool year graduated</label>
            <Field name="highschoolYearGraduated" type="text" />
            <ErrorMessage
              name="highschoolYearGraduated"
              component="div"
              style={{ color: "red" }}
            />

            <label>College name</label>
            <Field name="collegeName" type="text" />
            <ErrorMessage
              name="collegeName"
              component="div"
              style={{ color: "red" }}
            />

            <label>College location (city/state)</label>
            <Field name="collegeLocation" type="text" />
            <ErrorMessage
              name="collegeLocation"
              component="div"
              style={{ color: "red" }}
            />

            <label>College year graduated</label>
            <Field name="collegeYearGraduated" type="text" />
            <ErrorMessage
              name="collegeYearGraduated"
              component="div"
              style={{ color: "red" }}
            />

            <label>College degree earned</label>
            <Field name="collegeDegreeEarned" type="text" />
            <ErrorMessage
              name="collegeDegreeEarned"
              component="div"
              style={{ color: "red" }}
            />

            <label>Vocational school/Specialized training name</label>
            <Field name="specializedTrainingName" type="text" />
            <ErrorMessage
              name="specializedTrainingName"
              component="div"
              style={{ color: "red" }}
            />

            <label>
              Vocational school/Specialized training location (city/state)
            </label>
            <Field name="specializedTrainingAddress" type="text" />
            <ErrorMessage
              name="specializedTrainingAddress"
              component="div"
              style={{ color: "red" }}
            />

            <label>Vocational school/Specialized training year graduated</label>
            <Field name="specializedTrainingYearGraduated" type="text" />
            <ErrorMessage
              name="specializedTrainingYearGraduated"
              component="div"
              style={{ color: "red" }}
            />

            <label>Vocational school/Specialized training degree earned</label>
            <Field name="specializedTrainingDegreeEarned" type="text" />
            <ErrorMessage
              name="specializedTrainingDegreeEarned"
              component="div"
              style={{ color: "red" }}
            />

            <label>
              Are you a member of the Armed Services?{" "}
              <span style={{ color: "red" }}>*</span>
            </label>
            <label>
              <Field
                name="memberOfArmedService"
                type="radio"
                value="yes"
                style={{ display: "inline" }}
              />{" "}
              Yes
            </label>
            <label>
              <Field
                name="memberOfArmedService"
                type="radio"
                value="no"
                style={{ display: "inline" }}
              />{" "}
              No
            </label>
            <ErrorMessage
              name="memberOfArmedService"
              component="div"
              style={{ color: "red" }}
            />

            <label>What branch of the military did you enlist? </label>
            <Field name="militaryBranch" type="text" />
            <ErrorMessage
              name="militaryBranch"
              component="div"
              style={{ color: "red" }}
            />

            <label>Are you still active? </label>
            <label>
              <Field
                name="militaryStillActive"
                type="radio"
                value="yes"
                style={{ display: "inline" }}
              />{" "}
              Yes
            </label>
            <label>
              <Field
                name="militaryStillActive"
                type="radio"
                value="no"
                style={{ display: "inline" }}
              />{" "}
              No
            </label>
            <ErrorMessage
              name="militaryStillActive"
              component="div"
              style={{ color: "red" }}
            />

            <label>How many years did you serve? </label>
            <Field name="militaryYearsServed" type="text" />
            <ErrorMessage
              name="militaryYearsServed"
              component="div"
              style={{ color: "red" }}
            />

            <div className={styles["step-button-container"]}>
              <button
                onClick={prevStep}
                type="button"
                className={styles["next-step-button"]}
              >
                Back
              </button>

              <button
                type="submit"
                className={styles["next-step-button"]}
              >
                Next
              </button>
            </div>
          </Form>
        </Formik>
      )}

      {step === 4 && (
        <Formik
          innerRef={formikRefs[3]}
          initialValues={{
            employer1Name: formData.employer1Name || "",
            job1Title: formData.job1Title || "",
            supervisor1Name: formData.supervisor1Name || "",
            employer1Address: formData.employer1Address || "",
            employer1Phone: formData.employer1Phone || "",
            employment1Start: formData.employment1Start || "",
            employment1End: formData.employment1End || "",
            reasonForLeaving1: formData.reasonForLeaving1 || "",
            employer2Name: formData.employer2Name || "",
            job2Title: formData.job2Title || "",
            supervisor2Name: formData.supervisor2Name || "",
            employer2Address: formData.employer2Address || "",
            employer2Phone: formData.employer2Phone || "",
            employment2Start: formData.employment2Start || "",
            employment2End: formData.employment2End || "",
            reasonForLeaving2: formData.reasonForLeaving2 || "",
            reference1Name: formData.reference1Name || "",
            reference1Phone: formData.reference1Phone || "",
            reference1Relationship: formData.reference1Relationship || "",
            reference2Name: formData.reference2Name || "",
            reference2Phone: formData.reference2Phone || "",
            reference2Relationship: formData.reference2Relationship || "",
          }}
          validationSchema={Yup.object({
            employer1Name: Yup.string().required("Required"),
            job1Title: Yup.string().required("Required"),
            supervisor1Name: Yup.string().required("Required"),
            employer1Address: Yup.string().required("Required"),
            employer1Phone: Yup.string().required("Required"),
            employment1Start: Yup.date().required("Required"),
            employment1End: Yup.date(),
            reasonForLeaving1: Yup.string().when("employment1End", {
              is: (val) => !!val, // Converts any non-empty value to true,
              then: () =>
                Yup.string().required("Please specify your reason for leaving"),
              otherwise: () => Yup.string(),
            }),
            employer2Name: Yup.string(),
            job2Title: Yup.string(),
            supervisor2Name: Yup.string(),
            employer2Address: Yup.string(),
            employer2Phone: Yup.string(),
            employment2Start: Yup.date(),
            employment2End: Yup.date(),
            reasonForLeaving2: Yup.string().when("employment2End", {
              is: (val) => !!val, // Converts any non-empty value to true,
              then: () =>
                Yup.string().required("Please specify your reason for leaving"),
              otherwise: () => Yup.string(),
            }),
            reference1Name: Yup.string().required("Required"),
            reference1Phone: Yup.string().required("Required"),
            reference1Relationship: Yup.string().required("Required"),
            reference2Name: Yup.string(),
            reference2Phone: Yup.string(),
            reference2Relationship: Yup.string(),
          })}
          onSubmit={(values) => nextStep(values)}
        >
          <Form className={styles["application-form"]}>
            <h2 className={styles["education-training-header"]}>
              Employment History
            </h2>

            <label>
              Employer Name <span style={{ color: "red" }}>*</span>
            </label>
            <Field name="employer1Name" type="text" />
            <ErrorMessage
              name="employer1Name"
              component="div"
              style={{ color: "red" }}
            />

            <label>
              Job Title <span style={{ color: "red" }}>*</span>
            </label>
            <Field name="job1Title" type="text" />
            <ErrorMessage
              name="job1Title"
              component="div"
              style={{ color: "red" }}
            />

            <label>
              Supervisor name <span style={{ color: "red" }}>*</span>
            </label>
            <Field name="supervisor1Name" type="text" />
            <ErrorMessage
              name="supervisor1Name"
              component="div"
              style={{ color: "red" }}
            />

            <label>
              Employer address <span style={{ color: "red" }}>*</span>
            </label>
            <Field name="employer1Address" type="text" />
            <ErrorMessage
              name="employer1Address"
              component="div"
              style={{ color: "red" }}
            />

            <label>
              Employer telephone <span style={{ color: "red" }}>*</span>
            </label>
            <Field name="employer1Phone" type="text" />
            <ErrorMessage
              name="employer1Phone"
              component="div"
              style={{ color: "red" }}
            />

            <label>
              Start Date <span style={{ color: "red" }}>*</span>
            </label>
            <Field name="employment1Start" type="date" />
            <ErrorMessage
              name="employment1Start"
              component="div"
              style={{ color: "red" }}
            />

            <label>End Date</label>
            <Field name="employment1End" type="date" />
            <ErrorMessage
              name="employment1End"
              component="div"
              style={{ color: "red" }}
            />

            <label>
              Reason for Leaving{" "}
              {formData.employment1End && (
                <span style={{ color: "red" }}>*</span>
              )}
            </label>
            <Field name="reasonForLeaving1" as="textarea" />
            <ErrorMessage
              name="reasonForLeaving1"
              component="div"
              style={{ color: "red" }}
            />
            {/* Employment 2 */}
            <label>Employer Name</label>
            <Field name="employer2Name" type="text" />
            <ErrorMessage
              name="employer2Name"
              component="div"
              style={{ color: "red" }}
            />

            <label>Job Title</label>
            <Field name="job2Title" type="text" />
            <ErrorMessage
              name="job2Title"
              component="div"
              style={{ color: "red" }}
            />

            <label>Supervisor name</label>
            <Field name="supervisor2Name" type="text" />
            <ErrorMessage
              name="supervisor2Name"
              component="div"
              style={{ color: "red" }}
            />

            <label>Employer address</label>
            <Field name="employer2Address" type="text" />
            <ErrorMessage
              name="employer2Address"
              component="div"
              style={{ color: "red" }}
            />

            <label>Employer telephone</label>
            <Field name="employer2Phone" type="text" />
            <ErrorMessage
              name="employer2Phone"
              component="div"
              style={{ color: "red" }}
            />

            <label>Start Date</label>
            <Field name="employment2Start" type="date" />
            <ErrorMessage
              name="employment2Start"
              component="div"
              style={{ color: "red" }}
            />

            <label>End Date</label>
            <Field name="employment2End" type="date" />
            <ErrorMessage
              name="employment2End"
              component="div"
              style={{ color: "red" }}
            />

            <label>
              Reason for Leaving{" "}
              {formData.employment2End && (
                <span style={{ color: "red" }}>*</span>
              )}
            </label>
            <Field name="reasonForLeaving2" as="textarea" />
            <ErrorMessage
              name="reasonForLeaving2"
              component="div"
              style={{ color: "red" }}
            />

            <h2 className={styles["education-training-header"]}>
              Applicant Information
            </h2>

            <label>
              Reference 1 Name <span style={{ color: "red" }}>*</span>
            </label>
            <Field name="reference1Name" type="text" />
            <ErrorMessage
              name="reference1Name"
              component="div"
              style={{ color: "red" }}
            />

            <label>
              Reference 1 Phone <span style={{ color: "red" }}>*</span>
            </label>
            <Field name="reference1Phone" type="text" />
            <ErrorMessage
              name="reference1Phone"
              component="div"
              style={{ color: "red" }}
            />

            <label>
              Relationship to Reference 1{" "}
              <span style={{ color: "red" }}>*</span>
            </label>
            <Field name="reference1Relationship" type="text" />
            <ErrorMessage
              name="reference1Relationship"
              component="div"
              style={{ color: "red" }}
            />

            <label>Reference 2 Name</label>
            <Field name="reference2Name" type="text" />
            <ErrorMessage
              name="reference2Name"
              component="div"
              style={{ color: "red" }}
            />

            <label>Reference 2 Phone</label>
            <Field name="reference2Phone" type="text" />
            <ErrorMessage
              name="reference2Phone"
              component="div"
              style={{ color: "red" }}
            />

            <label>Relationship to Reference 2</label>
            <Field name="reference2Relationship" type="text" />
            <ErrorMessage
              name="reference2Relationship"
              component="div"
              style={{ color: "red" }}
            />

            <div className={styles["step-button-container"]}>
              <button
                type="button"
                onClick={prevStep}
                className={styles["next-step-button"]}
              >
                Back
              </button>
              <button
                type="submit"
                className={styles["next-step-button"]}
              >
                Next
              </button>
            </div>
          </Form>
        </Formik>
      )}

      {step === 5 && (
        <Formik
          innerRef={formikRefs[4]}
          initialValues={{
            certificationAgreed: false,
            signatureDate: new Date().toLocaleDateString("en-CA"),
          }}
          validationSchema={Yup.object({
            certificationAgreed: Yup.boolean()
              .oneOf([true], "You must agree to the terms")
              .required("Required"),
          })}
          onSubmit={(values) => finalSubmission(values)}
        >
          <Form className={styles["application-form"]}>
            <h2 className={styles["education-training-header"]}>
              Certification
            </h2>
            <p>
              I certify that the information provided on this application is
              true and correct. I understand that providing false or misleading
              information will be the basis for rejection of my application, or
              if employment commences, immediate termination.
            </p>
            <br />
            <p>
              I authorize Figlet's Construction LLC to contact former employers
              and educational organizations regarding my employment and
              education. I authorize my former employers and educational
              organizations to communicate information fully and freely
              regarding my previous employment, attendance, and grades. I
              authorize those persons designated as references to communicate
              information fully and freely regarding my previous employment and
              education.
            </p>
            <br />
            <p>
              If an employment relationship is created, I understand that unless
              I am offered a specific written contract of employment signed by
              Christian Figueroa, owner of Figlet's Construction LLC, the
              employment relationship will be "at-will". In other words, the
              relationship will be entirely voluntary in nature, and either I or
              my employer will be able to terminate the employment relationship
              at any time and without cause. With appropriate notice, I will
              have full discretion to end the employment relationship when I
              choose and for reasons of my choice. Similarly, my employer will
              have the right.
            </p>

            <br />
            <label>
              <Field
                type="checkbox"
                name="certificationAgreed"
                style={{ display: "inline" }}
              />{" "}
              I HAVE CAREFULLY READ THE ABOVE CERTIFICATION AND I UNDERSTAND AND
              AGREE TO ITS TERMS.
            </label>
            <ErrorMessage
              name="certificationAgreed"
              component="div"
              style={{ color: "red" }}
            />

            <div style={{ marginTop: "20px" }}>
              <label>
                Applicant Signature <span style={{ color: "red" }}>*</span>
              </label>
              <SignaturePad
                ref={sigPadRef}
                penColor="black"
                canvasProps={{
                  className: styles["signature-canvas"],
                }}
              />
              <button
                type="button"
                onClick={() => sigPadRef.current.clear()}
                className={styles["next-step-button"]}
              >
                Clear Signature
              </button>
            </div>

            <div>
              <label>Date:</label>
              <Field name="signatureDate" type="date" disabled />
            </div>

            <div className={styles["step-button-container"]}>
              <button
                type="button"
                onClick={prevStep}
                className={styles["next-step-button"]}
              >
                Back
              </button>
              <button
                type="submit"
                className={styles["next-step-button"]}
              >
                Submit Application
              </button>
            </div>
          </Form>
        </Formik>
      )}

      {step === 6 && (
        <div className={styles["thank-you-for-applying"]}>
          <h2>Thank you for applying!</h2>
          <h2>You'll hear from us shortly</h2>
          <img src={FigletsIcon} alt="Figlet's Construction LLC Icon" />
        </div>
      )}
    </section>
  );
};

export default Application;
