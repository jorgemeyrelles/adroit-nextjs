import { useState } from 'react'
import Head from 'next/head'

import { Box, Tab } from '@material-ui/core'
import { TabPanel, TabContext, TabList } from '@material-ui/lab'

import { withSSRAuth } from '../../utils/withSSRAuth'

import { DefaultLayout } from '../../layouts/default'
import { ReportDetail } from '../../containers/ReportDetail'
import { ReportSummary } from '../../containers/ReportSummary'

import { useStyles } from '../../styles/pages/report'

export default function Report() {
  const styles = useStyles()

  const [selectedTab, setSelectedTab] = useState('1')

  function handleChange(_, selected) {
    setSelectedTab(selected)
  }

  return (
    <>
      <Head>
        <title>Report | Leafsense</title>
      </Head>

      <DefaultLayout>
        <Box
          width="100%"
          height="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          marginTop="40px"
        >
          <TabContext value={selectedTab}>
            <div className={styles.navbar}>
              <TabList
                variant="fullWidth"
                className={styles.tabRootList}
                onChange={handleChange}
                aria-label="simple tabs example"
              >
                <Tab label="Resumo" value="1" />
                <Tab label="Detalhamento" value="2" />
              </TabList>
            </div>

            <TabPanel style={{ width: '100%' }} value="1">
              <ReportSummary />
            </TabPanel>

            <TabPanel style={{ width: '100%' }} value="2">
              <ReportDetail />
            </TabPanel>
          </TabContext>
        </Box>
      </DefaultLayout>
    </>
  )
}

export const getServerSideProps = withSSRAuth(async () => {
  return {
    props: {}
  }
})
