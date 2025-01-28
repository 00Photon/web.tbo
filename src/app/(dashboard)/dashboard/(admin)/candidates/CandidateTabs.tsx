// ** React Imports
import { useState, useEffect, SyntheticEvent } from "react";

// ** MUI Components
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";

import { styled, Theme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import MuiTabList from "@mui/lab/TabList";

// ** Icon Imports
import Icon from "@/@core/component/icon";

// * Components Imports
import Talents from "./TalentsTable";
import Unreviewed from "./UnreviewedTalents";
import Reviewed from "./ReviewedTalents";
import Shortlisted from "./ShortlistedTalents";
import Interviewed from "./InterviewedTalents";
import Hired from "./HiredTalents";

const TabList = styled(MuiTabList)(({ theme }) => ({
  borderBottom: "0 !important",
  "&, & .MuiTabs-scroller": {
    boxSizing: "content-box",
    // padding: theme.spacing(1.25, 1.25, 2),
    margin: `${theme.spacing(-1.25, -1.25, -2)} !important`,
  },
  "& .MuiTabs-indicator": {
    display: "none",
  },
  "& .Mui-selected": {
    boxShadow: theme.shadows[2],
    backgroundColor: theme.palette.primary.main,
    color: `${theme.palette.common.white} !important`,
  },
  "& .MuiTab-root": {
    minWidth: 65,
    minHeight: 38,
    lineHeight: 1,
    // borderRadius: theme.shape.borderRadius,
    "&:hover": {
      color: theme.palette.primary.main,
    },
    [theme.breakpoints.up("sm")]: {
      minWidth: 130,
    },
  },
}));

type TabProps = {
  tab: string;
};

const TalentsTabs = ({ tab }: TabProps) => {
  // ** State
  const [activeTab, setActiveTab] = useState<string>(tab);

  // ** Hooks
  const hideText = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  const handleChange = (e: SyntheticEvent, value: string) => {
    setActiveTab(value);
  };

  useEffect(() => {
    if (tab && tab !== activeTab) {
      setActiveTab(tab);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  const tabContentList = {
    all: <Talents />,
    underReview: <Unreviewed />,
    reviewed: <Reviewed />,
    interviewed: <Interviewed />,
    shortlisted: <Shortlisted />,
    hired: <Hired />,
  };

  return (
    <Grid container spacing={6}>
      {activeTab === undefined ? null : (
        <Grid item xs={12}>
          <TabContext value={activeTab}>
            <Grid container spacing={6}>
              <Box
                sx={{
                  mt: 4,
                  px: 3,
                  mr: { xs: 2, md: 0 },
                  width: "100%",
                  display: "flex",
                  justifyContent: { xs: "flex-start", lg: "space-between" },
                  alignItems: { xs: "flex-end", lg: "center" },
                  flexDirection: { xs: "column", lg: "row" },
                }}
              >
                <Box
                  sx={{
                    width: { xs: "100%", lg: "80%" },
                    maxWidth: "fit-content",
                    overflowX: "auto",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "#fff",
                    borderRadius: 2,

                    alignSelf: { xs: "flex-start !important" },
                  }}
                >
                  <Grid item xs={12}>
                    <TabList
                      variant="scrollable"
                      scrollButtons="auto"
                      onChange={handleChange}
                      aria-label="applications tabs"
                    >
                      <Tab
                        value="all"
                        label={
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              ...(!hideText && { "& svg": { mr: 2 } }),
                              textTransform: "capitalize",
                            }}
                          >
                            <Icon fontSize="1.5rem" icon="prime:user" />
                            {!hideText && "All"}
                          </Box>
                        }
                      />
                      <Tab
                        value="underReview"
                        label={
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              ...(!hideText && { "& svg": { mr: 2 } }),
                              textTransform: "capitalize",
                            }}
                          >
                            <Icon fontSize="1.5rem" icon="basil:search-solid" />
                            {!hideText && "Under Review"}
                          </Box>
                        }
                      />
                      <Tab
                        value="reviewed"
                        label={
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              ...(!hideText && { "& svg": { mr: 2 } }),
                              textTransform: "capitalize",
                            }}
                          >
                            <Icon fontSize="1.575rem" icon="ph:eye" />
                            {!hideText && "Reviewed"}
                          </Box>
                        }
                      />
                      <Tab
                        value="shortlisted"
                        label={
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              ...(!hideText && { "& svg": { mr: 2 } }),
                              textTransform: "capitalize",
                            }}
                          >
                            <Icon fontSize="1.575rem" icon="prime:users" />
                            {!hideText && "Shortlisted"}
                          </Box>
                        }
                      />
                      <Tab
                        value="interviewed"
                        label={
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              ...(!hideText && { "& svg": { mr: 2 } }),
                              textTransform: "capitalize",
                            }}
                          >
                            <Icon
                              fontSize="1.125rem"
                              icon="fluent:mic-28-regular"
                            />
                            {!hideText && "Interviewed"}
                          </Box>
                        }
                      />
                      <Tab
                        value="hired"
                        label={
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              ...(!hideText && { "& svg": { mr: 2 } }),
                              textTransform: "capitalize",
                            }}
                          >
                            <Icon fontSize="1.4rem" icon="uim:check" />
                            {!hideText && "Hired"}
                          </Box>
                        }
                      />
                    </TabList>
                  </Grid>
                </Box>

                <Box sx={{ mt: { xs: 4, lg: 0 } }}>
                  {activeTab === "reviewed" && (
                    <Button
                      variant="contained"
                      size="large"
                      sx={{
                        textTransform: "capitalize",
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        minWidth: "fit-content",
                      }}
                    >
                      <Icon icon="tabler:send" sx={{ mr: 2 }} />
                      Send to client
                    </Button>
                  )}
                  {activeTab === "interviewed" && (
                    <Button
                      variant="contained"
                      size="large"
                      sx={{
                        textTransform: "capitalize",
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        minWidth: "fit-content",
                      }}
                    >
                      <Icon icon="tabler:send" sx={{ mr: 2 }} />
                      Update admin
                    </Button>
                  )}
                  {activeTab === "shortlisted" && (
                    <Button
                      variant="contained"
                      size="large"
                      sx={{
                        textTransform: "capitalize",
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        minWidth: "fit-content",
                      }}
                    >
                      <Icon icon="tabler:send" sx={{ mr: 2 }} />
                      Update admin
                    </Button>
                  )}
                </Box>
              </Box>

              <Grid item xs={12}>
                <TabPanel sx={{ p: 0 }} value={activeTab}>
                  {tabContentList[activeTab as keyof typeof tabContentList]}
                </TabPanel>
              </Grid>
            </Grid>
          </TabContext>
        </Grid>
      )}
    </Grid>
  );
};

export default TalentsTabs;
