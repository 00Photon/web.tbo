'use client';
import { Box, Typography } from "@mui/material";
import { profileTabs } from "./data";
import { useState } from "react";
import MyProfileTab from "./tabs/my-profile";
import PasswordManagementTab from "./tabs/password-management";
import NotificationsTab from "./tabs/notifications";

export default function TalentProfilePage() {

    const [activeTab, setActiveTab] = useState(0);

    const hoverTabStyle = {
        backgroundColor: '#F5F0F0',
        color: '#E61C31'
    }

    return (
        <main>
            <Box>
                <Typography sx={{ fontWeight: 500, color: '#39353D', fontSize: '18px' }}>Settings</Typography>
                <Typography sx={{ fontSize: '14px', mb: '10px' }}>Make changes to your profile</Typography>
                <Box sx={{ display: 'flex', backgroundColor: '#FFFFFF', mb: '20px', width: 'fit-content' }}>
                {profileTabs.map((tab, index) => (
                    <Box onClick={() => setActiveTab(index)} key={index} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#98A2B3', border: '1px solid #EEEEEE', px: '10px', py: '5px', cursor: 'pointer', '&:hover': hoverTabStyle, ...(activeTab == index && hoverTabStyle) }}>
                        {tab.icon}
                        <Typography sx={{ fontSize: '14px', ml: '5px' }}>{tab.name}</Typography>
                    </Box>
                ))}
                </Box>
            </Box>
            <section>
                <Box sx={{ backgroundColor: '#FFFFFF', padding: '20px', width: '100%' }}>
                    {activeTab == 0 && <MyProfileTab />}
                    {activeTab == 1 && <PasswordManagementTab />}
                    {activeTab == 2 && <NotificationsTab />}
                </Box>
            </section>
        </main>
    );
}