import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_server_url }),
  //this is a name of cache todo, Ekhane aro tag type add hote pare.
  tagTypes: ['Opportunities'],
  endpoints: (builder) => ({
    
    // Fetch opportunities
    getOpportunities: builder.query({
        query: ({ filters = {}, page = 1, limit = 10 })=>{
            const queryParams = new URLSearchParams({
                ...filters,
                page,
                limit,
              }).toString();
              return {
                url: `/opportunities?${queryParams}`,
                method: 'GET',
              };
        },
        providesTags: ['Opportunities']
    }),

    // Post a new opportunity
    postOpportunity: builder.mutation({
      query:(opportunityData)=>({
        url: '/opportunities',
        method: 'POST',
        body: opportunityData
      }),
      invalidatesTags: ['Opportunities']
    })

  })
})

export const {useGetOpportunitiesQuery, usePostOpportunityMutation} = baseApi