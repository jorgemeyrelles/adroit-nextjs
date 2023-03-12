/* eslint-disable @next/next/no-img-element */
import { useStyles } from '../styles'

export function EmptyReportDetail() {
  const styles = useStyles()

  return (
    <section className={styles.contentEmpty}>
      <img
        style={{ width: 100, height: 100 }}
        src="/assets/leaf.png"
        alt="Leaf"
      />

      <p style={{ textAlign: 'center' }}>
        Para começar a ver os dados das <br /> sua fazendas, selecione um dos{' '}
        <br /> gráficos disponíveis.
      </p>
    </section>
  )
}
