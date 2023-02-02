import React, { FC, useContext, useDeferredValue } from 'react';
import { withBem } from '../../utils/bem';
import { useAllPokemon } from '../../lib/client/react-query/pokemon/useAllPokemon';
import { SearchContext } from '../../lib/client/providers/Context';
import Link from 'next/link';
import { CloseModal } from '../Modals/ModalSearch';

const SearchResults: FC = () => {
  const b = withBem('search-result');
  const [query, setQuery] = useContext(SearchContext);
  const deferredQuery = useDeferredValue(query);
  const { data } = useAllPokemon();

  //List
  const filtered = data?.results.filter((poke) => {
    return poke.name.toLowerCase().startsWith(deferredQuery);
    //includes
    /* return poke.name.toLowerCase().includes(query); */
  });

  if (deferredQuery === '') {
    return <div className={b('not-found')}>Search any pokemon</div>;
  }

  return (
    <>
      <ul className={b('list')}>
        {filtered?.length === 0 ? (
          <li className={b('not-found')}>
            No matches for <i>"{deferredQuery}"</i>
          </li>
        ) : (
          filtered?.map((poke) => {
            let pokeID = poke.url.match(/\/(\d+)\//)?.[1];
            return (
              <li onClick={() => setQuery('')} key={pokeID}>
                <Link href={`/pokemon/${pokeID}`} prefetch={false}>
                  {' '}
                  <CloseModal>{poke.name}</CloseModal>
                </Link>
              </li>
            );
          })
        )}
      </ul>
    </>
  );
};

export default SearchResults;
