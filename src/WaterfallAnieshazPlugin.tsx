/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React, { useEffect, createRef } from 'react';
import { styled } from '@superset-ui/core';
import { WaterfallAnieshazPluginProps, WaterfallAnieshazPluginStylesProps } from './types';
import { Bar } from '@ant-design/plots';

// The following Styles component is a <div> element, which has been styled using Emotion
// For docs, visit https://emotion.sh/docs/styled

// Theming variables are provided for your use via a ThemeProvider
// imported from @superset-ui/core. For variables available, please visit
// https://github.com/apache-superset/superset-ui/blob/master/packages/superset-ui-core/src/style/index.ts

const Styles = styled.div<WaterfallAnieshazPluginStylesProps>`
  background-color: ${({ theme }) => theme.colors.secondary.light2};
  padding: ${({ theme }) => theme.gridUnit * 4}px;
  border-radius: ${({ theme }) => theme.gridUnit * 2}px;
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;

  h3 {
    /* You can use your props to control CSS! */
    margin-top: 0;
    margin-bottom: ${({ theme }) => theme.gridUnit * 3}px;
    font-size: ${({ theme, headerFontSize }) => theme.typography.sizes[headerFontSize]}px;
    font-weight: ${({ theme, boldText }) => theme.typography.weights[boldText ? 'bold' : 'normal']};
  }

  pre {
    height: ${({ theme, headerFontSize, height }) => (
      height - theme.gridUnit * 12 - theme.typography.sizes[headerFontSize]
    )}px;
  }
`;

/**
 * ******************* WHAT YOU CAN BUILD HERE *******************
 *  In essence, a chart is given a few key ingredients to work with:
 *  * Data: provided via `props.data`
 *  * A DOM element
 *  * FormData (your controls!) provided as props by transformProps.ts
 */

export default function WaterfallAnieshazPlugin(props: WaterfallAnieshazPluginProps) {
  // height and width are the height and width of the DOM element as it exists in the dashboard.
  // There is also a `data` prop, which is, of course, your DATA 🎉
  const { data, keyNames, height, width, customProps } = props;

  const rootElem = createRef<HTMLDivElement>();

  // Often, you just want to get a hold of the DOM and go nuts.
  // Here, you can do that with createRef, and the useEffect hook.
  useEffect(() => {
    const root = rootElem.current as HTMLElement;
    console.log('Plugin element', root);
  });

  console.log('Plugin props', props);

  const config = {
    // plot container
    width: 500,
    height: 500,
    autoFit: true, 
    padding: 'auto',
    appendPadding: [10,10,10],
    renderer: 'canvas',
    pixelRatio: 2,
    limitInPlot: false,
    locale: 'en-US',
    //  data mapping
    data: data,
    xField: keyNames[3],
    yField: keyNames[0],
    isRange: false,
    // graphic style
    color: customProps.barColor,
    intervalPadding: 1.5,
    dodgePadding: 1.5,
    minBarWidth: 1,
    maxBarWidth: 100,
    // barBackground: {
    //     style: {
    //       fill: '#000',
    //       fillOpacity: 0.25,
    //     }
    // }, 
    barWidthRatio: 1,
    marginRatio:  1,       
    state: {
    active: {
      animate: { duration: 100, easing: 'easeLinear' },
      style: {
        lineWidth: 2,
      }
    }
    },
    //  plot components
    xAxis : 
    {
        top : false,
        position :  'left',
        title: {
            text: customProps.xLabelText,
            position: 'center',
            offset: 40,
            spacing: 40,
            style: {
                fillOpacity: 1,
                // fontSize: customProps.xLabelFontSize,
                strokeOpacity: 0.7,
                shadowBlur: 10,
                shadowOffsetX: 1,
                shadowOffsetY: 1,
                cursor: 'pointer'
              },
            autoRotate: false
        },
        verticalFactor: 1,
        verticalLimitLength: 1,
        label: {
            style: {
                fontSize: 10
              },
        },
        line: {
            // stroke : '#ddd',
            lineWidth: 1,
            lineDash : [ 0, 10],
            opacity : 1,
            cursor: 'pointer'
        },
        tickLine: {
            style: {
                fillOpacity: 0.5,
                // stroke: 'black',
                lineWidth: 1,
                lineDash: [0, 10],
                cursor: 'pointer'
              },
            alignTick: false,
            length: 10
        },
        subTickLine:{
            style: {
                fillOpacity: 0.5,
                stroke: 'black',
                lineWidth: 1,
                lineDash: [5, 10],
                cursor: 'pointer'
              },
              count: customProps.subTickCount,
              length: 5
        },
        nice: true,
        min: customProps.minMaxPlot[0],
        max: customProps.minMaxPlot[1],
        // minLimit: 0,
        // maxLimit:10000,
        // tickCount:10,
        tickInterval: customProps.tickInterval,
        tickMethod: 'time',
        animate: true,
        // animateOption: 
    },
    yAxis : 
    {
        label: {
            style: {
                // fontSize: customProps.yLabelFontSize,
                lineWidth: 1,
                lineDash: [5, 10],
                cursor: 'pointer'
              },
        },
        line: {
            lineWidth: 1,
            lineDash : [ 1, 1],
            opacity : 1,
        },
        animate: true,
    },    
    label: {
      // type: 'outer',
      position: 'right',
      offset: 40,
      offsetX: 10,
      offsetY:0,
      style: {
        // fill: 'black',
        fontSize: 0.1,
        opacity: `${customProps.showBarLabel ? 0.5 : 0}`,
      },
      autoRotate: false,
      rotate: 0,
      labelLine: true,
      // labelEmit: true,
      animate: true,
      autoHide: true,
      layout: [
        {
          type: 'adjust-color',
        },
      ],
    },
    tooltip: {
        formatter: (datum :any ) => {
            return { value: `${keyNames[1]} : ${datum.range[0]},\n ${keyNames[2]} : ${datum.range[1]},\n duration-range : ${datum.range[1]-datum.range[0]}`};
        },
        follow: true,
        entralble: true,
        // showTitle: true,
        // title: String
        position: 'left',
        shared: true
    },
    // plot theme
    theme: customProps.theme,
  };

  return (
    <Styles
      ref={rootElem}
      boldText={props.boldText}
      headerFontSize={props.headerFontSize}
      height={height}
      width={width}
    >
      <Bar {...config} />
    </Styles>
  );
}
