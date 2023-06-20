import { useTheme } from '@mui/material';
import { ResponsivePie } from '@nivo/pie'
import { tokens } from '../../../../../theme';

const TaskPie = ({ data /* see data tab */ }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const fakeData = [
    {
      "id": "Not Started",
      "label": "Not Started",
      "value": 159,
      "color": "hsl(56, 70%, 50%)"
    },
    {
      "id": "In Progress",
      "label": "In Progress",
      "value": 349,
      "color": "hsl(83, 70%, 50%)"
    },
    {
      "id": "Done",
      "label": "Done",
      "value": 82,
      "color": "hsl(182, 70%, 50%)"
    }
  ]
  return (
      <ResponsivePie
          data={fakeData}
          colors={{ scheme: 'nivo' }}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          borderColor={{
              from: 'color',
              modifiers: [
                  [
                      'darker',
                      0.2
                  ]
              ]
          }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor={colors.blueAccent[200]}
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: 'color' }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{
              from: 'color',
              modifiers: [
                  [
                      'darker',
                      2
                  ]
              ]
          }}
          defs={[
              {
                  id: 'dots',
                  type: 'patternDots',
                  background: 'inherit',
                  color: 'rgba(255, 255, 255, 0.3)',
                  size: 4,
                  padding: 1,
                  stagger: true
              },
              {
                  id: 'lines',
                  type: 'patternLines',
                  background: 'inherit',
                  color: 'rgba(255, 255, 255, 0.3)',
                  rotation: -45,
                  lineWidth: 6,
                  spacing: 10
              }
          ]}
        //   fill={[
        //       {
        //           match: {
        //               id: 'ruby'
        //           },
        //           id: 'dots'
        //       },
        //       {
        //           match: {
        //               id: 'c'
        //           },
        //           id: 'dots'
        //       },
        //       {
        //           match: {
        //               id: 'go'
        //           },
        //           id: 'dots'
        //       },
        //       {
        //           match: {
        //               id: 'python'
        //           },
        //           id: 'dots'
        //       },
        //       {
        //           match: {
        //               id: 'scala'
        //           },
        //           id: 'lines'
        //       },
        //       {
        //           match: {
        //               id: 'lisp'
        //           },
        //           id: 'lines'
        //       },
        //       {
        //           match: {
        //               id: 'elixir'
        //           },
        //           id: 'lines'
        //       },
        //       {
        //           match: {
        //               id: 'javascript'
        //           },
        //           id: 'lines'
        //       }
        //   ]}
          legends={[
              {
                  anchor: 'bottom',
                  direction: 'row',
                  justify: false,
                  translateX: 0,
                  translateY: 56,
                  itemsSpacing: 0,
                  itemWidth: 100,
                  itemHeight: 18,
                  itemTextColor: '#999',
                  itemDirection: 'left-to-right',
                  itemOpacity: 1,
                  symbolSize: 18,
                  symbolShape: 'circle',
                  effects: [
                      {
                          on: 'hover',
                          style: {
                              itemTextColor: '#000'
                          }
                      }
                  ]
              }
          ]}
      />
  )
}

export default TaskPie;
