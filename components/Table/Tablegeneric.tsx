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
  FlavorTextEntry,
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
  type: 'desc';
  datos: T[];
}

/* interface TableProps<T> {
  datos: T[];
   columns: ColumnDef<T>[];
  state: {
    sorting: SortingState;
  };
  onSortingChange: (sorting: SortingState) => void;
  getCoreRowModel: (data: T[]) => Row<T>[];
  getSortedRowModel: (data: Row<T>[], sorting: SortingState) => Row<T>[];
  theadType?: 'base' | 'sticky';
  height?: 'small' | 'auto';
  thead?: boolean;
} */

interface TableDataMethod {
  [MOVEMENT_METHOD.LEVELUP]: LevelUp;
  [MOVEMENT_METHOD.MACHINE]: MoveData;
  [MOVEMENT_METHOD.EGG]: MoveData;
  [MOVEMENT_METHOD.TUTOR]: MoveData;
}

//Ñ4

const TableGeneric = <T,>({
  datos,
  thead = false,
  theadType = 'sticky',
  type,
  height = 'auto',
}: Props<T>) => {
  const b = withBem('table');

  const [sorting, setSorting] = React.useState<SortingState>([]);

  /*  const sortByLevel = (a: MoveComplete, b: MoveComplete) => {
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
  }; */

  /*  const newTableData = React.useMemo(() => {



   
  }, [datos]); */

  const newTableData = datos.map((element: any) => {
    return {
      game: element.version_group.name.replace('-', ' '),
      desc: element.flavor_text,
    };
  });

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
    columns: [],
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <React.Fragment>
      <div className={`table-container__${height}`}>
        <table className={b(height)}>
          {/*  {thead && (
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
          )} */}
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
        </table>
      </div>
      {/* {height === 'small' && (
        <div role="button" className={b('expand')}>
          Show All
        </div>
      )} */}
    </React.Fragment>
  );
};

export default TableGeneric;
