import React, { useContext, useState } from 'react';
import HelmetHead from '../components/HelmetHead';
import { useStyles } from './styles/pages/dashboard';
import { StateGlobal } from '../context/StateGlobal';
import { DefaultLayout } from '../layouts/default';
import { Box, Button, Tab, Typography } from '@mui/material';
import { TabContext, TabList } from '@mui/lab';

function Dashboard() {
  const styles = useStyles()

  const [selectedTab, setSelectedTab] = useState('1')

  const { setCreateReportModalVisibility } = useContext(StateGlobal)

  function handleSelect(_, selected) {
    setSelectedTab(selected)
  }

  function handleOpenModal() {
    setCreateReportModalVisibility(true)
  }

  return (
    <div>
      <HelmetHead title={"Dashboard | Leafsense"} />
      <DefaultLayout>
        <Box className={styles.container}>
          <TabContext value={selectedTab}>
            <TabList
              variant="fullWidth"
              className={styles.tabRootList}
              onChange={handleSelect}
            >
              <Tab disabled label="Resumo" value="1" />
              <Tab disabled label="Detalhamento" value="2" />
            </TabList>
          </TabContext>

          <footer className={styles.footer}>
            <img
              width="100px"
              height="102px"
              src="/assets/leaf.png"
              alt="Empty"
            />

            <Typography className={styles.description}>
              Para começar a ver os dados das suas fazendas, crie ou selecione
              um report.
            </Typography>

            <Button
              onClick={() => handleOpenModal()}
              variant="contained"
              color="primary"
            >
              CRIAR NOVO REPORT
            </Button>
          </footer>
        </Box>
      </DefaultLayout>
    </div>
  );
}

export default Dashboard;
