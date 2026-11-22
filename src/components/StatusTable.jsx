import { Table } from 'react-bootstrap'

// Tabla de estado por bot/componente (opcional por proyecto: projectsContent.<slug>.statusTable).
// mode: 'real' | 'practice' | 'demoted' → define el color de la etiqueta.
const TAG = { real: 'tag tag-accent', practice: 'tag', demoted: 'tag tag-muted' }

export default function StatusTable({ table, note }) {
  const [cBot, cMode, cBacktest, cLive] = table.cols
  return (
    <>
      <Table className="status-table mb-2" borderless>
        <thead>
          <tr>
            {table.cols.map((c) => (
              <th key={c} scope="col">{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((r) => (
            <tr key={r.bot} className={`row-${r.mode}`}>
              <th scope="row" data-label={cBot}>{r.bot}</th>
              <td data-label={cMode}><span className={TAG[r.mode] ?? 'tag'}>{r.label}</span></td>
              <td data-label={cBacktest}>{r.backtest}</td>
              <td data-label={cLive}>{r.live}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {note && <p className="small text-muted-2 mb-0">{note}</p>}
    </>
  )
}
