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
    }),

    //update a Opportunity
    updateOpportunity: builder.mutation({
      query: ({id, updatedOpportunity})=>({
        url: `/opportunities/${id}`,
        method: 'PATCH',
        body: updatedOpportunity
      }),
      invalidatesTags: ['Opportunities', 'OpportunitiesByIds']
    }),

    // Fetch opportunities by ids for my hosts
    getOpportunitiesByIds: builder.query({
      query: (opportunityIds) => {
        const queryParams = new URLSearchParams({ opportunityIds }).toString();
        return {
          url: `/opportunitiesbyids?${queryParams}`,
          method: 'GET',
        };
      },
      providesTags: ['OpportunitiesByIds'],
    }),


  })
})

export const {useGetOpportunitiesQuery, usePostOpportunityMutation, useUpdateOpportunityMutation,
useGetOpportunitiesByIdsQuery
} = baseApi