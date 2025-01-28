import { Divider, Grid } from '@mui/material';
import PictureSection from './sections/picture';
import PersonalInformation from './sections/personal-information';
import OtherInformationTab from './sections/other-information';
import DeactivateAccount from './sections/deactiviate-account';

const MyProfileTab = () => {
  return (
    <section>
      <Grid rowSpacing={3} columnSpacing={5} container>
        <Grid lg={2.5} item>
          <PictureSection />
        </Grid>
        <Grid lg={9.5} item>
          <PersonalInformation />
        </Grid>
      </Grid>
      <Divider sx={{ mt: '35px' }} />
      <OtherInformationTab />
      <Divider sx={{ mt: '35px' }} />
      <DeactivateAccount />
    </section>
  );
};

export default MyProfileTab;
