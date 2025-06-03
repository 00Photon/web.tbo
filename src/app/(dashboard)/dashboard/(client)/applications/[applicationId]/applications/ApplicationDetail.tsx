import React, { useEffect, useState } from "react";
import { fetchApplicationById } from "@/@core/services/jobService";
import { Application } from "./ApplicationTable"; // Import Application interface
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "next/link";

interface ApplicationDetailProps {
  applicationId: string;
}

export const ApplicationDetail: React.FC<ApplicationDetailProps> = ({ applicationId }) => {
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        setLoading(true);
        const response = await fetchApplicationById(applicationId);
        if (response.status) {
          setApplication(response.application);
        }
      } catch (error) {
        console.error("Error fetching application:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [applicationId]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!application) {
    return <Typography>Application not found</Typography>;
  }

  return (
    <Card sx={{ m: 4 }}>
      {/* <CardHeader title={`Application #${application.id}`} /> */}
      <CardContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="h6">Candidate Details</Typography>
          <Typography><strong>Name:</strong> {application.user.name}</Typography>
          <Typography><strong>Email:</strong> {application.user.email}</Typography>
          {application.user.phone_number && (
            <Typography><strong>Phone:</strong> {application.user.phone_number}</Typography>
          )}
          {application.user.profile_image && (
            <Box sx={{ mt: 1 }}>
              <Typography><strong>Profile Image:</strong></Typography>
              <img
                src={application.user.profile_image}
                alt="Profile"
                style={{ maxWidth: "200px", borderRadius: "8px" }}
              />
            </Box>
          )}

          <Typography variant="h6" sx={{ mt: 2 }}>Candidate Details</Typography>
          <Typography><strong>Job Title:</strong> {application.job.title}</Typography>
          <Typography><strong>Application Date:</strong> {new Date(application.created_at).toLocaleDateString()}</Typography>
          <Typography><strong>Status:</strong> {application.status}</Typography>
          <Typography>
            <strong>Job:</strong>{" "}
            <Link href={`/dashboard/jobs/${application.job_id}`}>
              View Job Details
            </Link>
          </Typography>

          <Typography variant="h6" sx={{ mt: 2 }}>Submitted Documents</Typography>
          {application.user.cv_upload && (
            <Typography>
              <strong>CV:</strong>{" "}
              <a href={application.user.cv_upload} target="_blank" rel="noopener noreferrer">
                Download CV
              </a>
            </Typography>
          )}
          {application.user.cover_letter_upload && (
            <Typography>
              <strong>Cover Letter:</strong>{" "}
              <a href={application.user.cover_letter_upload} target="_blank" rel="noopener noreferrer">
                Download Cover Letter
              </a>
            </Typography>
          )}
          {application.user.id_upload && (
            <Typography>
              <strong>ID:</strong>{" "}
              <a href={application.user.id_upload} target="_blank" rel="noopener noreferrer">
                View ID
              </a>
            </Typography>
          )}
          {application.user.video_url && (
            <Typography>
              <strong>Intro Video:</strong>{" "}
              <a href={application.user.video_url} target="_blank" rel="noopener noreferrer">
                Watch Video
              </a>
            </Typography>
          )}
          {application.user.work_sample_upload && (
            <Typography>
              <strong>Work Sample:</strong>{" "}
              <a href={application.user.work_sample_upload} target="_blank" rel="noopener noreferrer">
                Download Work Sample
              </a>
            </Typography>
          )}
          {application.user.portfolio_link && (
            <Typography>
              <strong>Portfolio:</strong>{" "}
              <a href={application.user.portfolio_link} target="_blank" rel="noopener noreferrer">
                View Portfolio
              </a>
            </Typography>
          )}

          {application.user.project_screenshots && application.user.project_screenshots.length > 0 && (
            <>
              <Typography variant="h6" sx={{ mt: 2 }}>Project Screenshots</Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                {application.user.project_screenshots.map((screenshot: string, index: number) => (
                  <img
                    key={index}
                    src={screenshot}
                    alt={`Project screenshot ${index + 1}`}
                    style={{ maxWidth: "150px", borderRadius: "8px" }}
                  />
                ))}
              </Box>
            </>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};