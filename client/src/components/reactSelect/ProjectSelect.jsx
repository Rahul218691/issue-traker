import React, { useCallback } from 'react'

import ReactAsyncSelect from './ReactAsyncSelect'
import { PAGE_SIZE_LIMIT } from '../../helpers/Constants'
import useAxios from '../../hooks/useAxios'
import { fetchProjects } from '../../services/projectService'

const ProjectSelect = ({
    id,
    name,
    value,
    placeholder,
    isLabelRequired = false,
    labelText,
    isMulti = false,
    isRequired = false,
    isDisabled = false,
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
            isDDL: true,
            instance: api
          }
            const response = await fetchProjects(payload)
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
            isDisabled={isDisabled}
            errors={errors}
            placeholder={placeholder}
            getOptionLabel={e => e.title}
            getOptionValue={e => e._id}
            onSelect={onSelect}
            onLoadOptions={handleLoadMore}
          />
}

export default ProjectSelect