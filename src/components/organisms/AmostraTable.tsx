import { Badge } from "@/components/atoms";
import type { Amostra } from "@/types";
import { StatusAmostra } from "@/constants";
import { formatDate } from "@/utils";

const statusVariant: Record<
  StatusAmostra,
  "info" | "warning" | "success" | "error"
> = {
  [StatusAmostra.PENDENTE]: "warning",
  [StatusAmostra.EM_ANALISE]: "info",
  [StatusAmostra.CONCLUIDA]: "success",
  [StatusAmostra.REJEITADA]: "error",
};

const statusLabel: Record<StatusAmostra, string> = {
  [StatusAmostra.PENDENTE]: "Pendente",
  [StatusAmostra.EM_ANALISE]: "Em Análise",
  [StatusAmostra.CONCLUIDA]: "Concluída",
  [StatusAmostra.REJEITADA]: "Rejeitada",
};

interface AmostraTableProps {
  amostras: Amostra[];
  onSelect?: (amostra: Amostra) => void;
}

export function AmostraTable({ amostras, onSelect }: AmostraTableProps) {
  if (amostras.length === 0) {
    return (
      <div className="text-center py-10 text-base-content/50">
        Nenhuma amostra encontrada.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Código</th>
            <th>Tipo</th>
            <th>Produtor</th>
            <th>Data Coleta</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {amostras.map((amostra) => (
            <tr
              key={amostra.id}
              className={onSelect ? "cursor-pointer hover" : ""}
              onClick={() => onSelect?.(amostra)}
            >
              <td className="font-mono">{amostra.codigo}</td>
              <td>{amostra.tipo}</td>
              <td>{amostra.produtor?.nome ?? amostra.produtorId}</td>
              <td>{formatDate(amostra.dataColeta)}</td>
              <td>
                <Badge
                  label={statusLabel[amostra.status]}
                  variant={statusVariant[amostra.status]}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
