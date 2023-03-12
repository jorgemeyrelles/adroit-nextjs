import { useState, useContext } from 'react'

import Head from 'next/head'
import Image from 'next/image'

import { Box, Tab, Typography, Button } from '@material-ui/core'
import { TabContext, TabList } from '@material-ui/lab'

import { AppContext } from '../contexts/AppContext'
import { withSSRAuth } from '../utils/withSSRAuth'

import { DefaultLayout } from '../layouts/default'

import { useStyles } from '../styles/pages/dashboard'

export default function Dashboard() {
  const styles = useStyles()

  const [selectedTab, setSelectedTab] = useState('1')

  const { setCreateReportModalVisibility } = useContext(AppContext)

  function handleSelect(_, selected) {
    setSelectedTab(selected)
  }

  function handleOpenModal() {
    setCreateReportModalVisibility(true)
  }

  return (
    <>
      <Head>
        <title>Dashboard | Leafsense</title>
      </Head>

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
            <Image
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
              onClick={handleOpenModal}
              variant="contained"
              color="primary"
            >
              CRIAR NOVO REPORT
            </Button>
          </footer>
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
