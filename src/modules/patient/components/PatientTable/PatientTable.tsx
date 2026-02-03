import type { FC } from "react";
import type { PatientResponse } from "../../types/PatientResponse";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { type ColumnDef, flexRender, useReactTable, getCoreRowModel, getFilteredRowModel, type SortingState, getSortedRowModel } from "@tanstack/react-table";
import { useState } from "react";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/solid";
import SearchBar from "@/shared/components/SearchBar/SearchBar";
import { useAuth } from "@/shared/context/auth/useAuth";
import ActionButtons from "@/shared/components/Button/ActionButtons";

interface PatientTableProps {
  patients: PatientResponse[];
}

export const PatientTable: FC<PatientTableProps> = ({ patients }) => {
  const { isUserAdmin, isUserDoctor } = useAuth();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filtering, setFiltering] = useState("");

  const columns: ColumnDef<PatientResponse>[] = [
    { accessorKey: "firstName", header: "Nombre", cell: info => info.row.original.firstName + " " + info.row.original.lastName },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "phone", header: "Teléfono" },
    { accessorKey: "gender", header: "Género" },
    ...(isUserAdmin || isUserDoctor ? [
      {
        header: "Acciones",
        cell: ({ row }: { row: { original: PatientResponse } }) => {
          const patient = row.original;

          return <ActionButtons
            entityId={patient.id}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
          />;
        },
      },
    ] : []),
  ];

  const table = useReactTable({
    data: patients,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { sorting, globalFilter: filtering },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  const onView = (patientId: string) => {
    // Lógica para ver el paciente
    console.log("Ver paciente:", patientId);
  }

  const onEdit = (patientId: string) => {
    // Lógica para editar el paciente
    console.log("Editar paciente:", patientId);
  }

  const onDelete = (patientId: string) => {
    // Lógica para eliminar el paciente
    console.log("Eliminar paciente:", patientId);
  }

  return (
    <>
      <SearchBar filtering={filtering} setFiltering={setFiltering} placeholder="Buscar paciente..." />

      <section className="border border-stroke bg-white shadow-sm rounded-xl overflow-x-auto">
        <Table className="min-w-full table-auto">
          <TableHeader className="bg-gradient-to-r from-primary to-secondary text-white">
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead
                    key={header.id}
                    className="text-center p-3 cursor-pointer font-semibold text-sm"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder ? null : (
                      <div className="flex items-center justify-center gap-2">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getIsSorted() === "asc" && <ArrowUpIcon className="w-3 h-3 text-white" />}
                        {header.column.getIsSorted() === "desc" && <ArrowDownIcon className="w-3 h-3 text-white" />}
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody className="text-black dark:text-white">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={`text-center border border-stroke dark:border-strokedark hover:bg-stroke dark:hover:bg-strokedark ${index % 2 === 0 ? "bg-white dark:bg-boxdark" : "bg-gray-50 dark:bg-gray-700"
                    } transition-colors duration-200`}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id} className="border border-stroke dark:border-strokedark px-4 py-2">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="h-24 text-center hover:bg-stroke dark:hover:bg-strokedark">
                <TableCell colSpan={columns.length}>No se encontraron pacientes</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </section>
    </>
  );
};

export default PatientTable;
