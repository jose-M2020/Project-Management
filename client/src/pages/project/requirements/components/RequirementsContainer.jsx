import { Box, useTheme } from '@mui/material'
import React from 'react'
import Header from '../../../../components/Header'
import Menu from './tree/Menu'
import { tokens } from '../../../../theme'
import TreeBuilder from './tree/TreeBuilder'
import { treeData } from '../../../../fakeData'

const RequirementsContainer = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px" maxWidth={{ xl: '1250px' }} mx={{ xl: 'auto' }} >
      <Header title="Project Requirements" subtitle="Functional and Non-Functional Requirements Analysis." />
      <Box maxWidth='280px' borderRight={`2px solid ${colors.primary[400]}`}>
        <Menu />
      </Box>
    </Box>
  )
}

export default RequirementsContainer