import type { FC } from "react";
import type { DoctorResponse } from "../../types/DoctorResponse";
import { useState, useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { type ColumnDef, flexRender, useReactTable, getCoreRowModel, getFilteredRowModel, getSortedRowModel, type SortingState } from "@tanstack/react-table";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/solid";
import SearchBar from "@/shared/components/SearchBar/SearchBar"; // tu componente de búsqueda
import { Badge } from "@/components/ui/badge";

interface DoctorTableProps {
  doctors: DoctorResponse[];
}

const DoctorTable: FC<DoctorTableProps> = ({ doctors }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filtering, setFiltering] = useState("");

  const columns: ColumnDef<DoctorResponse>[] = useMemo(
    () => [
      {
        accessorKey: "firstName",
        header: "Nombre",
        cell: info => info.row.original.firstName + " " + info.row.original.lastName
      },
      { accessorKey: "email", header: "Email" },
      { accessorKey: "phone", header: "Teléfono" },
      { accessorKey: "gender", header: "Género" },
      { accessorKey: "medicalLicense", header: "Licencia" },
      { accessorKey: "officeNumber", header: "Oficina" },
      {
        accessorKey: "specialties",
        header: "Especialidades",
        cell: info => (
          <div className="flex flex-wrap justify-center gap-1">
            {info.getValue<string[]>().map((spec, idx) => (
              <Badge key={idx} className="bg-blue-100 text-blue-800 border-blue-300">
                {spec}
              </Badge>
            ))}
          </div>
        )
      }
    ],
    []
  );

  const table = useReactTable({
    data: doctors,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { sorting, globalFilter: filtering },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  return (
    <>
      <SearchBar filtering={filtering} setFiltering={setFiltering} />

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
                <TableCell colSpan={columns.length}>No se encontraron doctores</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </section>
    </>
  );
};

export default DoctorTable;
