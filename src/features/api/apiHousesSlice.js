import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'


export const apiHousesSlice = createApi({
    reducerPath: "housesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BACKEND_URL,
        prepareHeaders: (headers, {getState}) => {
            const token = getState().auth.token
            if(token){
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getHouses: builder.query({
            query: () => '/house',
            providesTags: ['Houses']
        }),
        getHouseByCode: builder.query({
            query: (code) => '/house/' + code,
            providesTags: ['House']
        }),
        createHouse: builder.mutation({
            query: (newHouse) => ({
                url: '/house',
                method: 'POST',
                body: newHouse
            }),
            invalidatesTags: ["Houses"] // Se ejecuta cuando hay un cambio en la BD
        }),
        deleteHouse: builder.mutation({
            query: (code) => ({
                url: `/house/${code}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Houses"]
        }),
        uploadPhotoHouse: builder.mutation({
            query: (body) => ({
                url: `/upload/${body.code}/house`,
                method: "PATCH",
                body: body.file
            }),
            invalidatesTags: ["Houses"]
        })
    })
})

export const { useGetHousesQuery, 
    useGetHouseByCodeQuery, 
    useCreateHouseMutation, 
    useDeleteHouseMutation,
    useUploadPhotoHouseMutation,
} = apiHousesSlice