import { useMemo, useContext } from 'react'

import { MapContext } from '../../contexts/MapContext'

import { DropDown } from '../../components/DropDown'
import { DropDownButton } from '../../components/Touchables/DropDownButton'
import { CountFruitDropDown } from './CountFruitDropDown'

import { useStyles } from './styles'

export function MapDropDown({ button: Button }) {
  const styles = useStyles()

  const { countFruitsHeatmaps, heatmaps, selectHeatmap, clearHeatmaps } =
    useContext(MapContext)

  const disableCountFruitsDropDown = useMemo(
    () => countFruitsHeatmaps.every((item) => item.disabled),
    [countFruitsHeatmaps]
  )

  return (
    <DropDown button={Button}>
      <h3 className={styles.title}>MAPA</h3>
      <p className={styles.subtitle}>Selecione o que você deseja exibir.</p>

      <CountFruitDropDown
        data={{ name: 'Contagem', disabled: disableCountFruitsDropDown }}
      >
        {countFruitsHeatmaps.map((heatmap, index) => (
          <DropDownButton
            key={`${heatmap.name}-${index}`}
            onClick={() => selectHeatmap(heatmap.name)}
            loading={heatmap.loading}
            selected={heatmap.selected}
            disabled={heatmap.disabled}
          >
            {heatmap.name}
          </DropDownButton>
        ))}
      </CountFruitDropDown>

      {heatmaps.map((heatmap, index) => (
        <DropDownButton
          key={`${heatmap.name}-${index}`}
          onClick={() => selectHeatmap(heatmap.name)}
          loading={heatmap.loading}
          selected={heatmap.selected}
          disabled={heatmap.disabled}
        >
          {heatmap.name}
        </DropDownButton>
      ))}

      <footer className={styles.footer}>
        <button className={styles.clearButton} onClick={clearHeatmaps}>
          Limpar seleção
        </button>
      </footer>
    </DropDown>
  )
}
