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
  company_name: yup.string().required("Please enter your company name"),
  company_email_address: yup
    .string()
    .email("Please enter a valid email")
    .required("Please enter your email"),
  number_of_employees: yup.string().required("Please enter your number of employees"), // Changed to string to match "50-100" format
  type_of_employer: yup.string().required("Please enter your type of employer"), // Note: "employer" is misspelled as "employer" in backend
  company_address: yup.string().required("Please enter your company address"),
  country: yup.string().required("Please enter your country"),
  company_phone_number: yup.string().required("Please enter your company phone number"),
  industry: yup.string().required("Please enter your industry"),
  company_website: yup.string().required("Please enter your website"),
  contact_person: yup.string().required("Please enter Representative name"), // Note: "person" is misspelled as "persion" in backend
  work_email: yup
    .string()
    .email("Please enter a valid email")
    .required("Work email address required"),
  position_in_company: yup.string().required("Please enter representative position"),
  company_logo: yup.string().required("Please Add Company Logo "),
  // company_logo is not included in the form as it appears to be auto-generated
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
    .oneOf([yup.ref("newPassword")], "Passwords must match"),
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
  client_id: yup.string().required(" Please select Company"),
});
export const newJobSchema2 = yup.object().shape({
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
  applicationId: yup
    .number()
    .min(1, "Please select an application")
    .required("Application selection is required"),
  userId: yup
    .number()
    .required("User ID is required"), // Or mark as optional if injected internally
  interviewerName: yup.string().required("Interviewer name is required"),
  interviewerDepartment: yup.string().required("Department is required"),
  interviewerEmail: yup
    .string()
    .email("Invalid email format")
    .required("Interviewer email is required"),
  interviewerPhone: yup.string().required("Interviewer phone number is required"),
  interviewDate: yup.string().required("Interview date is required"),
  interviewTime: yup.string().required("Interview time is required"),
  duration: yup.string().required("Interview duration is required"),
  format: yup.string().required("Interview format is required"),
  information: yup.string().optional(),
  reminder: yup.string().optional(),
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
  name: yup.string().required("Full Name is required"),
  email: yup.string().required("Email is required"),
  role: yup.string().required("Role is required"),
  adminPrivileges: yup.string().required("adminPrivileges is required"),
});
