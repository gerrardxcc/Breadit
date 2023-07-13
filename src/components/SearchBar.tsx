'use client';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from '@/components/ui/command';
import { Prisma, Subreddit } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FC, useState } from 'react';

interface SearchBarProps {}

const SearchBar: FC<SearchBarProps> = ({}) => {
  const [input, setInput] = useState<string>('');
  const {
    data: queryResults,
    refetch,
    isFetched,
    isFetching,
  } = useQuery({
    queryFn: async () => {
      if (!input) return [];
      const { data } = await axios.get(`/api/search?q=${input}`);
      return data as (Subreddit & {
        _count: Prisma.SubredditCountOutputType;
      })[];
    },
    queryKey: ['search-query'],
    enabled: false,
  });
  return (
    <Command className='relative rounded-lg border max-w-lg z-50 overflow-visible'>
      <CommandInput
        value={input}
        onValueChange={(text) => {
          setInput(text);
        }}
        className='outline-none border-none focus:border-none focus:outline-none ring-0'
        placeholder='Search Communities...'
      />
      {input.length > 0 ? (
        <CommandList className='absolute bg-white top-full inset-x-0 shadow rounded-b-md'>
          {isFetched && <CommandEmpty>No results found</CommandEmpty>}
          {(queryResults?.length ?? 0) > 0 ? (
            <CommandGroup heading='Communities'></CommandGroup>
          ) : null}
        </CommandList>
      ) : null}
    </Command>
  );
};

export default SearchBar;
