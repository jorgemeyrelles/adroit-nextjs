/* eslint-disable @next/next/no-img-element */
import { useState, useMemo, useContext } from 'react'

import { Bar, Doughnut } from 'react-chartjs-2'
import {
  Box,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  TableContainer,
  LinearProgress
} from '@material-ui/core'
import { Paper } from '@material-ui/lab'

import { chartsNames } from '../../constants'
import { ChartContext } from '../../contexts/ChartContext'
import { ChartButton } from '../../components/Touchables/ChartButton'

import { MapDropDown } from '../MapDropDown'
import { ChartDetail } from '../ChartDetail'
import { MapDetail } from '../MapDetail'

import { EmptyReportDetail } from './EmptyReportDetail'

import { useStyles } from './styles'

export function ReportDetail() {
  const styles = useStyles()

  const [chartsSelected, setChartsSelected] = useState([])

  const { data } = useContext(ChartContext)

  function handleChartSelect(chartName) {
    setChartsSelected((prevState) =>
      prevState.find((item) => item === chartName)
        ? prevState.filter((item) => item !== chartName)
        : [...prevState, chartName]
    )
  }

  const emptyChartsSelected = useMemo(
    () => chartsSelected.length === 0,
    [chartsSelected]
  )

  const navChartsItems = useMemo(
    () =>
      chartsNames.map((chartName) => {
        const chart = data[chartName.id]

        if (chartName.id === 1 || chartName.id === 2) {
          return {
            ...chartName,
            loading: chart?.loading,
            disabled: false
          }
        }

        return {
          ...chartName,
          loading: chart?.loading,
          disabled: (chart?.data || []).every(
            (item) => item.data.datasets.length === 0
          )
        }
      }),
    [data]
  )

  return (
    <section className={styles.container}>
      <aside>
        <nav className={styles.sidebar}>
          {navChartsItems.map((chartName) => {
            return chartName.id === 1 ? (
              <MapDropDown
                button={
                  <ChartButton
                    type="button"
                    key={chartName.id}
                    onClick={() => handleChartSelect(chartName.name)}
                    selected={chartsSelected.includes(chartName.name)}
                    loading={chartName.loading}
                    disabled={chartName.disabled}
                  >
                    {chartName.name}
                  </ChartButton>
                }
              />
            ) : (
              <ChartButton
                type="button"
                key={chartName.id}
                onClick={() => handleChartSelect(chartName.name)}
                selected={chartsSelected.includes(chartName.name)}
                loading={chartName.loading}
                disabled={chartName.disabled}
              >
                {chartName.name}
              </ChartButton>
            )
          })}
        </nav>
      </aside>

      {emptyChartsSelected ? (
        <EmptyReportDetail />
      ) : (
        <section className={styles.content}>
          {chartsSelected.includes('Mapa') && (
            <section style={{ gridColumn: 'span 2', width: '100%' }}>
              <MapDetail />
            </section>
          )}

          {chartsSelected.includes('Quantidade de Frutos') && (
            <>
              <ChartDetail
                key={`block-amount-fruits`}
                style={{ gridColumn: 'span 2' }}
                chartName="Quantidade de Frutos"
                blockName={`${data['2'].data
                  .map((item) => item.block)
                  .join(',')}`}
              >
                <>
                  {!data['2'].loading ? (
                    <Box marginTop="20px" height="100%" width="100%">
                      <TableContainer component={Paper}>
                        <Table
                          className={styles.table}
                          size="small"
                          aria-label="a dense table"
                        >
                          <TableHead>
                            <TableRow>
                              <TableCell align="center">Quadra</TableCell>
                              {[
                                'Fruta Madura',
                                'Fruta Verde',
                                'Madura Anomalia',
                                'Verde Anomalia',
                                'Fruta Semi Madura'
                              ].map((item) => (
                                <TableCell key={item} align="center">
                                  {item}
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableHead>

                          <TableBody>
                            {data['2'].data.map((item) => (
                              <TableRow key={`table-row-${item.block}`}>
                                <TableCell align="center">
                                  {item.block}
                                </TableCell>
                                {item.data.map((fruit) => (
                                  <TableCell key={fruit.name} align="center">
                                    {fruit.total}
                                  </TableCell>
                                ))}
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Box>
                  ) : (
                    <LinearProgress
                      style={{ fontSize: 50 }}
                      color="secondary"
                    />
                  )}
                </>
              </ChartDetail>
            </>
          )}

          {chartsSelected.includes('Estágio de Maturação') &&
            data['3'].data.map((block) => (
              <ChartDetail
                key={`block-${block.block}`}
                chartName="Estágio de Maturação"
                blockName={block.block}
              >
                <>
                  {!data['3'].loading && block ? (
                    <Doughnut data={block.data} />
                  ) : (
                    <LinearProgress
                      style={{ fontSize: 50 }}
                      color="secondary"
                    />
                  )}
                </>
              </ChartDetail>
            ))}

          {chartsSelected.includes('Distribuição de Diâmetro') &&
            data['4'].data.map((block) => (
              <ChartDetail
                key={`block-${block.block}`}
                chartName="Distribuição de Diâmetro"
                blockName={block.block}
              >
                <>
                  {!data['4'].loading && block ? (
                    <Bar data={block.data} height="100%" width="100%" />
                  ) : (
                    <LinearProgress
                      style={{ fontSize: 50 }}
                      color="secondary"
                    />
                  )}
                </>
              </ChartDetail>
            ))}

          {chartsSelected.includes('Distribuição Altura das Árvores') &&
            data['5'].data.map((block) => (
              <ChartDetail
                key={`block-${block.block}`}
                chartName="Distribuição Altura das Árvores"
                blockName={block.block}
              >
                <>
                  {!data['5'].loading && block ? (
                    <Bar data={block.data} height="100%" width="100%" />
                  ) : (
                    <LinearProgress
                      style={{ fontSize: 50 }}
                      color="secondary"
                    />
                  )}
                </>
              </ChartDetail>
            ))}

          {chartsSelected.includes('Distribuição de frutos no chão') &&
            data['6'].data.map((block) => (
              <ChartDetail
                key={`block-${block.block}`}
                chartName="Distribuição de frutos no chão"
                blockName={block.block}
              >
                <>
                  {!data['6'].loading && block ? (
                    <Bar data={block.data} height="100%" width="100%" />
                  ) : (
                    <LinearProgress
                      style={{ fontSize: 50 }}
                      color="secondary"
                    />
                  )}
                </>
              </ChartDetail>
            ))}

          {chartsSelected.includes('Contagem de Árvores Ausentes') &&
            data['7'].data.map((block) => (
              <ChartDetail
                key={`block-${block.block}`}
                chartName="Contagem de Árvores Ausentes"
                blockName={block.block}
              >
                <>
                  {!data['7'].loading && block ? (
                    <Bar data={block.data} height="100%" width="100%" />
                  ) : (
                    <LinearProgress
                      style={{ fontSize: 50 }}
                      color="secondary"
                    />
                  )}
                </>
              </ChartDetail>
            ))}

          {chartsSelected.includes('Anomalias na Florada') &&
            data['8'].data.map((block) => (
              <ChartDetail
                key={`block-${block.block}`}
                chartName="Anomalias na Florada"
                blockName={block.block}
              >
                <>
                  {!data['8'].loading && block ? (
                    <Bar data={block.data} height="100%" width="100%" />
                  ) : (
                    <LinearProgress
                      style={{ fontSize: 50 }}
                      color="secondary"
                    />
                  )}
                </>
              </ChartDetail>
            ))}

          {chartsSelected.includes('Quantidade de Mudas') &&
            data['9'].data.map((block) => (
              <ChartDetail
                key={`block-${block.block}`}
                chartName="Quantidade de Mudas"
                blockName={block.block}
              >
                <>
                  {!data['9'].loading && block ? (
                    <Bar data={block.data} height="100%" width="100%" />
                  ) : (
                    <LinearProgress
                      style={{ fontSize: 50 }}
                      color="secondary"
                    />
                  )}
                </>
              </ChartDetail>
            ))}

          {chartsSelected.includes('Detecção de Anomalias') &&
            data['10'].data.map((block) => (
              <ChartDetail
                key={`block-${block.block}`}
                chartName="Detecção de Anomalias"
                blockName={block.block}
              >
                <>
                  {!data['10'].loading && block ? (
                    <Bar data={block.data} height="100%" width="100%" />
                  ) : (
                    <LinearProgress
                      style={{ fontSize: 50 }}
                      color="secondary"
                    />
                  )}
                </>
              </ChartDetail>
            ))}

          {chartsSelected.includes('Cubicagem') &&
            data['11'].data.map((block) => (
              <ChartDetail
                key={`block-${block.block}`}
                chartName="Cubicagem"
                blockName={block.block}
              >
                <>
                  {!data['11'].loading && block ? (
                    <Bar data={block.data} height="100%" width="100%" />
                  ) : (
                    <LinearProgress
                      style={{ fontSize: 50 }}
                      color="secondary"
                    />
                  )}
                </>
              </ChartDetail>
            ))}
        </section>
      )}
    </section>
  )
}
