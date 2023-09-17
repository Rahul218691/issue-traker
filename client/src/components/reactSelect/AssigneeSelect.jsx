import React, { useCallback } from 'react'

import ReactAsyncSelect from './ReactAsyncSelect'
import { PAGE_SIZE_LIMIT } from '../../helpers/Constants'
import { getUsersList } from '../../services/userServices'
import useAxios from '../../hooks/useAxios'

const AssigneeSelect = ({
    id,
    name,
    value,
    placeholder,
    isLabelRequired = false,
    labelText,
    isMulti = false,
    isRequired = false,
    errors = {},
    onSelect = () => { }
}) => {

    const api = useAxios()

    const handleLoadMore = useCallback(async(searchQuery, loadedOptions, { page }) => {
        try {
          const payload = {
            page,
            limit: PAGE_SIZE_LIMIT,
            genericSearch: searchQuery,
            isDDL: true
          }
            const response = await getUsersList(api, payload)
            return {
              options: response.data,
              hasMore: response.hasNextPage,
              additional: {
                page: searchQuery ? 2 : page + 1
              }
            }
        } catch (error) {
          console.log(error)
        }
      }, [api])
    
  return <ReactAsyncSelect 
            id={id}
            name={name}
            value={value}
            isMulti={isMulti}
            isLabelRequired={isLabelRequired}
            labelText={labelText}
            isRequired={isRequired}
            errors={errors}
            placeholder={placeholder}
            getOptionLabel={e => e.username}
            getOptionValue={e => e._id}
            onSelect={onSelect}
            onLoadOptions={handleLoadMore}
          />
}

export default AssigneeSelect