import React, { Dispatch, useCallback, useEffect, useRef } from 'react';
import { withBem } from '../../utils/bem';
//https://react-table-library.com/
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { HeaderMethod } from '../../model/pokemon/constants/MovementMethod';
import { MOVEMENT_METHOD, MOVE_DETAIL } from '../../model/pokemon/enums/PokemonMovement';
import {
  LevelUp,
  MoveComplete,
  MoveData,
} from '../../model/pokemon/interfaces/PokemonMovement';
import { TYPES_COLOR } from '../../model/pokemon/constants/TypesColor';
import { POKEMON_TYPE } from '../../model/pokemon/enums/PokemonType';

interface Props<T> {
  theadType?: 'base' | 'sticky';
  height?: 'small' | 'auto';
  thead?: boolean;
  datos: MoveComplete[];
  method: keyof TableDataMethod;
  showMore?: () => void;
}

interface TableProps<T> {
  datos: T[];
  /*  columns: ColumnDef<T>[];
  state: {
    sorting: SortingState;
  };
  onSortingChange: (sorting: SortingState) => void;
  getCoreRowModel: (data: T[]) => Row<T>[];
  getSortedRowModel: (data: Row<T>[], sorting: SortingState) => Row<T>[]; */
  theadType?: 'base' | 'sticky';
  height?: 'small' | 'auto';
  thead?: boolean;
}

interface TableDataMethod {
  [MOVEMENT_METHOD.LEVELUP]: LevelUp;
  [MOVEMENT_METHOD.MACHINE]: MoveData;
  [MOVEMENT_METHOD.EGG]: MoveData;
  [MOVEMENT_METHOD.TUTOR]: MoveData;
}

//Ñ4

const Table2 = <T extends unknown>({
  datos,
  thead = true,
  theadType = 'sticky',
  height = 'auto',
  method,
  showMore,
}: Props<T>) => {
  const b = withBem('table');

  const [sorting, setSorting] = React.useState<SortingState>([]);

  const defultColumns = React.useMemo<ColumnDef<TableDataMethod[typeof method]>[]>(() => {
    return Object.entries(HeaderMethod[method]).map(([_, value]) => {
      return {
        accessorKey: value,
        id: value,
        header: () => <span>{value}</span>,
        cell: (info) => {
          if (value === 'type') {
            return <Types value={info.row.original[value]} />;
          }
          return <span>{info.getValue() as any}</span>;
        },
        footer: () => <span>Footer</span>,
      };
    });
  }, []);

  const sortByLevel = (a: MoveComplete, b: MoveComplete) => {
    if (method === MOVEMENT_METHOD.LEVELUP) {
      if (
        a.version_group_details[0].level_learned_at <
        b.version_group_details[0].level_learned_at
      ) {
        return -1;
      }
      if (
        a.version_group_details[0].level_learned_at >
        b.version_group_details[0].level_learned_at
      ) {
        return 1;
      }
      return 0;
    }
    return 0;
  };

  const newTableData = React.useMemo<TableDataMethod[typeof method][]>(() => {
    return datos.sort(sortByLevel).map((element) => {
      const learnSameMove = (): number => {
        if (element.version_group_details.length > 1) {
          return element.version_group_details[1].level_learned_at ?? 0;
        }
        return element.version_group_details[0].level_learned_at ?? 0;
      };

      if (method === MOVEMENT_METHOD.LEVELUP) {
        return {
          [MOVE_DETAIL.MOVE]: element.move.name.replace('-', ' '),
          [MOVE_DETAIL.LEVEL]: learnSameMove(),
          [MOVE_DETAIL.TYPE]: element.details.type.name ?? '',
          [MOVE_DETAIL.CLASS]: element.details.damage_class.name,
        };
      } else {
        return {
          [MOVE_DETAIL.MOVE]: element.move.name.replace('-', ' '),
          [MOVE_DETAIL.TYPE]: element.details.type.name ?? '',
          [MOVE_DETAIL.CLASS]: element.details.damage_class.name,
        };
      }
    });
  }, [datos]);

  const Types = ({ value }: { value: POKEMON_TYPE }) => {
    return (
      <span
        className="type"
        style={{
          backgroundColor: TYPES_COLOR[value].base,
          outline: `1px solid ${TYPES_COLOR[value].dark}`,
          textShadow: `1px 2px 3px black`,
        }}
      >
        {value}
      </span>
    );
  };

  const table = useReactTable({
    data: newTableData,
    columns: defultColumns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <React.Fragment>
      <div className={`table-container__${height}`}>
        <table className={b(height)}>
          {thead && (
            <thead className={b(`thead-${theadType}`)}>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder ? null : (
                          <div
                            {...{
                              className: header.column.getCanSort()
                                ? 'cursor-pointer select-none'
                                : '',
                              onClick: header.column.getToggleSortingHandler(),
                            }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: ' 🔼',
                              desc: ' 🔽',
                            }[header.column.getIsSorted() as string] ?? null}
                          </div>
                        )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
          )}
          <tbody className={b(`tbody`)}>
            {table
              .getRowModel()
              .rows /* .slice(0, 10) */
              .map((row) => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td key={cell.id}>
                          {/*  {cell.column.columnDef.id === 'type' ? (
                        <span
                          className="type"
                          style={{
                            backgroundColor:
                              TYPES_COLOR[cell.getValue() as POKEMON_TYPE].base,
                            outline: `1px solid ${
                              TYPES_COLOR[cell.getValue() as POKEMON_TYPE].dark
                            }`,
                            textShadow: `1px 2px 3px black`,
                          }}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </span>
                      ) : (
                        flexRender(cell.column.columnDef.cell, cell.getContext())
                      )} */}
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
          </tbody>

          {/*   <tfoot >
            {table.getFooterGroups().map((footerGroup) => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map((footer) => {
                  return (
                    <td key={footer.id} colSpan={footer.colSpan}>
                      {footer.isPlaceholder ? null : (
                        <div>
                          {flexRender(
                            footer.column.columnDef.footer,
                            footer.getContext()
                          )}
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tfoot> */}
        </table>
      </div>
      {height === 'small' && (
        <div role="button" className={b('expand')} onClick={showMore}>
          Show All
        </div>
      )}
    </React.Fragment>
  );
};

export default Table2;
