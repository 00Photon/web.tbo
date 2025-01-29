import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const search = yup.object().shape({
  name: yup.string(),
});

export const jobSearchSchema = yup.object().shape({
  role: yup.string().optional(),
  location: yup.string().optional(),
});

export const supportSchema = yup.object().shape({
  name: yup.string().required("Please enter your name"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Please enter your email"),
  phone: yup.string().required("Please enter your phone number"),
  subject: yup.string().required("Please enter your subject"),
  message: yup.string().required("Please enter your message"),
});

export const companySchema = yup.object().shape({
  name: yup.string().required("Please enter your company name"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Please enter your email"),
  employees: yup.number().required("Please enter your number of employees"),
  typeOfEmployer: yup.string().required("Please enter your type of employer"),
  address: yup.string().required("Please enter your company address"),
  country: yup.string().required("Please enter your country code"),
  countryCode: yup.string().required("Please enter your country code"),
  industry: yup.string().required("Please enter your industry"),
  website: yup.string().required("Please enter your website"),
  contactPerson: yup.string().required("Please enter Representative name"),
  workEmail: yup
    .string()
    .email("Please enter a valid email")
    .required("Work email address required"),
  position: yup.string().required("Please enter representative position"),
  repCountryCode: yup.string().required("Please enter country code"),
});

export const passwordSchema = yup.object().shape({
  password: yup.string().required("Please enter your current password"),
  newPassword: yup
    .string()
    .required("Password is required")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    )
    .min(8, "Password must be at least 8 characters long"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

export const newJobSchema = yup.object().shape({
  title: yup.string().required("Job title is required"),
  type: yup.string().required("Job type is required"),
  description: yup.string().required("Job description is required"),
  requirement: yup.string().required("Job requirement is required"),
  skill: yup.array().required("Please add at least one skill"),
  location: yup.string().required("Job location is required"),
  currency: yup.string().required("Job currency is required"),
  minSalary: yup.string().required("Minimum salary is required"),
  maxSalary: yup.string().required("Maximum salary is required"),
  application_deadline: yup.string().required("Job deadline is required"),
  information: yup.string().required("Job information is required"),
});

export const newJobSchemaClone = yup.object().shape({
  title: yup.string().required("Job title is required"),
  type: yup.string().required("Job type is required"),
  description: yup.string().required("Job description is required"),
  requirement: yup.string().required("Job requirement is required"),
  skills: yup.array().required("Please add at least one skill"),
  location: yup.string().required("Job location is required"),
  currency: yup.string().required("Job currency is required"),
  minSalary: yup.string().required("Minimum salary is required"),
  maxSalary: yup.string().required("Maximum salary is required"),
  information: yup.string().required("Job information is required"),
});

export const interviewSchema = yup.object().shape({
  fullName: yup.string().required("full name is required"),
  positionApplied: yup.string().required("position applied for is required"),
  candidateEmail: yup.string().required("candidate email is required"),
  candidatePhone: yup.string().required("candidate phone number is required"),
  interviewerName: yup
    .string()
    .required("at least one interviewer name is required"),
  interviewerDepartment: yup.string().required("department/role is required"),
  interviewerEmail: yup.string().required("interviewer email is required"),
  interviewerPhone: yup.string().required("interviewer phone is required"),
  interviewDate: yup.string().required("interview date is required"),
  interviewTime: yup.string().required("interview time is required"),
  duration: yup.string().required("interview duration is required"),
  format: yup.string().required("interview format is required"),
  information: yup.string(),
  reminder: yup.string(),
});

export const newAdminSchema = yup.object().shape({
  fullName: yup.string().required("Full Name is required"),
  role: yup.string().required("Role is required"),
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup.string().required("Password must match"),
  level: yup.string().required("Level is require"),
  status: yup.string().required("Status is required"),
});

export const AdminProfileSchema = yup.object().shape({
  fullName: yup.string().required("Full Name is required"),
  username: yup.string().required("Username is required"),
  email: yup.string().required("Email is required"),
  role: yup.string().required("Role is required"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  country: yup.string().required("Country is required"),
  postalCode: yup.number().required("Postal Code is required"),
  phoneNumber: yup.string().required("Phone Number is required"),
});
