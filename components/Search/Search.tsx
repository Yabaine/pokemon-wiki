import React, { FC, useDeferredValue, useContext } from 'react';
import { withBem } from '../../utils/bem';
import { SearchContext } from '../../lib/client/providers/Context';
//Todo genType en .map

const Search: FC = () => {
  const b = withBem('search');
  const [query, setQuery] = useContext(SearchContext);
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;

  return (
    <>
      <div
        className={b('content')}
        style={{
          opacity: isStale ? 0.5 : 1,
          transition: isStale ? 'opacity 0.2s 0.2s linear' : 'opacity 0s 0s linear',
        }}
      >
        <input
          type="text"
          placeholder="Search.."
          className={b('input')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        ></input>
      </div>
    </>
  );
};

export default Search;
