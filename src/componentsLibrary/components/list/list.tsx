import React, { FC } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Title } from '../../baseComponents/title'

const ListWrapper = styled.div`
  margin: 0 0 27px;
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  width: fit-content;
`

const ChildrenWrapper = styled.div`
  margin: 10px 0 5px;
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  width: fit-content;
`

export const List: FC<{
  name?: string
}> = ({ name, children }) => {
  return (
    <ListWrapper>
      {name && (
        <Title size="sm" weight={300}>
          {name}
        </Title>
      )}
      <ChildrenWrapper>{children}</ChildrenWrapper>
    </ListWrapper>
  )
}

List.propTypes = {
  name: PropTypes.string,
}
